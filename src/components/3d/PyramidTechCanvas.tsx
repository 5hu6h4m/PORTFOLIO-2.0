'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { PYRAMID_CUBE_ITEMS, PyramidCubeItem } from '@/data/pyramidTechData';

interface PyramidCanvasProps {
  rotationRad: number; // Strictly controlled rotation angle in radians (0 to 2*Math.PI)
  activeCube: PyramidCubeItem | null;
  onSelectCube: (cube: PyramidCubeItem) => void;
  inView: boolean;
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 0.9;
const SPACING = 1.15;

interface CleanCubeProps {
  item: PyramidCubeItem;
  targetPos: [number, number, number];
  isFormed: boolean;
  isSelected: boolean;
  onSelect: (item: PyramidCubeItem) => void;
  playHover: () => void;
  playClick: () => void;
}

function CleanPyramidCube({
  item,
  targetPos,
  isFormed,
  isSelected,
  onSelect,
  playHover,
  playClick,
}: CleanCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Scattered sky position for fly-in assembly physics
  const skyPos = useMemo<[number, number, number]>(() => {
    const seed = item.id.length + item.layer * 9;
    return [
      (Math.sin(seed * 4.5) - 0.5) * 14,
      12 + Math.random() * 8 + item.layer * 3,
      (Math.cos(seed * 4.5) - 0.5) * 14,
    ];
  }, [item]);

  const currentPos = useRef<[number, number, number]>([...skyPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const destination = isFormed ? targetPos : skyPos;
    const speed = 0.06 + item.layer * 0.012;

    currentPos.current[0] = THREE.MathUtils.lerp(currentPos.current[0], destination[0], speed);
    currentPos.current[1] = THREE.MathUtils.lerp(currentPos.current[1], destination[1], speed);
    currentPos.current[2] = THREE.MathUtils.lerp(currentPos.current[2], destination[2], speed);

    meshRef.current.position.set(...currentPos.current);

    // Hover & Selection scale pulse
    const targetScale = isSelected ? 1.16 : hovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);
  });

  const isApex = item.layer === 4;
  const is3D = item.layer === 3;
  const baseColor = isApex
    ? '#B85C3B'
    : is3D
    ? '#4A6FA5'
    : isSelected || hovered
    ? '#B85C3B'
    : '#FAF8F3';

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
          roughness={isSelected || hovered ? 0.12 : 0.3}
          metalness={isSelected || hovered ? 0.55 : 0.15}
          envMapIntensity={1.4}
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

    // Layer 1 (Base - 16 cubes: 4x4) -> Y = -1.725
    const layer1 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 1);
    layer1.forEach((item, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      map.set(item.id, [(col - 1.5) * SPACING, -1.725, (row - 1.5) * SPACING]);
    });

    // Layer 2 (Frontend/APIs - 9 cubes: 3x3) -> Y = -0.575
    const layer2 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 2);
    layer2.forEach((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      map.set(item.id, [(col - 1.0) * SPACING, -0.575, (row - 1.0) * SPACING]);
    });

    // Layer 3 (3D & Motion - 4 cubes: 2x2) -> Y = 0.575
    const layer3 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 3);
    layer3.forEach((item, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      map.set(item.id, [(col - 0.5) * SPACING, 0.575, (row - 0.5) * SPACING]);
    });

    // Layer 4 (Apex - 1 cube: 1x1) -> Y = 1.725
    const layer4 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 4);
    layer4.forEach((item) => {
      map.set(item.id, [0, 1.725, 0]);
    });

    return map;
  }, []);

  useFrame((_, delta) => {
    if (!pyramidGroupRef.current) return;

    const curY = pyramidGroupRef.current.rotation.y;
    pyramidGroupRef.current.rotation.y = THREE.MathUtils.lerp(curY, rotationRad, delta * 6);

    pyramidGroupRef.current.rotation.x = 0.22;
    pyramidGroupRef.current.rotation.z = 0;
  });

  return (
    <group ref={pyramidGroupRef} position={[0, 0, 0]}>
      {PYRAMID_CUBE_ITEMS.map((item) => {
        const targetPos = cubeTargets.get(item.id) || [0, 0, 0];
        const isSelected = activeCube?.id === item.id;

        return (
          <CleanPyramidCube
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
    <div className="w-full h-full min-h-[340px] md:min-h-[380px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.2, 8.4], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Volumetric Warm Lighting */}
        <ambientLight intensity={1.1} color="#FAF8F3" />
        <directionalLight position={[6, 10, 6]} intensity={1.6} color="#FAF5ED" castShadow />
        <pointLight position={[-6, -4, -6]} intensity={0.9} color="#B85C3B" />
        <spotLight position={[0, 12, 0]} intensity={1.3} color="#8E9A78" angle={0.7} penumbra={1} />

        {/* 3D Pyramid Scene */}
        <StrictPyramidScene
          rotationRad={rotationRad}
          activeCube={activeCube}
          onSelectCube={onSelectCube}
          inView={inView}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Contact Shadow Plane */}
        <ContactShadows position={[0, -2.8, 0]} opacity={0.35} scale={12} blur={2.2} far={5} color="#25231F" />
      </Canvas>
    </div>
  );
}

