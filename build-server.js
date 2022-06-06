import {build} from 'esbuild';
import {esbuildDecorators} from '@anatine/esbuild-decorators';

build({
  banner: {
    js: 'import { createRequire as topLevelCreateRequire } from \'module\';\n const require = topLevelCreateRequire(import.meta.url);',
  },

  watch: false,
  bundle: true,
  target: 'esnext',
  logLevel: 'error',
  format: 'esm',
  entryPoints: ['./server-src/main.ts'],
  outfile: './outDir/server-dist.js',
  tsconfig: 'tsconfig.json',
  plugins: [
    esbuildDecorators(),
  ],

  external: [
    'fs',
    'path',
    'os',
    'typeorm',
    'alt-server',
  ],
});
