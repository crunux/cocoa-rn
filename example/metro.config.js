const path = require('path');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

module.exports = {
  resolver: {
    extraNodeModules: {
      // Forzamos a que cualquier paquete que pida 'react' use el del example
      'react': path.resolve(nodeModulesPath, 'react'),
      'react-native': path.resolve(nodeModulesPath, 'react-native'),
    },
  },
  watchFolders: [path.resolve(__dirname, '..')],
};
