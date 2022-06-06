import {build} from 'esbuild';
import {esbuildDecorators} from '@anatine/esbuild-decorators';

build({
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
    'natives',
  ],
});
