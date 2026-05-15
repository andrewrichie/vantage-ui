import type { SelectedElementData } from '~schemas/inspector.schema';

import { ARIA_ATTRIBUTES, VANTAGEUI_ATTR } from './types';

export function getAriaAttributes(element: Element): Record<string, string> {
  const attrs: Record<string, string> = {};
  ARIA_ATTRIBUTES.forEach((attr) => {
    const value = element.getAttribute(attr);
    if (value !== null) {
      attrs[attr] = value;
    }
  });
  return attrs;
}

export function getSelectedElementData(element: Element): SelectedElementData {
  const rect = element.getBoundingClientRect();
  const rawClassName = element.className || '';
  const className = typeof rawClassName === 'string'
    ? rawClassName.split(/\s+/).slice(0, 3).join(' ') || null
    : null;
  const innerHTML = element.innerHTML.slice(0, 500);

  return {
    tagName: element.tagName.toLowerCase(),
    id: element.id || null,
    className,
    boundingRect: {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    },
    ariaAttributes: getAriaAttributes(element),
    innerHTML,
  };
}

export function isValidTarget(el: Element | null): el is Element {
  if (!el) return false;
  if (el.getAttribute(VANTAGEUI_ATTR) !== null) return false;
  if (el.closest(`[${VANTAGEUI_ATTR}]`)) return false;
  if (el.id === 'vantageui-root') return false;
  if (el.tagName === 'HTML' || el.tagName === 'BODY') return false;
  return true;
}
