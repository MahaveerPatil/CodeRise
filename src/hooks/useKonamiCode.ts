import { useState, useEffect, useRef } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
const TIMEOUT_MS = 2000;

export function useKonamiCode(): boolean {
  const [activated, setActivated] = useState(false);
  const sequenceRef = useRef<string[]>([]);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastTimeRef.current > TIMEOUT_MS) {
        sequenceRef.current = [];
      }
      lastTimeRef.current = now;
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI.length);
      if (sequenceRef.current.join(',') === KONAMI.join(',')) {
        setActivated(true);
        sequenceRef.current = [];
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return activated;
}
