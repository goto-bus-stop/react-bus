import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

export default {
  input: ['./src/index.js', './src/listener.js'],
  experimentalCodeSplitting: true,
  output: [{
    dir: './dist',
    format: 'es',
    entryFileNames: '[name].mjs',
    chunkFileNames: '[hash].mjs'
  }, {
    dir: './dist',
    format: 'cjs',
    entryFileNames: '[name].js',
    chunkFileNames: '[hash].js',
    interop: false
  }],
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
  plugins: [buble({ objectAssign: 'Object.assign' })]
}
