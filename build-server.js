import { build } from 'esbuild'
import altvServerDev from 'esbuild-plugin-altv-dev-server'
import commonjsPlugin from '@chialab/esbuild-plugin-commonjs';

build({
  banner: {
    js: "import { createRequire as topLevelCreateRequire } from 'module';\n const require = topLevelCreateRequire(import.meta.url);"
  },
  watch: true,
  bundle: true,
  target: 'esnext',
  logLevel: 'info',
  format: 'cjs',
  entryPoints: ['./server-src/main.ts'],
  outfile: './server-dist.js',
  plugins: [
      commonjsPlugin(),
    altvServerDev({
      hotReload: {
        clientPath: './client-dist.js'
      },
      reconnectPlayers: {delay: 2000}
    }),
  ],
  external: [
      "fs",
      "path",
      "os",
      "typeorm"
  ]
})
