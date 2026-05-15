import { getAriaAttributes } from './dom-utils';
import { VANTAGEUI_ATTR } from './types';

interface GhostHighlightProps {
  element: Element | null
  isSelected: boolean
  navHint: string | null
}

export function GhostHighlight({
  element,
  isSelected,
  navHint,
}: GhostHighlightProps) {
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const ariaAttrs = getAriaAttributes(element);
  const ariaEntries = Object.entries(ariaAttrs).slice(0, 3);
  const hasOverflow = Object.keys(ariaAttrs).length > 3;

  return (
    <div
      data-vantageui-element="overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2147483646,
      }}
    >
      <div
        {...{ [VANTAGEUI_ATTR]: '' }}
        style={{
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: '2px solid #053B84',
          background: 'rgba(5,59,132,0.08)',
          borderRadius: '4px',
          pointerEvents: 'none',
          transition: 'all 80ms ease-out',
          zIndex: 2147483646,
        }}
      >
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: '#053B84',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '10px',
              color: '#FFFFFF',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            {navHint || '\u2713 Component Selected'}
          </div>
        )}
      </div>

      {ariaEntries.length > 0 && !isSelected && (
        <div
          style={{
            position: 'fixed',
            top: Math.max(rect.top - 28, 4),
            left: rect.left,
            display: 'flex',
            gap: '4px',
            zIndex: 2147483646,
            pointerEvents: 'none',
            flexWrap: 'wrap',
            maxWidth: Math.max(rect.width, 60),
          }}
        >
          {ariaEntries.map(([key, value]) => (
            <span
              key={key}
              style={{
                background: 'rgba(10,10,10,0.85)',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                padding: '3px 7px',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                lineHeight: '14px',
              }}
            >
              {key}
              :
              {value}
            </span>
          ))}
          {hasOverflow && (
            <span
              style={{
                background: 'rgba(10,10,10,0.85)',
                color: '#FFFFFF',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                padding: '3px 7px',
                borderRadius: '4px',
                lineHeight: '14px',
              }}
            >
              +
              {Object.keys(ariaAttrs).length - 3}
            </span>
          )}
        </div>
      )}

      {isSelected && (
        <div
          style={{
            position: 'fixed',
            top: Math.max(rect.top - 28, 4),
            left: rect.left,
            zIndex: 2147483646,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              background: '#053B84',
              color: '#FFFFFF',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              padding: '3px 7px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              lineHeight: '14px',
            }}
          >
            {'\u2713'}
            {' '}
            Component Selected
          </span>
        </div>
      )}
    </div>
  );
}
