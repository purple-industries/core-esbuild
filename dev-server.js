import {build} from 'esbuild';
import altvServerDev from 'esbuild-plugin-altv-dev-server';
import {esbuildDecorators} from '@anatine/esbuild-decorators';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const env = dotenv.parse(fs.readFileSync('./.env', 'utf8'));

build({
  define: Object.fromEntries(
      Object.entries(env)
          .map(([k, v]) => [`process.env.${k}`, JSON.stringify(v)]),
  ),
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
    'env',
  ],
});
