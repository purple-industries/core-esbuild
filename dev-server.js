import {build} from 'esbuild';
import altvServerDev from 'esbuild-plugin-altv-dev-server';
import {esbuildDecorators} from '@anatine/esbuild-decorators';

build({
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from \'module\';\n const require = topLevelCreateRequire(import.meta.url);',
  },

  watch: true,
  bundle: true,
  target: 'esnext',
  logLevel: 'error',
  format: 'esm',
  entryPoints: ['./server-src/main.ts'],
  outfile: './server-dist.js',
  tsconfig: 'tsconfig.json',
  plugins: [
    esbuildDecorators(),
    altvServerDev({
      hotReload: {
        clientPath: './client-dist.js',
      },
      reconnectPlayers: true,
    }),
  ],

  external: [
    'fs',
    'path',
    'os',
    'typeorm',
  ],
});
