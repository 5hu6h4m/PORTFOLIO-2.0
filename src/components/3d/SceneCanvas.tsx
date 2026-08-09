'use client';

import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useInView } from 'framer-motion';
import { HeroSculpture } from './HeroSculpture';
import { ParticleField } from './ParticleField';

interface SceneCanvasProps {
  section?: 'hero' | 'about' | 'skills' | 'contact';
  className?: string;
}

export function SceneCanvas({ section = 'hero', className = '' }: SceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.05 });

  return (
    <div ref={containerRef} className={`relative w-full h-full pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={isInView ? 'always' : 'demand'}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FAF8F3" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#B85C3B" />

        <Suspense fallback={null}>
          {section === 'hero' && (
            <>
              <HeroSculpture />
              <ParticleField count={220} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
