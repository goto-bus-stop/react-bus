import buble from 'rollup-plugin-buble'

const meta = require('./package.json')

export default {
  input: './index.js',
  output: [
    { format: 'cjs', file: meta.main, exports: 'named', interop: false },
    { format: 'es', file: meta.module },
  ],

  external: Object.keys(meta.dependencies)
    .concat(Object.keys(meta.peerDependencies)),
  plugins: [buble()]
}
