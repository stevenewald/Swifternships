const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@landing': path.resolve(__dirname, 'src/Components/Landing'),
      '@auth': path.resolve(__dirname, 'src/Components/Auth'),
      '@student' : path.resolve(__dirname, 'src/Components/Student'),
      '@application': path.resolve(__dirname, 'src/Components/Application'),
    },
  },
};