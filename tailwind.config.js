const daisyUi = require('daisyui');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [daisyUi],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'lofi', 'valentine', 'corporate', 'pastel', 'wireframe', 'retro'],
  },
};
