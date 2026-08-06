'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { PYRAMID_TECH_DATA, PyramidTechItem } from '@/data/pyramidTechData';

interface PyramidCanvasProps {
  activeTech: PyramidTechItem | null;
  onSelectTech: (tech: PyramidTechItem) => void;
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 1.0;
const SPACING = 1.25;

interface IndividualCubeProps {
  item: PyramidTechItem;
  targetPos: [number, number, number];
  isSelected: boolean;
  onSelect: (item: PyramidTechItem) => void;
  playHover: () => void;
  playClick: () => void;
}

function IndividualPyramidCube({
  item,
  targetPos,
  isSelected,
  onSelect,
  playHover,
  playClick,
}: IndividualCubeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Initial random sky position high above for assembly flying animation
  const skyPos = useMemo<[number, number, number]>(() => {
    const seed = item.id.length;
    return [
      (Math.sin(seed * 3) - 0.5) * 8,
      12 + Math.random() * 10 + item.layer * 3, // Fly down from high sky
      (Math.cos(seed * 3) - 0.5) * 8,
    ];
  }, [item]);

  const currentPos = useRef<[number, number, number]>([...skyPos]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Smooth lerp from sky position down to pyramid grid target position
    const speed = 0.06 + item.layer * 0.01;
    currentPos.current[0] = THREE.MathUtils.lerp(currentPos.current[0], targetPos[0], speed);
    currentPos.current[1] = THREE.MathUtils.lerp(currentPos.current[1], targetPos[1], speed);
    currentPos.current[2] = THREE.MathUtils.lerp(currentPos.current[2], targetPos[2], speed);

    meshRef.current.position.set(...currentPos.current);

    // Scale effect on hover/selection
    const targetScale = isSelected ? 1.15 : hovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  // Color logic
  const isApex = item.layer === 4;
  const is3D = item.layer === 3;
  const baseColor = isApex ? '#B85C3B' : is3D ? '#4A6FA5' : isSelected || hovered ? '#B85C3B' : '#FAF8F3';

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
          roughness={isSelected || hovered ? 0.15 : 0.3}
          metalness={isSelected || hovered ? 0.4 : 0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Warm terracotta inner wireframe outline on hover/select */}
      {(isSelected || hovered) && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(CUBE_SIZE * 1.02, CUBE_SIZE * 1.02, CUBE_SIZE * 1.02)]} />
          <lineBasicMaterial color="#B85C3B" linewidth={2} />
        </lineSegments>
      )}

      {/* HTML 3D Tech Label Badge on Cube Face */}
      <Html center position={[0, 0, CUBE_SIZE * 0.52]} transform distanceFactor={7}>
        <div
          className={`px-2 py-1 rounded-md text-[9px] font-mono tracking-wider font-bold transition-all duration-300 pointer-events-none select-none border whitespace-nowrap shadow-sm ${
            isSelected || hovered
              ? 'bg-[#B85C3B] text-[#FAF8F3] border-[#B85C3B] shadow-md scale-110'
              : isApex
              ? 'bg-[#B85C3B] text-[#FAF8F3] border-[#B85C3B]'
              : 'bg-[#25231F]/90 text-[#FAF8F3] border-[#25231F]'
          }`}
        >
          {item.shortLabel}
        </div>
      </Html>
    </group>
  );
}

// ── 4-LAYER PYRAMID SCENE ───────────────────────────────────────────────────
function PyramidScene({ activeTech, onSelectTech, playHover, playClick }: PyramidCanvasProps) {
  const pyramidGroupRef = useRef<THREE.Group>(null);
  const mouseLerp = useRef({ x: 0, y: 0 });

  // Calculate 3D target coordinates for all 30 cubes in the 4 layers
  const cubeTargets = useMemo(() => {
    const map = new Map<string, [number, number, number]>();

    // Layer 1 (Base - 16 cubes: 4x4) -> Y = -1.875
    const layer1Items = PYRAMID_TECH_DATA.filter((d) => d.layer === 1);
    const l1Y = -1.875;
    layer1Items.forEach((item, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      const x = (col - 1.5) * SPACING;
      const z = (row - 1.5) * SPACING;
      map.set(item.id, [x, l1Y, z]);
    });

    // Layer 2 (Frontend - 9 cubes: 3x3) -> Y = -0.625
    const layer2Items = PYRAMID_TECH_DATA.filter((d) => d.layer === 2);
    const l2Y = -0.625;
    layer2Items.forEach((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      const x = (col - 1.0) * SPACING;
      const z = (row - 1.0) * SPACING;
      map.set(item.id, [x, l2Y, z]);
    });

    // Layer 3 (3D & Motion - 4 cubes: 2x2) -> Y = 0.625
    const layer3Items = PYRAMID_TECH_DATA.filter((d) => d.layer === 3);
    const l3Y = 0.625;
    layer3Items.forEach((item, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const x = (col - 0.5) * SPACING;
      const z = (row - 0.5) * SPACING;
      map.set(item.id, [x, l3Y, z]);
    });

    // Layer 4 (Apex - 1 cube: 1x1) -> Y = 1.875
    const layer4Items = PYRAMID_TECH_DATA.filter((d) => d.layer === 4);
    const l4Y = 1.875;
    layer4Items.forEach((item) => {
      map.set(item.id, [0, l4Y, 0]);
    });

    return map;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseLerp.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouseLerp.current.y = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pyramidGroupRef.current) return;

    // Continuous smooth Y rotation + subtle mouse tilt
    pyramidGroupRef.current.rotation.y += delta * 0.25;
    pyramidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      pyramidGroupRef.current.rotation.x,
      mouseLerp.current.y * 0.25,
      0.05
    );
    pyramidGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      pyramidGroupRef.current.rotation.z,
      -mouseLerp.current.x * 0.25,
      0.05
    );
  });

  return (
    <group ref={pyramidGroupRef} position={[0, 0, 0]}>
      {PYRAMID_TECH_DATA.map((item) => {
        const targetPos = cubeTargets.get(item.id) || [0, 0, 0];
        const isSelected = activeTech?.id === item.id;

        return (
          <IndividualPyramidCube
            key={item.id}
            item={item}
            targetPos={targetPos}
            isSelected={isSelected}
            onSelect={onSelectTech}
            playHover={playHover}
            playClick={playClick}
          />
        );
      })}
    </group>
  );
}

// ── MAIN CANVAS COMPONENT ────────────────────────────────────────────────────
export function PyramidTechCanvas({ activeTech, onSelectTech, playHover, playClick }: PyramidCanvasProps) {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas
        camera={{ position: [0, 2, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Volumetric Warm Lighting */}
        <ambientLight intensity={0.9} color="#FAF8F3" />
        <directionalLight position={[6, 10, 6]} intensity={1.4} color="#FAF5ED" castShadow />
        <pointLight position={[-6, -4, -6]} intensity={0.8} color="#B85C3B" />
        <spotLight position={[0, 12, 0]} intensity={1.2} color="#8E9A78" angle={0.6} penumbra={1} />

        {/* 3D 4-Layer Pyramid */}
        <PyramidScene
          activeTech={activeTech}
          onSelectTech={onSelectTech}
          playHover={playHover}
          playClick={playClick}
        />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 4} />
      </Canvas>
    </div>
  );
}
