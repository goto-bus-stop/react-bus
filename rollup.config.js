import del from 'rollup-plugin-delete'
import buble from 'rollup-plugin-buble'

const pkg = require('./package.json')

export default {
  input: ['./src/index.js', './src/listener.js'],
  experimentalCodeSplitting: true,
  output: [{
    dir: './',
    format: 'es',
    entryFileNames: '[name].mjs',
    chunkFileNames: 'dist/chunk-[hash].mjs'
  }, {
    dir: './',
    format: 'cjs',
    entryFileNames: '[name].js',
    chunkFileNames: 'dist/chunk-[hash].js',
    interop: false
  }],
  external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)],
  plugins: [
    del({ targets: ['dist', 'index.*', 'listener.*'] }),
    buble({ objectAssign: 'Object.assign' })
  ]
}
