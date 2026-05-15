import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { CHIP_CONTAINER_ID, VANTAGEUI_ATTR } from './types';

interface InspectorChipProps {
  show: boolean
}

export function InspectorChip({ show }: InspectorChipProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (show) {
      setMounted(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setClosing(false));
      });
      return () => cancelAnimationFrame(frame);
    }
    if (mounted) {
      setClosing(true);
      const timer = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 150);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [show]);

  const [container] = useState(() => {
    let el = document.getElementById(CHIP_CONTAINER_ID);
    if (!el) {
      el = document.createElement('div');
      el.id = CHIP_CONTAINER_ID;
      el.setAttribute(VANTAGEUI_ATTR, '');
      document.body.appendChild(el);
    }
    return el;
  });

  if (!mounted) return null;

  const chip = (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: '#053B84',
        color: '#FFFFFF',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '12px',
        padding: '6px 12px',
        borderRadius: '20px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
        zIndex: 2147483647,
        animation: closing
          ? 'fadeOut 150ms ease-out forwards'
          : 'fadeUp 150ms ease-out forwards',
        pointerEvents: 'auto',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      &#x2B21; VantageUI Active &mdash; Press Esc to exit
    </div>
  );

  return createPortal(chip, container);
}
