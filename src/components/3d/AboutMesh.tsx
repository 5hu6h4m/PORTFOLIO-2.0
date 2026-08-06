'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MorphNoiseShader } from '@/data/shaderCode';

interface AboutMeshProps {
  mouse: { normalizedX: number; normalizedY: number };
}

export function AboutMesh({ mouse }: AboutMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#F3EEE6') },
    uColorB: { value: new THREE.Color('#C87D46') },
  });

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = mouse.normalizedY * 0.4;
      meshRef.current.rotation.z = mouse.normalizedX * 0.4;
    }
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.6}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={shaderRef}
        vertexShader={MorphNoiseShader.vertexShader}
        fragmentShader={MorphNoiseShader.fragmentShader}
        uniforms={uniforms.current}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
