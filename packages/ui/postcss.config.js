const path = require('path');

module.exports = {
  plugins: {
    tailwindcss: {
      config: path.resolve(__dirname, '../../apps/extension/tailwind.config.ts'),
    },
    autoprefixer: {},
  },
};
