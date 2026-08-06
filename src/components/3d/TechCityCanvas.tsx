'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { TECH_CITY_BUILDINGS, CityBuilding, CityBuildingTech } from '@/data/techCityData';

interface TechCityCanvasProps {
  activeBuildingId: string | null;
  onHoverBuilding: (building: CityBuilding | null) => void;
  onSelectBuilding: (building: CityBuilding) => void;
  inView: boolean;
  mousePos: { x: number; y: number };
  playHover: () => void;
  playClick: () => void;
}

const CUBE_SIZE = 0.45;
const SPACING = 0.52;

interface CubeParticle {
  id: string;
  targetPos: [number, number, number];
  skyPos: [number, number, number];
  isWindow: boolean;
  buildingId: string;
}

// ── 3D BUILDING TOWER COMPOSED OF INSTANCED CUBE PARTICLES ──────────────────
function InstancedCityBuilding({
  building,
  activeBuildingId,
  onHoverBuilding,
  onSelectBuilding,
  inView,
  playHover,
  playClick,
}: {
  building: CityBuilding;
  activeBuildingId: string | null;
  onHoverBuilding: (building: CityBuilding | null) => void;
  onSelectBuilding: (building: CityBuilding) => void;
  inView: boolean;
  playHover: () => void;
  playClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const isSelected = activeBuildingId === building.id;
  const isTargeted = isSelected || hovered;

  // Generate cube grid structure for this building tower
  const cubes = useMemo<CubeParticle[]>(() => {
    const list: CubeParticle[] = [];
    const [w, h, d] = building.dimensions;
    const [bX, bZ] = building.position;

    const cols = Math.round(w / CUBE_SIZE);
    const rows = Math.round(h / CUBE_SIZE);
    const layers = Math.round(d / CUBE_SIZE);

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        for (let l = 0; l < layers; l++) {
          const x = bX + (c - cols / 2 + 0.5) * SPACING;
          const y = r * SPACING + CUBE_SIZE / 2;
          const z = bZ + (l - layers / 2 + 0.5) * SPACING;

          const isEdge = c === 0 || c === cols - 1 || l === 0 || l === layers - 1;
          const isWindow = isEdge && r % 2 === 1 && Math.sin(c + r + l) > 0;

          const seed = count * 11 + building.id.length * 7;
          const skyX = x + (Math.sin(seed) - 0.5) * 16;
          const skyY = 18 + (r + 1) * 3 + Math.random() * 8;
          const skyZ = z + (Math.cos(seed) - 0.5) * 16;

          list.push({
            id: `${building.id}-${r}-${c}-${l}`,
            targetPos: [x, y, z],
            skyPos: [skyX, skyY, skyZ],
            isWindow,
            buildingId: building.id,
          });
          count++;
        }
      }
    }
    return list;
  }, [building]);

  const currentPositions = useRef<[number, number, number][]>(
    cubes.map((c) => [...c.skyPos])
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smoothly lerp cube positions from scattered sky to constructed building
    cubes.forEach((cube, i) => {
      const destination = inView ? cube.targetPos : cube.skyPos;
      const lerpSpeed = 0.05 + (i % 5) * 0.008;

      currentPositions.current[i][0] = THREE.MathUtils.lerp(currentPositions.current[i][0], destination[0], lerpSpeed);
      currentPositions.current[i][1] = THREE.MathUtils.lerp(currentPositions.current[i][1], destination[1], lerpSpeed);
      currentPositions.current[i][2] = THREE.MathUtils.lerp(currentPositions.current[i][2], destination[2], lerpSpeed);
    });

    // Hover scale pulse
    const targetScale = isTargeted ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHoverBuilding(building);
        playHover();
      }}
      onPointerOut={() => {
        setHovered(false);
        onHoverBuilding(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelectBuilding(building);
        playClick();
      }}
    >
      {/* Individual procedurally animated cubes */}
      {cubes.map((cube, i) => {
        const baseColor = isTargeted
          ? '#B85C3B'
          : cube.isWindow
          ? building.accentColor
          : '#23201C';

        return (
          <mesh key={cube.id} position={currentPositions.current[i]} castShadow receiveShadow>
            <boxGeometry args={[CUBE_SIZE, CUBE_SIZE, CUBE_SIZE]} />
            <meshStandardMaterial
              color={baseColor}
              roughness={cube.isWindow || isTargeted ? 0.15 : 0.35}
              metalness={cube.isWindow || isTargeted ? 0.6 : 0.25}
              envMapIntensity={1.4}
            />
          </mesh>
        );
      })}

      {/* Floating Holographic Technology Chips around building when hovered/selected */}
      {isTargeted && inView && (
        <group position={[building.position[0], building.dimensions[1] * SPACING + 0.8, building.position[1]]}>
          {building.technologies.map((tech, idx) => {
            const angle = (idx / building.technologies.length) * Math.PI * 2;
            const radius = 1.4;
            const chipX = Math.cos(angle) * radius;
            const chipZ = Math.sin(angle) * radius;
            const chipY = (idx % 2) * 0.4;

            return (
              <Float key={tech.id} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <Html center position={[chipX, chipY, chipZ]} distanceFactor={8}>
                  <div className="px-3 py-1.5 rounded-full bg-[#FCFAF6]/95 backdrop-blur-md border border-[#B85C3B] shadow-lg flex items-center gap-1.5 text-xs font-mono text-[#23201C] whitespace-nowrap select-none animate-pulse">
                    <span className="text-sm">{tech.symbol}</span>
                    <span className="font-bold">{tech.name}</span>
                  </div>
                </Html>
              </Float>
            );
          })}
        </group>
      )}
    </group>
  );
}

// ── FLOATING AMBIENT CUBE DUST ──────────────────────────────────────────────
function AmbientDust() {
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      pos: [
        (Math.random() - 0.5) * 16,
        Math.random() * 8 + 0.5,
        (Math.random() - 0.5) * 16,
      ] as [number, number, number],
      scale: 0.08 + Math.random() * 0.1,
    }));
  }, []);

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
          <mesh position={p.pos}>
            <boxGeometry args={[p.scale, p.scale, p.scale]} />
            <meshStandardMaterial color="#B85C3B" transparent opacity={0.4} roughness={0.2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── SCENE CONTAINER WITH MOUSE PARALLAX ─────────────────────────────────────
function CityScene({
  activeBuildingId,
  onHoverBuilding,
  onSelectBuilding,
  inView,
  mousePos,
  playHover,
  playClick,
}: TechCityCanvasProps) {
  const sceneGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!sceneGroupRef.current) return;

    // Smooth mouse parallax lerp
    const targetRotY = mousePos.x * 0.15;
    const targetRotX = mousePos.y * 0.1;

    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.y, targetRotY, delta * 3);
    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(sceneGroupRef.current.rotation.x, targetRotX, delta * 3);
  });

  return (
    <group ref={sceneGroupRef} position={[0, -1.2, 0]}>
      {/* 6 Architectural Towers */}
      {TECH_CITY_BUILDINGS.map((building) => (
        <InstancedCityBuilding
          key={building.id}
          building={building}
          activeBuildingId={activeBuildingId}
          onHoverBuilding={onHoverBuilding}
          onSelectBuilding={onSelectBuilding}
          inView={inView}
          playHover={playHover}
          playClick={playClick}
        />
      ))}

      {/* Ambient Cube Dust Particles */}
      <AmbientDust />
    </group>
  );
}

// ── MAIN CANVAS EXPORT ──────────────────────────────────────────────────────
export function TechCityCanvas({
  activeBuildingId,
  onHoverBuilding,
  onSelectBuilding,
  inView,
  mousePos,
  playHover,
  playClick,
}: TechCityCanvasProps) {
  return (
    <div className="w-full h-full min-h-[460px] md:min-h-[540px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 6.5, 12.5], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Volumetric Warm Lighting */}
        <ambientLight intensity={1.2} color="#F7F3EC" />
        <directionalLight position={[8, 14, 8]} intensity={1.8} color="#FCFAF6" castShadow />
        <pointLight position={[-8, -4, -8]} intensity={0.8} color="#B85C3B" />
        <spotLight position={[0, 16, 0]} intensity={1.4} color="#8A2E2B" angle={0.6} penumbra={1} />

        {/* 3D Tech City Scene */}
        <CityScene
          activeBuildingId={activeBuildingId}
          onHoverBuilding={onHoverBuilding}
          onSelectBuilding={onSelectBuilding}
          inView={inView}
          mousePos={mousePos}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Contact Shadow Plane */}
        <ContactShadows position={[0, -1.2, 0]} opacity={0.35} scale={18} blur={2.5} far={6} color="#23201C" />
      </Canvas>
    </div>
  );
}
