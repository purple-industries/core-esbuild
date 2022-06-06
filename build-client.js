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
  watch: false,
  bundle: true,
  target: 'esnext',
  logLevel: 'error',
  format: 'esm',
  entryPoints: ['./client-src/main.ts'],
  outfile: './outDir/client-dist.js',
  plugins: [
    esbuildDecorators(),

  ],

  external: [
    'alt-*',
    'natives', 'env',
  ],
});
