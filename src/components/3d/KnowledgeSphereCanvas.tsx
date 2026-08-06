'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { TechItem } from '@/data/techStackData';

const CUBE_COUNT = 850;
const SPHERE_RADIUS = 3.2;

interface KnowledgeSphereProps {
  selectedTech: TechItem | null;
  hoveredTech: TechItem | null;
}

// ── INSTANCED SPHERE OF CUBES ───────────────────────────────────────────────
function InstancedCubeSphere({ selectedTech, hoveredTech }: KnowledgeSphereProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const activeTech = selectedTech || hoveredTech;

  // Generate sphere Fibonacci points & initial rotation offsets
  const { initialPositions, baseRotations, speeds } = useMemo(() => {
    const pos = new Float32Array(CUBE_COUNT * 3);
    const rots = new Float32Array(CUBE_COUNT * 3);
    const spd = new Float32Array(CUBE_COUNT);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < CUBE_COUNT; i++) {
      const y = 1 - (i / (CUBE_COUNT - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const r = SPHERE_RADIUS + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = Math.cos(theta) * radiusAtY * r;
      pos[i * 3 + 1] = y * r;
      pos[i * 3 + 2] = Math.sin(theta) * radiusAtY * r;

      rots[i * 3] = Math.random() * Math.PI * 2;
      rots[i * 3 + 1] = Math.random() * Math.PI * 2;
      rots[i * 3 + 2] = Math.random() * Math.PI * 2;

      spd[i] = 0.4 + Math.random() * 0.8;
    }

    return { initialPositions: pos, baseRotations: rots, speeds: spd };
  }, []);

  // Track current positions for smooth attraction & explosion morphing
  const currentPositions = useMemo(() => new Float32Array(initialPositions), [initialPositions]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const mouseLerp = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseLerp.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseLerp.current.y = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const isAttracting = !!activeTech;

    // Sphere global slow rotation
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouseLerp.current.y * 0.3, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, -mouseLerp.current.x * 0.3, 0.05);

    for (let i = 0; i < CUBE_COUNT; i++) {
      const idx = i * 3;
      const ox = initialPositions[idx];
      const oy = initialPositions[idx + 1];
      const oz = initialPositions[idx + 2];

      let targetX = ox;
      let targetY = oy;
      let targetZ = oz;

      // Breathing wave noise
      const wave = Math.sin(time * speeds[i] + i * 0.1) * 0.12;
      targetX += (ox / SPHERE_RADIUS) * wave;
      targetY += (oy / SPHERE_RADIUS) * wave;
      targetZ += (oz / SPHERE_RADIUS) * wave;

      // Attraction effect: top 30% of cubes converge toward central glass hero cube point
      if (isAttracting && i % 3 === 0) {
        // Attract toward center point (0, 0, 0)
        targetX = THREE.MathUtils.lerp(targetX, 0, 0.85);
        targetY = THREE.MathUtils.lerp(targetY, 0, 0.85);
        targetZ = THREE.MathUtils.lerp(targetZ, 0, 0.85);
      }

      // Smooth position lerp (gives spring physics feel)
      currentPositions[idx] = THREE.MathUtils.lerp(currentPositions[idx], targetX, isAttracting ? 0.08 : 0.05);
      currentPositions[idx + 1] = THREE.MathUtils.lerp(currentPositions[idx + 1], targetY, isAttracting ? 0.08 : 0.05);
      currentPositions[idx + 2] = THREE.MathUtils.lerp(currentPositions[idx + 2], targetZ, isAttracting ? 0.08 : 0.05);

      dummy.position.set(currentPositions[idx], currentPositions[idx + 1], currentPositions[idx + 2]);

      // Individual cube rotation
      const rx = baseRotations[idx] + time * 0.2 * speeds[i];
      const ry = baseRotations[idx + 1] + time * 0.25 * speeds[i];
      dummy.rotation.set(rx, ry, 0);

      // Scale down attracted cubes near center so hero cube takes over seamlessly
      let scale = 0.075;
      if (isAttracting && i % 3 === 0) {
        const distToCenter = Math.sqrt(
          currentPositions[idx] ** 2 + currentPositions[idx + 1] ** 2 + currentPositions[idx + 2] ** 2
        );
        scale = Math.max(0.01, scale * (distToCenter / 2));
      }
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, CUBE_COUNT]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#B55D3D"
        roughness={0.25}
        metalness={0.15}
        envMapIntensity={0.8}
      />
    </instancedMesh>
  );
}

// ── FLOATING GLASS HERO CUBE ────────────────────────────────────────────────
function GlassHeroCube({ activeTech }: { activeTech: TechItem }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.4;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={[0, 0, 0]}>
        {/* Outer Glass Cube */}
        <mesh ref={meshRef} scale={1.8}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#25201C"
            roughness={0.1}
            transmission={0.85}
            thickness={1.2}
            ior={1.5}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transparent={true}
            opacity={0.9}
          />
        </mesh>

        {/* Inner Glowing Core */}
        <mesh scale={1.2}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={activeTech.accentColor || '#B55D3D'} transparent opacity={0.35} />
        </mesh>

        {/* HTML 3D Floating Badge */}
        <Html center position={[0, 0, 0]} transform distanceFactor={5}>
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#161412]/80 backdrop-blur-xl border border-[#B55D3D]/30 shadow-2xl text-center select-none pointer-events-none w-44">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold font-mono mb-2 shadow-inner"
              style={{ backgroundColor: `${activeTech.accentColor || '#B55D3D'}25`, color: activeTech.accentColor || '#B55D3D', border: `1px solid ${activeTech.accentColor || '#B55D3D'}50` }}
            >
              {activeTech.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-sm font-serif font-bold text-[#FAF8F3] tracking-wide mb-1">
              {activeTech.name}
            </div>
            <div className="text-[9px] font-mono text-[#B55D3D] tracking-widest uppercase">
              {activeTech.proficiency || 95}% MASTERED
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

// ── FLOATING AMBIENT DUST PARTICLES ─────────────────────────────────────────
function AmbientDust() {
  const count = 150;
  const mesh = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return [pos];
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#B55D3D" transparent opacity={0.4} sizeAttenuation={true} />
    </points>
  );
}

// ── SCENE CANVAS ────────────────────────────────────────────────────────────
export function KnowledgeSphereCanvas({ selectedTech, hoveredTech }: KnowledgeSphereProps) {
  const activeTech = selectedTech || hoveredTech;

  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Volumetric Warm Lighting */}
        <ambientLight intensity={0.9} color="#FCFAF6" />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FAF5ED" castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#B55D3D" />
        <spotLight position={[0, 10, 0]} intensity={1.2} color="#8A2E2B" angle={0.6} penumbra={1} />

        {/* Instanced Sphere */}
        <InstancedCubeSphere selectedTech={selectedTech} hoveredTech={hoveredTech} />

        {/* Glass Hero Cube when Tech is active */}
        {activeTech && <GlassHeroCube activeTech={activeTech} />}

        {/* Ambient dust */}
        <AmbientDust />
      </Canvas>
    </div>
  );
}
