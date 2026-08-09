'use client';

import { useEffect, useState } from 'react';

export type CursorMode = 'default' | 'interactive' | 'target';

export function useMousePosition() {
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');

  useEffect(() => {
    let currentMode: CursorMode = 'default';

    const handleCustomCursorEvent = (e: Event) => {
      const customEvent = e as CustomEvent<CursorMode>;
      if (customEvent.detail && customEvent.detail !== currentMode) {
        currentMode = customEvent.detail;
        setCursorMode(customEvent.detail);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isHtmlInteractive = Boolean(
        target?.closest('button, a, input, textarea, [data-interactive="true"]')
      );

      const effectiveMode: CursorMode =
        document.body.dataset.cursor === 'target'
          ? 'target'
          : isHtmlInteractive
          ? 'interactive'
          : 'default';

      if (effectiveMode !== currentMode) {
        currentMode = effectiveMode;
        setCursorMode(effectiveMode);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('cursor-change', handleCustomCursorEvent);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursor-change', handleCustomCursorEvent);
    };
  }, []);

  return { cursorMode };
}
