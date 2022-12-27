/* eslint-disable */
const { defineConfig } = require('vite');

module.exports = defineConfig({
  publicDir: false,
  build: {
    watch: {},
    emptyOutDir: false,
    outDir: 'public/js',
    rollupOptions: {
      input: {
        bundle: './public/js/index.js',
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
});
