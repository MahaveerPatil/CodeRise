import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '../../hooks/useKonamiCode';

const BOOT_LINES = [
  'Initializing CodeRise OS v2.0.25...',
  'Loading premium modules... ████████████ 100%',
  'Connecting to the future...',
  'Calibrating pixel-perfect rendering engine...',
  'Injecting ambition.exe...',
  'Compiling digital dreams...',
  '> All systems nominal.',
  '> Welcome, developer. 👾',
  '',
  'You found the Easter egg! 🥚',
  "We're hiring. hello@coderise.dev",
];

export function EasterEgg() {
  const activated = useKonamiCode();
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (!activated) return;
    setVisible(true);
    setLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 180);
    const autoClose = setTimeout(() => setVisible(false), 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(autoClose);
    };
  }, [activated]);

  const dismiss = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9500] bg-black/95 font-mono text-green-400 flex flex-col items-center justify-center p-8 cursor-pointer"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-label="Easter egg terminal — click or press Escape to close"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Escape') dismiss(); }}
        >
          <pre className="text-green-300/60 text-xs mb-8 text-center leading-tight select-none" aria-hidden="true">
{` __   __ _____  _    _____  ____  ___ _  __
 \\ \\ / /| ____|| |  |_   _||  _ \\|_ _| |/ /
  \\ V / |  _|  | |    | |  | |_) || | | ' /
   \\_/  |_____ |____|  |_|  |____/|___|_|\\_\\`}
          </pre>

          <div className="w-full max-w-lg space-y-1.5">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className="text-sm leading-relaxed"
              >
                {line || '\u00A0'}
              </motion.p>
            ))}
          </div>

          <p className="mt-10 text-xs text-green-700 animate-pulse">
            Click anywhere or press Escape to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
