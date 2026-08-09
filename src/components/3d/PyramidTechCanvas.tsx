'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PYRAMID_CUBE_ITEMS, PyramidCubeItem } from '@/data/pyramidTechData';

interface PyramidCanvasProps {
  rotationRad: number; // Y-axis rotation angle in radians (0 to 2*Math.PI)
  tiltRad: number;     // X-axis tilt angle in radians (-0.2 to 0.6)
  activeCube: PyramidCubeItem | null;
  onSelectCube: (cube: PyramidCubeItem) => void;
  inView: boolean;
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 0.8;
const SPACING = 1.05;

interface CleanCubeProps {
  item: PyramidCubeItem;
  targetPos: [number, number, number];
  isFormed: boolean;
  isSelected: boolean;
  onSelect: (item: PyramidCubeItem) => void;
  playHover: () => void;
  playClick: () => void;
}

function RefinedPyramidCube({
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

  // Scattered sky position coming down from Hero section
  const { skyPos, spinSpeed } = useMemo(() => {
    const seed = item.id.length * 13 + item.layer * 7;
    return {
      skyPos: [
        (Math.sin(seed * 4.5) - 0.5) * 16,
        20 + Math.random() * 10 + item.layer * 3,
        (Math.cos(seed * 4.5) - 0.5) * 16,
      ] as [number, number, number],
      spinSpeed: 1.5 + Math.random() * 2.0,
    };
  }, [item]);

  const currentPos = useRef<[number, number, number]>([...skyPos]);
  const currentSpin = useRef<[number, number, number]>([Math.PI, Math.PI, Math.PI]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const destination = isFormed ? targetPos : skyPos;
    const lerpSpeed = 0.06 + item.layer * 0.012;

    // Position lerp
    currentPos.current[0] = THREE.MathUtils.lerp(currentPos.current[0], destination[0], lerpSpeed);
    currentPos.current[1] = THREE.MathUtils.lerp(currentPos.current[1], destination[1], lerpSpeed);
    currentPos.current[2] = THREE.MathUtils.lerp(currentPos.current[2], destination[2], lerpSpeed);

    meshRef.current.position.set(...currentPos.current);

    // Tumbling spin lerp (tumbles down, aligns flat to 0 when assembled)
    const targetSpinX = isFormed ? 0 : currentSpin.current[0] + delta * spinSpeed;
    const targetSpinY = isFormed ? 0 : currentSpin.current[1] + delta * spinSpeed;
    const targetSpinZ = isFormed ? 0 : currentSpin.current[2] + delta * spinSpeed;

    currentSpin.current[0] = THREE.MathUtils.lerp(currentSpin.current[0], targetSpinX, isFormed ? 0.09 : 0.02);
    currentSpin.current[1] = THREE.MathUtils.lerp(currentSpin.current[1], targetSpinY, isFormed ? 0.09 : 0.02);
    currentSpin.current[2] = THREE.MathUtils.lerp(currentSpin.current[2], targetSpinZ, isFormed ? 0.09 : 0.02);

    meshRef.current.rotation.set(...currentSpin.current);

    // Hover & Selection scale pulse
    const targetScale = isSelected ? 1.15 : hovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9);
  });

  // Single uniform luxury cube color (#25231F dark metallic charcoal) with terracotta accent on select/hover
  const baseColor = isSelected || hovered ? '#B85C3B' : '#25231F';

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
      {/* Sleek uniform 3D Cube Mesh */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={isSelected || hovered ? 0.15 : 0.25}
          metalness={isSelected || hovered ? 0.6 : 0.45}
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

      {/* Crisp Tech Emblem Symbol Badge */}
      <Html center position={[0, CUBE_SIZE * 0.51, 0]} transform distanceFactor={7}>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 pointer-events-none select-none border shadow-sm ${
            isSelected || hovered
              ? 'bg-[#B85C3B] text-[#FAF8F3] border-[#B85C3B] scale-110'
              : 'bg-[#FAF8F3]/90 text-[#25231F] border-[#E2DCD2]'
          }`}
        >
          {item.symbol}
        </div>
      </Html>
    </group>
  );
}

// ── CONTROLLED PYRAMID SCENE WITH DUAL Y-ROTATION & X-TILT ─────────────────
function StrictPyramidScene({ rotationRad, tiltRad, activeCube, onSelectCube, inView, playHover, playClick }: PyramidCanvasProps) {
  const pyramidGroupRef = useRef<THREE.Group>(null);

  // 3D grid target coordinates for all 30 cubes across 4 stacked layers
  const cubeTargets = useMemo(() => {
    const map = new Map<string, [number, number, number]>();

    // Layer 1 (Base - 16 cubes: 4x4) -> Y = -1.575
    const layer1 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 1);
    layer1.forEach((item, idx) => {
      const row = Math.floor(idx / 4);
      const col = idx % 4;
      map.set(item.id, [(col - 1.5) * SPACING, -1.575, (row - 1.5) * SPACING]);
    });

    // Layer 2 (Frontend/APIs - 9 cubes: 3x3) -> Y = -0.525
    const layer2 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 2);
    layer2.forEach((item, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;
      map.set(item.id, [(col - 1.0) * SPACING, -0.525, (row - 1.0) * SPACING]);
    });

    // Layer 3 (3D & Motion - 4 cubes: 2x2) -> Y = 0.525
    const layer3 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 3);
    layer3.forEach((item, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      map.set(item.id, [(col - 0.5) * SPACING, 0.525, (row - 0.5) * SPACING]);
    });

    // Layer 4 (Apex - 1 cube: 1x1) -> Y = 1.575
    const layer4 = PYRAMID_CUBE_ITEMS.filter((d) => d.layer === 4);
    layer4.forEach((item) => {
      map.set(item.id, [0, 1.575, 0]);
    });

    return map;
  }, []);

  useFrame((_, delta) => {
    if (!pyramidGroupRef.current) return;

    // Smoothly lerp Y rotation & X tilt angles
    const curY = pyramidGroupRef.current.rotation.y;
    const curX = pyramidGroupRef.current.rotation.x;

    pyramidGroupRef.current.rotation.y = THREE.MathUtils.lerp(curY, rotationRad, delta * 6);
    pyramidGroupRef.current.rotation.x = THREE.MathUtils.lerp(curX, tiltRad, delta * 6);
    pyramidGroupRef.current.rotation.z = 0;
  });

  return (
    <group ref={pyramidGroupRef} position={[0, 0, 0]}>
      {PYRAMID_CUBE_ITEMS.map((item) => {
        const targetPos = cubeTargets.get(item.id) || [0, 0, 0];
        const isSelected = activeCube?.id === item.id;

        return (
          <RefinedPyramidCube
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
  tiltRad,
  activeCube,
  onSelectCube,
  inView,
  playHover,
  playClick,
}: PyramidCanvasProps) {
  return (
    <div className="w-full h-full min-h-[340px] md:min-h-[380px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 2.2, 8.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        frameloop={inView ? 'always' : 'demand'}
      >
        {/* Volumetric Warm Lighting */}
        <ambientLight intensity={1.1} color="#FAF8F3" />
        <directionalLight position={[6, 10, 6]} intensity={1.6} color="#FAF5ED" castShadow />
        <pointLight position={[-6, -4, -6]} intensity={0.9} color="#B85C3B" />
        <spotLight position={[0, 12, 0]} intensity={1.3} color="#8E9A78" angle={0.7} penumbra={1} />

        {/* 3D Pyramid Scene */}
        <StrictPyramidScene
          rotationRad={rotationRad}
          tiltRad={tiltRad}
          activeCube={activeCube}
          onSelectCube={onSelectCube}
          inView={inView}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Contact Shadow Plane */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.35} scale={11} blur={2.2} far={5} color="#25231F" />
      </Canvas>
    </div>
  );
}
