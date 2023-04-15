const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@landing': path.resolve(__dirname, 'src/Components/Landing'),
    },
  },
};