'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PYRAMID_CUBE_ITEMS, PyramidCubeItem } from '@/data/pyramidTechData';

interface PyramidCanvasProps {
  rotationRad: number;
  activeCube: PyramidCubeItem | null;
  onSelectCube: (cube: PyramidCubeItem) => void;
  inView: boolean;
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 0.95;
const SPACING = 1.25;

interface TumblingCubeProps {
  item: PyramidCubeItem;
  targetPos: [number, number, number];
  isFormed: boolean;
  isSelected: boolean;
  onSelect: (item: PyramidCubeItem) => void;
  playHover: () => void;
  playClick: () => void;
}

function TumblingPyramidCube({
  item,
  targetPos,
  isFormed,
  isSelected,
  onSelect,
  playHover,
  playClick,
}: TumblingCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // High sky position & initial random tumble spin angles from Hero section
  const { skyPos, initialSpin, spinSpeed } = useMemo(() => {
    const seed = item.id.length * 13 + item.layer * 7;
    return {
      skyPos: [
        (Math.sin(seed * 4.5) - 0.5) * 18,
        22 + Math.random() * 12 + item.layer * 4, // High sky coming down from Hero above
        (Math.cos(seed * 4.5) - 0.5) * 18,
      ] as [number, number, number],
      initialSpin: [
        Math.sin(seed) * Math.PI * 4,
        Math.cos(seed) * Math.PI * 4,
        Math.sin(seed * 2) * Math.PI * 4,
      ] as [number, number, number],
      spinSpeed: 1.5 + Math.random() * 2.0,
    };
  }, [item]);

  const currentPos = useRef<[number, number, number]>([...skyPos]);
  const currentSpin = useRef<[number, number, number]>([...initialSpin]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const destination = isFormed ? targetPos : skyPos;
    const lerpSpeed = 0.05 + item.layer * 0.012;

    // Position lerp
    currentPos.current[0] = THREE.MathUtils.lerp(currentPos.current[0], destination[0], lerpSpeed);
    currentPos.current[1] = THREE.MathUtils.lerp(currentPos.current[1], destination[1], lerpSpeed);
    currentPos.current[2] = THREE.MathUtils.lerp(currentPos.current[2], destination[2], lerpSpeed);

    meshRef.current.position.set(...currentPos.current);

    // Tumbling spin lerp (spins down from sky, aligns flat to 0 when assembled)
    const targetSpinX = isFormed ? 0 : currentSpin.current[0] + delta * spinSpeed;
    const targetSpinY = isFormed ? 0 : currentSpin.current[1] + delta * spinSpeed;
    const targetSpinZ = isFormed ? 0 : currentSpin.current[2] + delta * spinSpeed;

    currentSpin.current[0] = THREE.MathUtils.lerp(currentSpin.current[0], targetSpinX, isFormed ? 0.08 : 0.02);
    currentSpin.current[1] = THREE.MathUtils.lerp(currentSpin.current[1], targetSpinY, isFormed ? 0.08 : 0.02);
    currentSpin.current[2] = THREE.MathUtils.lerp(currentSpin.current[2], targetSpinZ, isFormed ? 0.08 : 0.02);

    meshRef.current.rotation.set(...currentSpin.current);

    // Hover & Selection scale pulse
    const targetScale = isSelected ? 1.18 : hovered ? 1.1 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);
  });

  // Multi-tier luxury materials per layer
  const isApex = item.layer === 4;
  const isLayer3 = item.layer === 3;
  const isLayer2 = item.layer === 2;

  const baseColor = isApex
    ? '#B85C3B' // Warm terracotta core
    : isLayer3
    ? '#4A6FA5' // Deep sapphire slate blue
    : isSelected || hovered
    ? '#B85C3B'
    : isLayer2
    ? '#FAF8F3' // Warm cream glass
    : '#25231F'; // Dark metallic charcoal base

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        playHover();
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        playClick();
        onSelect(item);
      }}
    >
      {/* 3D Cube Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={isSelected || hovered ? 0.12 : isApex ? 0.2 : isLayer2 ? 0.4 : 0.2}
          metalness={isSelected || hovered ? 0.6 : isApex ? 0.3 : isLayer2 ? 0.1 : 0.5}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Terracotta wireframe highlight on hover/select */}
      {(isSelected || hovered) && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(CUBE_SIZE * 1.03, CUBE_SIZE * 1.03, CUBE_SIZE * 1.03)]} />
          <lineBasicMaterial color="#B85C3B" linewidth={2.5} />
        </lineSegments>
      )}
    </group>
  );
}

// ── STRICT CONTROLLED PYRAMID SCENE ──────────────────────────────────────────
function StrictPyramidScene({ rotationRad, activeCube, onSelectCube, inView, playHover, playClick }: PyramidCanvasProps) {
  const pyramidGroupRef = useRef<THREE.Group>(null);

  // 3D grid target coordinates for all 30 cubes across 4 stacked layers
  const cubeTargets = useMemo(() => {
    const map = new Map<string, [number, number, number]>();

    // Layer 1 (Base - 16 cubes: 4x4) -> Y = -1.875
    const layer1 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 1);
    layer1.forEach((item, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      map.set(item.id, [(col - 1.5) * SPACING, -1.875, (row - 1.5) * SPACING]);
    });

    // Layer 2 (Frontend/APIs - 9 cubes: 3x3) -> Y = -0.625
    const layer2 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 2);
    layer2.forEach((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      map.set(item.id, [(col - 1.0) * SPACING, -0.625, (row - 1.0) * SPACING]);
    });

    // Layer 3 (3D & Motion - 4 cubes: 2x2) -> Y = 0.625
    const layer3 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 3);
    layer3.forEach((item, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      map.set(item.id, [(col - 0.5) * SPACING, 0.625, (row - 0.5) * SPACING]);
    });

    // Layer 4 (Apex - 1 cube: 1x1) -> Y = 1.875
    const layer4 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 4);
    layer4.forEach((item) => {
      map.set(item.id, [0, 1.875, 0]);
    });

    return map;
  }, []);

  useFrame((_, delta) => {
    if (!pyramidGroupRef.current) return;

    const curY = pyramidGroupRef.current.rotation.y;
    pyramidGroupRef.current.rotation.y = THREE.MathUtils.lerp(curY, rotationRad, delta * 6);

    pyramidGroupRef.current.rotation.x = 0.24;
    pyramidGroupRef.current.rotation.z = 0;
  });

  return (
    <group ref={pyramidGroupRef} position={[0, 0, 0]}>
      {PYRAMID_CUBE_ITEMS.map((item) => {
        const targetPos = cubeTargets.get(item.id) || [0, 0, 0];
        const isSelected = activeCube?.id === item.id;

        return (
          <TumblingPyramidCube
            key={item.id}
            item={item}
            targetPos={targetPos}
            isFormed={inView}
            isSelected={isSelected}
            onSelect={onSelectCube}
            playHover={playHover}
            playClick={playClick}
          />
        );
      })}
    </group>
  );
}

// ── MAIN CANVAS EXPORT ──────────────────────────────────────────────────────
export function PyramidTechCanvas({
  rotationRad,
  activeCube,
  onSelectCube,
  inView,
  playHover,
  playClick,
}: PyramidCanvasProps) {
  return (
    <div className="w-full h-full min-h-[360px] md:min-h-[420px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.6, 10.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Volumetric Warm Lighting */}
        <ambientLight intensity={1.1} color="#FAF8F3" />
        <directionalLight position={[7, 12, 7]} intensity={1.6} color="#FAF5ED" castShadow />
        <pointLight position={[-7, -4, -7]} intensity={0.9} color="#B85C3B" />
        <spotLight position={[0, 14, 0]} intensity={1.4} color="#8E9A78" angle={0.7} penumbra={1} />

        {/* 3D Pyramid Locked Scene */}
        <StrictPyramidScene
          rotationRad={rotationRad}
          activeCube={activeCube}
          onSelectCube={onSelectCube}
          inView={inView}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Contact Shadow Plane */}
        <ContactShadows position={[0, -2.9, 0]} opacity={0.35} scale={13} blur={2.3} far={5.5} color="#25231F" />
      </Canvas>
    </div>
  );
}
