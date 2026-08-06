'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroSculpture } from './HeroSculpture';
import { ParticleField } from './ParticleField';
import { useMousePosition } from '@/hooks/useMousePosition';

interface SceneCanvasProps {
  section?: 'hero' | 'about' | 'skills' | 'contact';
  className?: string;
}

export function SceneCanvas({ section = 'hero', className = '' }: SceneCanvasProps) {
  const mouse = useMousePosition();

  return (
    <div className={`relative w-full h-full pointer-events-auto ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#FAF8F3" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#B85C3B" />

        <Suspense fallback={null}>
          {section === 'hero' && (
            <>
              <HeroSculpture mouse={mouse} />
              <ParticleField count={220} mouse={mouse} />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
