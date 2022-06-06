import {build} from 'esbuild';
import {esbuildDecorators} from '@anatine/esbuild-decorators';

build({
  watch: true,
  bundle: true,
  target: 'esnext',
  logLevel: 'error',
  format: 'esm',
  entryPoints: ['./client-src/main.ts'],
  outfile: './client-dist.js',
  plugins: [
    esbuildDecorators(),
  ],
  external: [
    'alt-*',
    'natives',

  ],
});
