import {build} from 'esbuild';
import {esbuildDecorators} from '@anatine/esbuild-decorators';
import * as dotenv from 'dotenv';
import fs from 'fs';

const env = dotenv.parse(fs.readFileSync('./.env', 'utf8'));

build({
  define: {
    ...Object.fromEntries(
        Object.entries(env)
            .map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)]),
    ),
    'process.env.DEV': 'false',
  },

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
    'alt-server', 'env',
  ],
});
