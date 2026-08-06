'use client';

import { useEffect, useState } from 'react';

export type CursorMode = 'default' | 'interactive' | 'target';

export function useMousePosition() {
  const [mouseState, setMouseState] = useState<{
    x: number;
    y: number;
    normalizedX: number;
    normalizedY: number;
    cursorMode: CursorMode;
  }>({
    x: -100,
    y: -100,
    normalizedX: 0,
    normalizedY: 0,
    cursorMode: 'default',
  });

  useEffect(() => {
    let currentMode: CursorMode = 'default';

    const updateMode = (newMode: CursorMode) => {
      currentMode = newMode;
      setMouseState((prev) => ({ ...prev, cursorMode: newMode }));
    };

    const handleCustomCursorEvent = (e: Event) => {
      const customEvent = e as CustomEvent<CursorMode>;
      if (customEvent.detail) {
        updateMode(customEvent.detail);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const normX = (e.clientX / windowWidth) * 2 - 1;
      const normY = -(e.clientY / windowHeight) * 2 + 1;

      // Check if hovering HTML interactive element (buttons, links, inputs)
      const target = e.target as HTMLElement | null;
      const isHtmlInteractive = Boolean(
        target?.closest('button, a, input, textarea, [data-interactive="true"]')
      );

      // 3D Cube Target mode takes priority over HTML interactive check
      const effectiveMode: CursorMode =
        document.body.dataset.cursor === 'target'
          ? 'target'
          : isHtmlInteractive
          ? 'interactive'
          : 'default';

      setMouseState({
        x: e.clientX,
        y: e.clientY,
        normalizedX: normX,
        normalizedY: normY,
        cursorMode: effectiveMode,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursor-change', handleCustomCursorEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursor-change', handleCustomCursorEvent);
    };
  }, []);

  return mouseState;
}
