import vantageUiConfig from '@vantage-ui/ui/tailwind.config';

export default {
  ...vantageUiConfig,
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
};
