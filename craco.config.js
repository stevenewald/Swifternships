const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@landing': path.resolve(__dirname, 'src/Components/Landing'),
      '@auth': path.resolve(__dirname, 'src/Components/Auth'),
      '@student' : path.resolve(__dirname, 'src/Components/Student'),
      '@images' : path.resolve(__dirname, 'src/Images'),
      '@employer' : path.resolve(__dirname, 'src/Components/Employer'),
    },
  },
};