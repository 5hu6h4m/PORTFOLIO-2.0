'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ContactOrbProps {
  isSubmitting?: boolean;
}

export function ContactOrb({ isSubmitting }: ContactOrbProps) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * (isSubmitting ? 2.5 : 0.6);
      coreRef.current.rotation.x += delta * 0.4;
      const pulse = Math.sin(state.clock.elapsedTime * (isSubmitting ? 8 : 2)) * 0.1;
      coreRef.current.scale.setScalar(1.2 + pulse);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * (isSubmitting ? 3.0 : 0.8);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color={isSubmitting ? '#B56528' : '#C87D46'}
          emissive={isSubmitting ? '#D49563' : '#8C4616'}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transmission={0.4}
          thickness={0.5}
        />
      </mesh>
      <mesh ref={ringRef} scale={1.8}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial color="#E8E2D5" roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
}
