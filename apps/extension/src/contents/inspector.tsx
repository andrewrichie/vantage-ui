import type {
  PlasmoCSConfig,
  PlasmoGetShadowHostId,
  PlasmoGetStyle,
} from 'plasmo';

import { InspectorOverlay } from '../components/inspector/inspector-overlay';

export const config: PlasmoCSConfig = {
  matches: ['<all_urls>'],
};

export const getShadowHostId: PlasmoGetShadowHostId = () => 'vantageui-root';

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    * { box-sizing: border-box; }

    @keyframes fadeUp {
      0% { opacity: 0; transform: translateY(6px); }
      100% { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    @keyframes fadeOut {
      0% { opacity: 1; }
      100% { opacity: 0; transform: translateY(-6px); }
    }
  `;
  return style;
};

export default function Inspector() {
  return <InspectorOverlay />;
}
