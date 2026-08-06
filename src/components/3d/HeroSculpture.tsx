'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '@/hooks/useSound';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSculptureProps {
  mouse: { normalizedX: number; normalizedY: number };
}

// Ease functions
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const ASSEMBLY_DURATION = 1.8; // Fast snappy fly-in assembly
const MOVE_DURATION = 0.48; // Snappy speedcube layer turns
const PAUSE_DURATION = 0.15; // Quick pause between turns
const SOLVED_HOLD_DURATION = 2.5; // Brief hold when solved
const STEP = 0.42; // Grid spacing between cubies

// Standard 3x3 Rubik's Cube Face Colors (Ultra Light Soft Pastel Glowing Palette)
const COLOR_RIGHT  = new THREE.Color('#FFA0A0'); // Light Pastel Rose Red
const COLOR_LEFT   = new THREE.Color('#FFC875'); // Light Soft Pastel Apricot Orange
const COLOR_TOP    = new THREE.Color('#FFFFFF'); // Pure Radiant White
const COLOR_BOTTOM = new THREE.Color('#FFF59D'); // Light Soft Lemon Yellow
const COLOR_FRONT  = new THREE.Color('#93E9BE'); // Light Soft Mint Pastel Green
const COLOR_BACK   = new THREE.Color('#B3D8FF'); // Light Soft Ice Pastel Blue
const COLOR_INNER  = new THREE.Color('#2A2B30'); // Light Charcoal Core Plastic

const COLOR_ABOUT_EVEN = new THREE.Color('#1A1816');
const COLOR_ABOUT_ODD = new THREE.Color('#2A2521');
const COLOR_ASSEMBLE = new THREE.Color('#6E260E');

const EMISSIVE_HERO = new THREE.Color('#222222');
const EMISSIVE_ABOUT = new THREE.Color('#B85C3B');
const EMISSIVE_ASSEMBLE = new THREE.Color('#6E260E');

type Axis = 'x' | 'y' | 'z';
type Layer = -1 | 0 | 1;

interface RubiksMove {
  axis: Axis;
  layer: Layer;
  dir: 1 | -1;
}

// ── Rubik's Helper Functions ──────────────────────────────────────────────────
function generateScrambleMoves(count = 10): RubiksMove[] {
  const axes: Axis[] = ['x', 'y', 'z'];
  const layers: Layer[] = [-1, 0, 1];
  const dirs: (1 | -1)[] = [1, -1];
  const moves: RubiksMove[] = [];

  for (let i = 0; i < count; i++) {
    let axis: Axis, layer: Layer, dir: 1 | -1;
    do {
      axis = axes[Math.floor(Math.random() * 3)];
      layer = layers[Math.floor(Math.random() * 3)];
      dir = dirs[Math.floor(Math.random() * 2)];
    } while (
      moves.length > 0 &&
      moves[moves.length - 1].axis === axis &&
      moves[moves.length - 1].layer === layer
    );
    moves.push({ axis, layer, dir });
  }
  return moves;
}

function getHomeCubieStates(): { pos: THREE.Vector3; rot: THREE.Quaternion }[] {
  const states: { pos: THREE.Vector3; rot: THREE.Quaternion }[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        states.push({
          pos: new THREE.Vector3(x * STEP, y * STEP, z * STEP),
          rot: new THREE.Quaternion(),
        });
      }
    }
  }
  return states;
}

function applyMoveToState(
  states: { pos: THREE.Vector3; rot: THREE.Quaternion }[],
  move: RubiksMove,
  step: number
) {
  const rotAxis =
    move.axis === 'x'
      ? new THREE.Vector3(1, 0, 0)
      : move.axis === 'y'
      ? new THREE.Vector3(0, 1, 0)
      : new THREE.Vector3(0, 0, 1);
  const angle = move.dir * (Math.PI / 2);
  const dQuat = new THREE.Quaternion().setFromAxisAngle(rotAxis, angle);

  states.forEach((st) => {
    const val =
      move.axis === 'x'
        ? st.pos.x
        : move.axis === 'y'
        ? st.pos.y
        : st.pos.z;

    if (Math.abs(val - move.layer * step) < 0.08) {
      st.pos.applyQuaternion(dQuat);
      // Snap position to exact grid steps to eliminate floating-point drift
      st.pos.x = Math.round(st.pos.x / step) * step;
      st.pos.y = Math.round(st.pos.y / step) * step;
      st.pos.z = Math.round(st.pos.z / step) * step;

      st.rot.premultiply(dQuat);
    }
  });
}

export function HeroSculpture({ mouse }: HeroSculptureProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const subCubesGroupRef = useRef<THREE.Group>(null);
  const cubieMeshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const scrollProgressRef = useRef(0);
  const { playShatterSound } = useSound();

  // Mouse Drag Rotation
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0, y: 0 });

  // Page construction mode
  const [isAssemblingPage, setIsAssemblingPage] = useState(false);

  // Return-home assembly animation (t: 0=scattered, 1=cube formed)
  const assemblyTRef = useRef(0);
  const isAssemblingRef = useRef(true);
  const prevScrollRef = useRef(0);
  const launchPositions = useRef<[number, number, number][]>([]);
  const launchRotations = useRef<THREE.Quaternion[]>([]);

  // About section activation (0 = not visible, 1 = fully visible)
  const aboutActivationRef = useRef(0);
  const isAboutVisibleRef = useRef(false);

  // Shattered pieces state
  const [shatteredMap, setShatteredMap] = useState<{
    [key: number]: { vel: [number, number, number]; scale: number };
  }>({});

  // Mobile responsiveness check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Rubik's Solver Refs ───────────────────────────────────────────────────
  const activeCubieStatesRef = useRef<{ pos: THREE.Vector3; rot: THREE.Quaternion }[]>([]);
  const scrambledStatesRef = useRef<{ pos: THREE.Vector3; rot: THREE.Quaternion }[]>([]);
  const solveMovesRef = useRef<RubiksMove[]>([]);

  const solveMoveIdxRef = useRef(0);
  const moveTimerRef = useRef(0);
  const pauseTimerRef = useRef(0);
  const isPauseRef = useRef(false);
  const holdSolvedTimerRef = useRef(0);
  const isSolvedHoldRef = useRef(false);

  // Function to generate a new scramble & set up solver moves
  const initScrambleAndSolver = () => {
    const homeStates = getHomeCubieStates();
    const scrambleMoves = generateScrambleMoves(10);

    const scrambled = homeStates.map((s) => ({
      pos: s.pos.clone(),
      rot: s.rot.clone(),
    }));

    for (const m of scrambleMoves) {
      applyMoveToState(scrambled, m, STEP);
    }

    scrambledStatesRef.current = scrambled;
    activeCubieStatesRef.current = scrambled.map((s) => ({
      pos: s.pos.clone(),
      rot: s.rot.clone(),
    }));

    solveMovesRef.current = scrambleMoves
      .slice()
      .reverse()
      .map((m) => ({ ...m, dir: (m.dir * -1) as 1 | -1 }));

    solveMoveIdxRef.current = 0;
    moveTimerRef.current = 0;
    pauseTimerRef.current = 0;
    isPauseRef.current = false;
    holdSolvedTimerRef.current = 0;
    isSolvedHoldRef.current = false;
  };

  // Initialize scramble on mount
  useEffect(() => {
    initScrambleAndSolver();
    assemblyTRef.current = 0;
    isAssemblingRef.current = true;
  }, []);

  // ── Generate 3x3x3 sub-cube metadata & face materials ─────────────────────
  const cubeData = useMemo(() => {
    const data: {
      gridPos: [number, number, number];
      initialPos: [number, number, number];
      materials: THREE.MeshPhysicalMaterial[];
      explodeDir: [number, number, number];
      scatterGridPos: [number, number, number];
      spreadWidePos: [number, number, number];
      aboutPos: [number, number, number];
      aboutScale: number;
      rotationSpeed: [number, number, number];
    }[] = [];

    let index = 0;
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // 6 Face materials per cubie: [ +X, -X, +Y, -Y, +Z, -Z ]
          const mats = [
            // 0: +X (Right - Red)
            new THREE.MeshPhysicalMaterial({
              color: x === 1 ? COLOR_RIGHT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            // 1: -X (Left - Orange)
            new THREE.MeshPhysicalMaterial({
              color: x === -1 ? COLOR_LEFT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            // 2: +Y (Top - White)
            new THREE.MeshPhysicalMaterial({
              color: y === 1 ? COLOR_TOP : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            // 3: -Y (Bottom - Yellow)
            new THREE.MeshPhysicalMaterial({
              color: y === -1 ? COLOR_BOTTOM : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            // 4: +Z (Front - Green)
            new THREE.MeshPhysicalMaterial({
              color: z === 1 ? COLOR_FRONT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            // 5: -Z (Back - Blue)
            new THREE.MeshPhysicalMaterial({
              color: z === -1 ? COLOR_BACK : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
          ];

          const dirX = x === 0 ? (Math.random() - 0.5) * 3 : x * 2.5;
          const dirY = y === 0 ? (Math.random() - 0.5) * 3 : y * 2.5;
          const dirZ = z === 0 ? (Math.random() - 0.5) * 3 : z * 2.5;

          const col = index % 6;
          const row = Math.floor(index / 6);
          const gridX = (col - 2.5) * 1.8;
          const gridY = (2 - row) * 1.5 - 3.5;
          const gridZ = (Math.random() - 0.5) * 1.5;

          const spreadCol = index % 7;
          const spreadRow = Math.floor(index / 7);
          const spreadX = (spreadCol - 3) * 2.2;
          const spreadY = (1.8 - spreadRow) * 1.6;
          const spreadZ = (Math.random() - 0.5) * 2.0;

          // Orbital Spread positions for About section
          const tier = index % 3;
          const angleStep = (index / 27) * Math.PI * 2;
          const jitterAngle = (Math.random() - 0.5) * 0.6;
          const angle = angleStep + jitterAngle;
          const ringRadii = [0.22, 0.55, 0.95];
          const ringR = ringRadii[tier];
          const aboutX = Math.cos(angle) * ringR * 1.25 + (Math.random() - 0.5) * 0.15;
          const aboutY = Math.sin(angle) * ringR * 0.78 + (Math.random() - 0.5) * 0.15;
          const aboutZ = (Math.random() - 0.5) * 1.4;
          const aboutScale = [0.20, 0.28, 0.38][tier] + Math.random() * 0.08;

          data.push({
            gridPos: [x, y, z],
            initialPos: [x * STEP, y * STEP, z * STEP],
            materials: mats,
            explodeDir: [dirX, dirY, dirZ],
            scatterGridPos: [gridX, gridY, gridZ],
            spreadWidePos: [spreadX, spreadY, spreadZ],
            aboutPos: [aboutX, aboutY, aboutZ],
            aboutScale,
            rotationSpeed: [
              (Math.random() - 0.5) * 3.0,
              (Math.random() - 0.5) * 3.0,
              (Math.random() - 0.5) * 3.0,
            ],
          });
          index++;
        }
      }
    }
    return data;
  }, []);

  // Original face colors reference for smooth About section blending
  const baseFaceColors = useMemo(() => {
    return cubeData.map((item) => item.materials.map((m) => m.color.clone()));
  }, [cubeData]);

  // Launch positions & rotations for return-home assembly
  useEffect(() => {
    launchPositions.current = cubeData.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI;
      const radius = 6.5 + Math.random() * 5.0; // Wide radius so pieces clearly fly in from off-screen/viewport edges!
      return [
        Math.cos(angle) * Math.cos(elevation) * radius,
        Math.sin(elevation) * radius,
        Math.sin(angle) * Math.cos(elevation) * radius,
      ] as [number, number, number];
    });

    launchRotations.current = cubeData.map(() => {
      return new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4
        )
      );
    });
  }, [cubeData]);

  // ── IntersectionObserver: detect when #about is in viewport ───────────────
  useEffect(() => {
    const aboutEl = document.getElementById('about');
    if (!aboutEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isAboutVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(aboutEl);
    return () => observer.disconnect();
  }, []);

  // Travel destination event
  useEffect(() => {
    const handleTravelEvent = () => {
      playShatterSound();
      setIsAssemblingPage(true);
      setTimeout(() => setIsAssemblingPage(false), 3200);
    };
    window.addEventListener('shatter-travel-destination', handleTravelEvent);
    return () => window.removeEventListener('shatter-travel-destination', handleTravelEvent);
  }, [playShatterSound]);

  // Drag rotation
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;
      dragRotationRef.current.y += deltaX * 0.008;
      dragRotationRef.current.x += deltaY * 0.008;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // Scroll tracking + return-home assembly detection
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const prev = prevScrollRef.current;
          const curr = self.progress;
          scrollProgressRef.current = curr;

          if (curr < 0.02 && Object.keys(shatteredMap).length > 0) {
            setShatteredMap({});
          }

          // Return home detection: snapped back near top
          if (prev > 0.08 && curr < 0.03 && !isAssemblingRef.current) {
            initScrambleAndSolver();
            assemblyTRef.current = 0;
            isAssemblingRef.current = true;
          }

          prevScrollRef.current = curr;
        },
      });
    });
    return () => ctx.revert();
  }, [shatteredMap]);

  // ── useFrame: Scramble, Assembly, Layer Solving & Master Animations ───────
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const mouseX = mouse.normalizedX;
    const mouseY = mouse.normalizedY;
    const scrollP = scrollProgressRef.current;

    // 1. Advance return-home / initial mount assembly
    if (isAssemblingRef.current && assemblyTRef.current < 1) {
      assemblyTRef.current = Math.min(assemblyTRef.current + delta / ASSEMBLY_DURATION, 1);
      if (assemblyTRef.current >= 1) {
        isAssemblingRef.current = false;
      }
    }

    // 2. Advance Rubik's Layer Solver Timer (when fully assembled)
    if (assemblyTRef.current >= 1 && !isAssemblingPage) {
      const moves = solveMovesRef.current;
      const currentIdx = solveMoveIdxRef.current;

      if (isSolvedHoldRef.current) {
        holdSolvedTimerRef.current += delta;
        if (holdSolvedTimerRef.current >= SOLVED_HOLD_DURATION) {
          // Re-scramble and solve again!
          initScrambleAndSolver();
        }
      } else if (currentIdx < moves.length) {
        if (isPauseRef.current) {
          pauseTimerRef.current += delta;
          if (pauseTimerRef.current >= PAUSE_DURATION) {
            isPauseRef.current = false;
            moveTimerRef.current = 0;
            solveMoveIdxRef.current++;
            if (solveMoveIdxRef.current >= moves.length) {
              isSolvedHoldRef.current = true;
              holdSolvedTimerRef.current = 0;
            }
          }
        } else {
          moveTimerRef.current += delta;
          if (moveTimerRef.current >= MOVE_DURATION) {
            // Apply full turn permanently to active states
            const activeMove = moves[currentIdx];
            if (activeMove) {
              applyMoveToState(activeCubieStatesRef.current, activeMove, STEP);
            }
            isPauseRef.current = true;
            pauseTimerRef.current = 0;
          }
        }
      }
    }

    // Smooth About section activation
    const aboutTarget = isAboutVisibleRef.current ? 1 : 0;
    const aboutSpeed = isAboutVisibleRef.current ? delta * 0.9 : delta * 0.45;
    aboutActivationRef.current = THREE.MathUtils.clamp(
      aboutActivationRef.current + (aboutTarget - aboutActivationRef.current) * aboutSpeed * 10,
      0,
      1
    );
    const aboutT = easeInOutCubic(aboutActivationRef.current);

    // ── Master Group Rotation & Position ─────────────────────────────────────
    if (masterGroupRef.current) {
      const targetRotX = mouseY * 0.45 + time * 0.18 + scrollP * Math.PI * 0.8 + dragRotationRef.current.x;
      const targetRotY = mouseX * 0.45 + time * 0.25 + scrollP * Math.PI * 1.5 + dragRotationRef.current.y;

      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, targetRotX, 0.06);
      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, targetRotY, 0.06);

      const heroX = isMobile ? 0 : 2.2;
      const heroY = isMobile ? 0.85 : 0;

      const scrollX = THREE.MathUtils.lerp(heroX, 0, Math.min(scrollP * 3, 1));
      const scrollY = Math.sin(time * 0.8) * 0.08 - scrollP * 7.5 + (isMobile ? heroY : 0);

      const aboutGroupX = 0;
      const aboutGroupY = Math.sin(time * 0.4) * 0.06;

      const targetPosX = isAssemblingPage ? 0 : THREE.MathUtils.lerp(scrollX, aboutGroupX, aboutT);
      const targetPosY = isAssemblingPage ? 0 : THREE.MathUtils.lerp(scrollY, aboutGroupY, aboutT);

      masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX, 0.06);
      masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY, 0.06);

      const targetScale = isMobile ? 0.72 : 1.25;
      masterGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(masterGroupRef.current.scale.x, targetScale, 0.06)
      );
    }

    // ── Sub-Cubes Updates ─────────────────────────────────────────────────────
    if (subCubesGroupRef.current) {
      const isDoingAssembly = isAssemblingRef.current || assemblyTRef.current < 0.98;
      const moves = solveMovesRef.current;
      const currentMoveIdx = solveMoveIdxRef.current;
      const activeMove = moves[currentMoveIdx];

      cubeData.forEach((item, idx) => {
        const meshObj = cubieMeshRefs.current[idx];
        if (!meshObj) return;

        // Dynamic Material Lerp (Rubik's colors <-> Dark orbital about section)
        item.materials.forEach((mat, fIdx) => {
          const baseCol = baseFaceColors[idx][fIdx];
          const targetAboutColor = idx % 2 === 0 ? COLOR_ABOUT_EVEN : COLOR_ABOUT_ODD;

          if (isAssemblingPage) {
            mat.color.copy(COLOR_ASSEMBLE);
            mat.emissive.copy(EMISSIVE_ASSEMBLE);
            mat.emissiveIntensity = 0.35;
          } else if (aboutT > 0.01) {
            mat.color.lerpColors(baseCol, targetAboutColor, aboutT * 0.65);
            mat.emissive.lerpColors(baseCol, EMISSIVE_ABOUT, aboutT);
            mat.emissiveIntensity = THREE.MathUtils.lerp(0.10, 0.25, aboutT);
            mat.roughness = THREE.MathUtils.lerp(0.12, 0.25, aboutT);
          } else {
            mat.color.copy(baseCol);
            mat.emissive.copy(baseCol);
            mat.emissiveIntensity = 0.10;
            mat.roughness = 0.12;
          }
        });

        const shatterData = shatteredMap[idx];

        if (shatterData) {
          // Click shatter physics
          meshObj.position.x += shatterData.vel[0] * delta * 5.0;
          meshObj.position.y += shatterData.vel[1] * delta * 5.0;
          meshObj.position.z += shatterData.vel[2] * delta * 5.0;
          const newScale = Math.max(0, meshObj.scale.x - delta * 1.5);
          meshObj.scale.set(newScale, newScale, newScale);
          return;
        }

        // Calculate Target Position & Rotation in Cube Space
        let cubeSpacePos = activeCubieStatesRef.current[idx]?.pos.clone() ||
          new THREE.Vector3(item.initialPos[0], item.initialPos[1], item.initialPos[2]);
        let cubeSpaceRot = activeCubieStatesRef.current[idx]?.rot.clone() ||
          new THREE.Quaternion();

        // Active Layer Turn Interpolation
        if (
          assemblyTRef.current >= 1 &&
          !isAssemblingPage &&
          !isSolvedHoldRef.current &&
          !isPauseRef.current &&
          activeMove
        ) {
          const rotAxis =
            activeMove.axis === 'x'
              ? new THREE.Vector3(1, 0, 0)
              : activeMove.axis === 'y'
              ? new THREE.Vector3(0, 1, 0)
              : new THREE.Vector3(0, 0, 1);

          const val =
            activeMove.axis === 'x'
              ? cubeSpacePos.x
              : activeMove.axis === 'y'
              ? cubeSpacePos.y
              : cubeSpacePos.z;

          if (Math.abs(val - activeMove.layer * STEP) < 0.08) {
            const progress = Math.min(moveTimerRef.current / MOVE_DURATION, 1);
            const eased = easeInOutCubic(progress);
            const angle = activeMove.dir * (Math.PI / 2) * eased;
            const stepQuat = new THREE.Quaternion().setFromAxisAngle(rotAxis, angle);

            cubeSpacePos.applyQuaternion(stepQuat);
            cubeSpaceRot.premultiply(stepQuat);
          }
        }

        // Mode-Based Positioning & Animation
        if (isDoingAssembly && !isAssemblingPage) {
          // Return home assembly: fly from scattered launch space -> scrambled cube state
          const t = easeOutExpo(assemblyTRef.current);
          const launch = launchPositions.current[idx];
          const launchR = launchRotations.current[idx];

          if (launch) {
            const targetPos = scrambledStatesRef.current[idx]?.pos || cubeSpacePos;
            meshObj.position.x = THREE.MathUtils.lerp(launch[0], targetPos.x, t);
            meshObj.position.y = THREE.MathUtils.lerp(launch[1], targetPos.y, t);
            meshObj.position.z = THREE.MathUtils.lerp(launch[2], targetPos.z, t);
          }

          if (launchR) {
            const targetRot = scrambledStatesRef.current[idx]?.rot || cubeSpaceRot;
            meshObj.quaternion.slerpQuaternions(launchR, targetRot, t);
          }

          const scaledT = easeOutExpo(Math.min(assemblyTRef.current * 1.4, 1));
          meshObj.scale.setScalar(THREE.MathUtils.lerp(0.05, 1.0, scaledT));

        } else {
          // Normal Hero / Scroll / About blending
          let scrollTargetX: number, scrollTargetY: number, scrollTargetZ: number;

          if (isAssemblingPage) {
            scrollTargetX = item.spreadWidePos[0];
            scrollTargetY = item.spreadWidePos[1];
            scrollTargetZ = item.spreadWidePos[2];
          } else if (scrollP <= 0.02) {
            scrollTargetX = cubeSpacePos.x;
            scrollTargetY = cubeSpacePos.y;
            scrollTargetZ = cubeSpacePos.z;
          } else {
            const factor = Math.min(scrollP * 4.0, 1.0);
            scrollTargetX = THREE.MathUtils.lerp(
              cubeSpacePos.x + item.explodeDir[0] * factor * 1.5,
              item.scatterGridPos[0],
              factor
            );
            scrollTargetY = THREE.MathUtils.lerp(
              cubeSpacePos.y + item.explodeDir[1] * factor * 1.5,
              item.scatterGridPos[1],
              factor
            );
            scrollTargetZ = THREE.MathUtils.lerp(
              cubeSpacePos.z + item.explodeDir[2] * factor * 1.5,
              item.scatterGridPos[2],
              factor
            );
          }

          const targetX = THREE.MathUtils.lerp(scrollTargetX, item.aboutPos[0], aboutT);
          const targetY = THREE.MathUtils.lerp(scrollTargetY, item.aboutPos[1], aboutT);
          const targetZ = THREE.MathUtils.lerp(scrollTargetZ, item.aboutPos[2], aboutT);

          const baseLerpSpeed = isAssemblingPage ? 0.022 : 0.08;
          const lerpSpeed = aboutT > 0.05 ? 0.018 : baseLerpSpeed;

          meshObj.position.x = THREE.MathUtils.lerp(meshObj.position.x, targetX, lerpSpeed);
          meshObj.position.y = THREE.MathUtils.lerp(meshObj.position.y, targetY, lerpSpeed);
          meshObj.position.z = THREE.MathUtils.lerp(meshObj.position.z, targetZ, lerpSpeed);

          const baseScale = isAssemblingPage ? 1.4 : 1.0;
          const targetScale = THREE.MathUtils.lerp(baseScale, item.aboutScale, aboutT);
          const scaleSpeed = aboutT > 0.05 ? 0.016 : baseLerpSpeed;

          meshObj.scale.setScalar(
            THREE.MathUtils.lerp(meshObj.scale.x, targetScale, scaleSpeed)
          );

          if (scrollP > 0.05 || isAssemblingPage || aboutT > 0.1) {
            const rotSpeed = aboutT > 0.5 ? item.rotationSpeed[0] * 0.18 : item.rotationSpeed[0] * 0.6;
            meshObj.rotation.x += rotSpeed * delta;
            meshObj.rotation.y += item.rotationSpeed[1] * (aboutT > 0.5 ? 0.18 : 0.6) * delta;
          } else {
            // Smoothly lerp orientation to active cube space orientation
            meshObj.quaternion.slerp(cubeSpaceRot, 0.12);
          }
        }
      });
    }
  });

  const handlePointerDown = (e: any, index: number) => {
    e.stopPropagation();
    const item = cubeData[index];
    if (!item) return;
    playShatterSound();
    setShatteredMap((prev) => ({
      ...prev,
      [index]: {
        vel: [
          item.explodeDir[0] * (Math.random() + 0.8),
          item.explodeDir[1] * (Math.random() + 0.8),
          item.explodeDir[2] * (Math.random() + 0.8),
        ],
        scale: 1.0,
      },
    }));
  };

  const handleGroupPointerOver = (e: any) => {
    e.stopPropagation();
    document.body.dataset.cursor = 'target';
    window.dispatchEvent(new CustomEvent('cursor-change', { detail: 'target' }));
  };

  const handleGroupPointerOut = (e: any) => {
    e.stopPropagation();
    delete document.body.dataset.cursor;
    window.dispatchEvent(new CustomEvent('cursor-change', { detail: 'default' }));
  };

  return (
    <group position={[0, 0, 0]}>
      {/* Studio Lighting tailored for Rubik's gloss materials */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[6, 6, 6]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-6, -6, -4]} intensity={0.8} color="#E2E8F0" />
      <directionalLight position={[0, -4, 4]} intensity={0.6} color="#FFF5EA" />

      {/* 3x3 Master Cube Group */}
      <group
        ref={masterGroupRef}
        scale={1.25}
        onPointerOver={handleGroupPointerOver}
        onPointerOut={handleGroupPointerOut}
      >
        {/* Invisible Hit Sphere for pointer events */}
        <mesh visible={false}>
          <sphereGeometry args={[1.8, 16, 16]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <group ref={subCubesGroupRef}>
          {cubeData.map((item, idx) => (
            <mesh
              key={idx}
              ref={(el) => {
                cubieMeshRefs.current[idx] = el;
              }}
              position={item.initialPos}
              material={item.materials}
              onPointerDown={(e) => handlePointerDown(e, idx)}
            >
              <boxGeometry args={[0.39, 0.39, 0.39]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

