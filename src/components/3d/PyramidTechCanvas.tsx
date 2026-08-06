'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { DOMAIN_FACES, DomainFace, PYRAMID_CUBE_ITEMS, PyramidCubeItem } from '@/data/pyramidTechData';

interface PyramidCanvasProps {
  activeDomain: DomainFace;
  activeCube: PyramidCubeItem | null;
  onSelectCube: (cube: PyramidCubeItem) => void;
  inView: boolean;
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 1.05;
const SPACING = 1.35;

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
      (Math.sin(seed * 4.5) - 0.5) * 16,
      14 + Math.random() * 10 + item.layer * 3.5,
      (Math.cos(seed * 4.5) - 0.5) * 16,
    ];
  }, [item]);

  const currentPos = useRef<[number, number, number]>([...skyPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const destination = isFormed ? targetPos : skyPos;
    const speed = 0.055 + item.layer * 0.012;

    currentPos.current[0] = THREE.MathUtils.lerp(currentPos.current[0], destination[0], speed);
    currentPos.current[1] = THREE.MathUtils.lerp(currentPos.current[1], destination[1], speed);
    currentPos.current[2] = THREE.MathUtils.lerp(currentPos.current[2], destination[2], speed);

    meshRef.current.position.set(...currentPos.current);

    // Hover & Selection scale pulse
    const targetScale = isSelected ? 1.18 : hovered ? 1.1 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);
  });

  // Warm luxury color palette logic
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

// ── 4-DOMAIN PYRAMID SCENE ──────────────────────────────────────────────────
function PyramidScene({ activeDomain, activeCube, onSelectCube, inView, playHover, playClick }: PyramidCanvasProps) {
  const pyramidGroupRef = useRef<THREE.Group>(null);
  const targetRotationY = useRef(0);
  const mouseLerp = useRef({ x: 0, y: 0 });

  // 3D grid target coordinates for all 30 cubes across 4 stacked layers
  const cubeTargets = useMemo(() => {
    const map = new Map<string, [number, number, number]>();

    // Layer 1 (Base - 16 cubes: 4x4) -> Y = -2.025
    const layer1 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 1);
    layer1.forEach((item, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      map.set(item.id, [(col - 1.5) * SPACING, -2.025, (row - 1.5) * SPACING]);
    });

    // Layer 2 (Frontend/APIs - 9 cubes: 3x3) -> Y = -0.675
    const layer2 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 2);
    layer2.forEach((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      map.set(item.id, [(col - 1.0) * SPACING, -0.675, (row - 1.0) * SPACING]);
    });

    // Layer 3 (3D & Motion - 4 cubes: 2x2) -> Y = 0.675
    const layer3 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 3);
    layer3.forEach((item, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      map.set(item.id, [(col - 0.5) * SPACING, 0.675, (row - 0.5) * SPACING]);
    });

    // Layer 4 (Apex - 1 cube: 1x1) -> Y = 2.025
    const layer4 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 4);
    layer4.forEach((item) => {
      map.set(item.id, [0, 2.025, 0]);
    });

    return map;
  }, []);

  useEffect(() => {
    targetRotationY.current = activeDomain.angle;
  }, [activeDomain]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseLerp.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseLerp.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!pyramidGroupRef.current) return;

    // Smoothly lerp to target domain face rotation angle
    const curY = pyramidGroupRef.current.rotation.y;
    const destY = targetRotationY.current;
    pyramidGroupRef.current.rotation.y = THREE.MathUtils.lerp(curY, destY, delta * 2.8);

    // Subtle mouse tilt for depth
    pyramidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      pyramidGroupRef.current.rotation.x,
      mouseLerp.current.y * 0.2,
      0.05
    );
    pyramidGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      pyramidGroupRef.current.rotation.z,
      -mouseLerp.current.x * 0.2,
      0.05
    );
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

// ── MAIN UNCONSTRAINED CANVAS EXPORT ────────────────────────────────────────
export function PyramidTechCanvas({
  activeDomain,
  activeCube,
  onSelectCube,
  inView,
  playHover,
  playClick,
}: PyramidCanvasProps) {
  return (
    <div className="w-full h-full min-h-[520px] md:min-h-[620px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.5, 9.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Volumetric Lighting */}
        <ambientLight intensity={1.1} color="#FAF8F3" />
        <directionalLight position={[7, 12, 7]} intensity={1.6} color="#FAF5ED" castShadow />
        <pointLight position={[-7, -5, -7]} intensity={0.9} color="#B85C3B" />
        <spotLight position={[0, 14, 0]} intensity={1.4} color="#8E9A78" angle={0.7} penumbra={1} />

        {/* 3D 4-Domain Pyramid Scene */}
        <PyramidScene
          activeDomain={activeDomain}
          activeCube={activeCube}
          onSelectCube={onSelectCube}
          inView={inView}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Soft Contact Shadow Plane Ground */}
        <ContactShadows position={[0, -3.2, 0]} opacity={0.4} scale={14} blur={2.5} far={6} color="#25231F" />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
}
