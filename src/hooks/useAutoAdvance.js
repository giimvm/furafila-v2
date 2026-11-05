import { useEffect, useRef } from 'react';

// Chama onTick a cada intervalo enquanto "enabled" for verdadeiro (simulação da cantina).
export function useAutoAdvance({ enabled, onTick, intervalMs = 3000 }) {
  const latestTick = useRef(onTick);
  useEffect(() => {
    latestTick.current = onTick;
  });

  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(() => latestTick.current(), intervalMs);
    return () => clearInterval(id);
  }, [enabled, intervalMs]);
}
