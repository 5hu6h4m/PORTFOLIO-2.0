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
  mouse?: { normalizedX: number; normalizedY: number };
  skipScatter?: boolean;
  onSolveComplete?: () => void;
}

// Ease functions for weightless cinematic motion
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

const ASSEMBLY_DURATION = 3.0; // 3.0s smooth weightless red scatter assembly
const MOVE_DURATION = 0.38; // Smooth speedcube layer turns
const PAUSE_DURATION = 0.09; // Quick pause between turns
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

// Maroon Red Scatter Palette (Cutscene solve glow & shatter)
const COLOR_RED_SCATTER = new THREE.Color('#4A0404'); // Rich Deep Maroon Red
const EMISSIVE_RED_SCATTER = new THREE.Color('#2A0000'); // Deep Maroon Blood Red Glow

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
      st.pos.x = Math.round(st.pos.x / step) * step;
      st.pos.y = Math.round(st.pos.y / step) * step;
      st.pos.z = Math.round(st.pos.z / step) * step;

      st.rot.premultiply(dQuat);
    }
  });
}

export function HeroSculpture({ mouse, skipScatter = false, onSolveComplete }: HeroSculptureProps) {
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

  // Red glow transition upon solve completion in cutscene mode
  const redGlowTRef = useRef(0);
  const isRedGlowingRef = useRef(false);
  const hasShatteredCutsceneRef = useRef(false);

  // Return-home assembly animation (t: 0=scattered red across screen, 1=cube formed)
  const assemblyTRef = useRef(0);
  const isAssemblingRef = useRef(true);
  const prevScrollRef = useRef(0);
  const launchPositions = useRef<[number, number, number][]>([]);
  const launchRotations = useRef<THREE.Quaternion[]>([]);

  // About section activation
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

  // Helper to randomize red scatter launch positions across screen
  const randomizeRedScatterPositions = () => {
    launchPositions.current = Array.from({ length: 27 }, () => {
      const spreadX = (Math.random() - 0.5) * 16.0;
      const spreadY = (Math.random() - 0.5) * 12.0;
      const spreadZ = (Math.random() - 0.5) * 6.0;
      return [spreadX, spreadY, spreadZ] as [number, number, number];
    });

    launchRotations.current = Array.from({ length: 27 }, () => {
      return new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4,
          Math.random() * Math.PI * 4
        )
      );
    });
  };

  // Function to generate a new scramble & set up solver moves
  const initScrambleAndSolver = () => {
    randomizeRedScatterPositions();
    const homeStates = getHomeCubieStates();
    const scrambleMoves = generateScrambleMoves(skipScatter ? 7 : 10);

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

  // Trigger initial scatter burst on mount & listen for preloader finish
  useEffect(() => {
    initScrambleAndSolver();
    redGlowTRef.current = 0;
    isRedGlowingRef.current = false;
    hasShatteredCutsceneRef.current = false;
    if (skipScatter) {
      assemblyTRef.current = 1.0;
      isAssemblingRef.current = false;
    } else {
      assemblyTRef.current = 0;
      isAssemblingRef.current = true;
    }

    const handlePreloaderComplete = () => {
      initScrambleAndSolver();
      if (skipScatter) {
        assemblyTRef.current = 1.0;
        isAssemblingRef.current = false;
      } else {
        assemblyTRef.current = 0;
        isAssemblingRef.current = true;
      }
    };

    window.addEventListener('portfolio-preloader-complete', handlePreloaderComplete);
    return () => window.removeEventListener('portfolio-preloader-complete', handlePreloaderComplete);
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
          const mats = [
            new THREE.MeshPhysicalMaterial({
              color: x === 1 ? COLOR_RIGHT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            new THREE.MeshPhysicalMaterial({
              color: x === -1 ? COLOR_LEFT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            new THREE.MeshPhysicalMaterial({
              color: y === 1 ? COLOR_TOP : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            new THREE.MeshPhysicalMaterial({
              color: y === -1 ? COLOR_BOTTOM : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
            new THREE.MeshPhysicalMaterial({
              color: z === 1 ? COLOR_FRONT : COLOR_INNER,
              roughness: 0.15,
              metalness: 0.05,
              clearcoat: 0.5,
              clearcoatRoughness: 0.08,
              reflectivity: 0.6,
            }),
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

  // Scroll tracking + Return-to-Hero scatter burst trigger
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

          // Return to Hero section detection: whenever scrolling back up to top (< 0.03)
          if (prev > 0.06 && curr < 0.03 && !isAssemblingRef.current) {
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
    const mouseX = mouse?.normalizedX ?? state.pointer.x;
    const mouseY = mouse?.normalizedY ?? state.pointer.y;
    const scrollP = skipScatter ? 0 : scrollProgressRef.current;

    // 1. Advance return-home / initial mount 3s weightless red scatter assembly
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
              if (skipScatter) {
                isRedGlowingRef.current = true;
              } else {
                if (onSolveComplete) onSolveComplete();
              }
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

    // Smooth About section activation (disabled during cutscene mode)
    const aboutTarget = (skipScatter ? false : isAboutVisibleRef.current) ? 1 : 0;
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

      if (skipScatter) {
        masterGroupRef.current.position.x = 0;
        masterGroupRef.current.position.y = -0.35;
      } else {
        const targetPosX = isAssemblingPage ? 0 : THREE.MathUtils.lerp(scrollX, aboutGroupX, aboutT);
        const targetPosY = isAssemblingPage ? 0 : THREE.MathUtils.lerp(scrollY, aboutGroupY, aboutT);
        masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetPosX, 0.06);
        masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetPosY, 0.06);
      }

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
      
      // Butter-smooth cubic ease for weightless particle gliding
      const smoothT = easeInOutCubic(assemblyTRef.current);
      const redFactor = 1 - easeOutQuart(assemblyTRef.current); // 1 at t=0 (full red), 0 at t=1 (normal colors)

      // Advance cutscene red glow transition once solved
      if (skipScatter && isRedGlowingRef.current) {
        redGlowTRef.current = Math.min(redGlowTRef.current + delta * 3.5, 1.0);
        if (redGlowTRef.current >= 1.0 && !hasShatteredCutsceneRef.current) {
          hasShatteredCutsceneRef.current = true;
          playShatterSound();
          const newMap: { [key: number]: { vel: [number, number, number]; scale: number } } = {};
          for (let i = 0; i < 27; i++) {
            newMap[i] = {
              vel: [
                (Math.random() - 0.5) * 6.5,
                (Math.random() - 0.5) * 6.5,
                (Math.random() - 0.5) * 6.5,
              ],
              scale: 0.8,
            };
          }
          setShatteredMap(newMap);
          setTimeout(() => {
            if (onSolveComplete) onSolveComplete();
          }, 650);
        }
      }

      cubeData.forEach((item, idx) => {
        const meshObj = cubieMeshRefs.current[idx];
        if (!meshObj) return;

        // Dynamic Material Lerp (Terracotta Red Scatter -> Rubik's Colors <-> Dark Orbital About Section)
        item.materials.forEach((mat, fIdx) => {
          const baseCol = baseFaceColors[idx][fIdx];
          const targetAboutColor = idx % 2 === 0 ? COLOR_ABOUT_EVEN : COLOR_ABOUT_ODD;

          const glowFactor = skipScatter && isRedGlowingRef.current ? redGlowTRef.current : redFactor;

          if (glowFactor > 0.01) {
            // Smoothly blend solved face colors into glowing Terracotta Red!
            mat.color.lerpColors(baseCol, COLOR_RED_SCATTER, glowFactor);
            mat.emissive.lerpColors(baseCol, EMISSIVE_RED_SCATTER, glowFactor);
            mat.emissiveIntensity = THREE.MathUtils.lerp(0.10, 0.65, glowFactor);
            mat.roughness = THREE.MathUtils.lerp(0.12, 0.05, glowFactor);
          } else if (isAssemblingPage) {
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
          // Click & Cutscene shatter physics: explode outwards then float gently in 3D background space
          meshObj.position.x += shatterData.vel[0] * delta * 3.5;
          meshObj.position.y += shatterData.vel[1] * delta * 3.5;
          meshObj.position.z += shatterData.vel[2] * delta * 3.5;

          meshObj.rotation.x += delta * (1.5 + (idx % 5) * 0.2);
          meshObj.rotation.y += delta * (1.5 + (idx % 5) * 0.2);
          meshObj.rotation.z += delta * (1.0 + (idx % 3) * 0.2);

          // Maintain minimum continuous drift speed so scattered pieces keep floating across the screen!
          const currentSpeed = Math.hypot(...shatterData.vel);
          if (currentSpeed > 1.2) {
            shatterData.vel[0] *= 0.96;
            shatterData.vel[1] *= 0.96;
            shatterData.vel[2] *= 0.96;
          }
        } else if (isAssemblingPage) {
          // Travel assembly
          const t = Math.sin(time * 3 + idx) * 0.5 + 0.5;
          const targetP = item.spreadWidePos;
          meshObj.position.x = THREE.MathUtils.lerp(meshObj.position.x, targetP[0], 0.08);
          meshObj.position.y = THREE.MathUtils.lerp(meshObj.position.y, targetP[1], 0.08);
          meshObj.position.z = THREE.MathUtils.lerp(meshObj.position.z, targetP[2], 0.08);
        } else if (isDoingAssembly) {
          // ── SMOOTH WEIGHTLESS 3-SECOND RED SCATTER & ASSEMBLY ─────────────
          const launchP = launchPositions.current[idx] || [0, 0, 0];
          const homeState = activeCubieStatesRef.current[idx] || { pos: new THREE.Vector3(...item.initialPos), rot: new THREE.Quaternion() };

          meshObj.position.x = THREE.MathUtils.lerp(launchP[0], homeState.pos.x, smoothT);
          meshObj.position.y = THREE.MathUtils.lerp(launchP[1], homeState.pos.y, smoothT);
          meshObj.position.z = THREE.MathUtils.lerp(launchP[2], homeState.pos.z, smoothT);

          const launchQ = launchRotations.current[idx] || new THREE.Quaternion();
          meshObj.quaternion.slerpQuaternions(launchQ, homeState.rot, smoothT);
        } else if (aboutT > 0.01) {
          // ── ABOUT SECTION ORBITAL SPREAD ───────────────────────────────────
          const homeState = activeCubieStatesRef.current[idx] || { pos: new THREE.Vector3(...item.initialPos), rot: new THREE.Quaternion() };
          const orbitAngle = time * 0.25 + idx * 0.2;
          const orbitalX = item.aboutPos[0] + Math.cos(orbitAngle) * 0.3;
          const orbitalY = item.aboutPos[1] + Math.sin(orbitAngle) * 0.3;
          const orbitalZ = item.aboutPos[2];

          // Compute smooth transition from scroll scatter to orbital spread
          const scatterFactor = Math.min(scrollP / 0.12, 1);
          const scrollScatterX = item.explodeDir[0] * scatterFactor * 1.5;
          const scrollScatterY = item.explodeDir[1] * scatterFactor * 1.5;
          const scrollScatterZ = item.explodeDir[2] * scatterFactor * 1.5;

          const startX = homeState.pos.x + scrollScatterX;
          const startY = homeState.pos.y + scrollScatterY;
          const startZ = homeState.pos.z + scrollScatterZ;

          const targetX = THREE.MathUtils.lerp(startX, orbitalX, aboutT);
          const targetY = THREE.MathUtils.lerp(startY, orbitalY, aboutT);
          const targetZ = THREE.MathUtils.lerp(startZ, orbitalZ, aboutT);

          meshObj.position.set(targetX, targetY, targetZ);
          meshObj.quaternion.slerp(homeState.rot, 0.1);
        } else {
          // ── NORMAL SOLVER & LAYER TURNS (After 3 Seconds) ─────────────────
          const stateObj = activeCubieStatesRef.current[idx];
          if (!stateObj) return;

          let currentTargetPos = stateObj.pos.clone();
          let currentTargetRot = stateObj.rot.clone();

          if (activeMove && !isPauseRef.current && !isSolvedHoldRef.current) {
            const val =
              activeMove.axis === 'x'
                ? stateObj.pos.x
                : activeMove.axis === 'y'
                ? stateObj.pos.y
                : stateObj.pos.z;

            if (Math.abs(val - activeMove.layer * STEP) < 0.08) {
              const moveProgress = moveTimerRef.current / MOVE_DURATION;
              const moveEase = easeInOutCubic(Math.min(moveProgress, 1));
              const rotAxis =
                activeMove.axis === 'x'
                  ? new THREE.Vector3(1, 0, 0)
                  : activeMove.axis === 'y'
                  ? new THREE.Vector3(0, 1, 0)
                  : new THREE.Vector3(0, 0, 1);
              const turnAngle = activeMove.dir * (Math.PI / 2) * moveEase;
              const turnQuat = new THREE.Quaternion().setFromAxisAngle(rotAxis, turnAngle);

              currentTargetPos.applyQuaternion(turnQuat);
              currentTargetRot.premultiply(turnQuat);
            }
          }

          // Apply gradual scroll-driven scatter offset starting from scrollP > 0
          const scatterFactor = Math.min(scrollP / 0.12, 1);
          const scrollScatterX = item.explodeDir[0] * scatterFactor * 1.5;
          const scrollScatterY = item.explodeDir[1] * scatterFactor * 1.5;
          const scrollScatterZ = item.explodeDir[2] * scatterFactor * 1.5;

          const finalTargetPos = new THREE.Vector3(
            currentTargetPos.x + scrollScatterX,
            currentTargetPos.y + scrollScatterY,
            currentTargetPos.z + scrollScatterZ
          );

          meshObj.position.lerp(finalTargetPos, 0.35);
          meshObj.quaternion.slerp(currentTargetRot, 0.35);
        }
      });
    }
  });

  return (
    <group ref={masterGroupRef} position={skipScatter ? [0, -0.35, 0] : [2.2, 0, 0]} scale={1.25}>
      <group ref={subCubesGroupRef}>
        {cubeData.map((item, i) => (
          <mesh
            key={i}
            ref={(el) => { cubieMeshRefs.current[i] = el; }}
            position={item.initialPos}
            material={item.materials}
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              if (shatteredMap[i]) return;
              playShatterSound();

              // High-velocity outward explosive vector from cube center
              const [gx, gy, gz] = item.gridPos;
              const dirX = gx === 0 ? (Math.random() - 0.5) * 2 : gx;
              const dirY = gy === 0 ? (Math.random() - 0.5) * 2 : gy;
              const dirZ = gz === 0 ? (Math.random() - 0.5) * 2 : gz;
              const norm = Math.hypot(dirX, dirY, dirZ) || 1;

              const speed = 12.0 + Math.random() * 8.0;
              const outX = (dirX / norm) * speed + (Math.random() - 0.5) * 3.0;
              const outY = (dirY / norm) * speed + (Math.random() - 0.5) * 3.0;
              const outZ = (dirZ / norm) * speed + (Math.random() - 0.5) * 3.0;

              setShatteredMap((prev) => ({
                ...prev,
                [i]: {
                  vel: [outX, outY, outZ],
                  scale: 0.85,
                },
              }));
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (typeof document !== 'undefined') {
                document.body.style.cursor = 'pointer';
              }
            }}
            onPointerOut={() => {
              if (typeof document !== 'undefined') {
                document.body.style.cursor = 'auto';
              }
            }}
          >
            <boxGeometry args={[0.39, 0.39, 0.39]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
