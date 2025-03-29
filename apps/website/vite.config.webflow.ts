import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { PluginOption } from 'vite';

export default defineConfig({
  plugins: [react()] as PluginOption[],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/webflow/index.ts'),
      formats: ['iife'],
      name: 'AralectsComponents',
      fileName: 'webflow-components'
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.css')) return 'webflow-components.css';
          if (name.endsWith('.ttf')) return 'fonts/[name][extname]';
          if (name.endsWith('.png')) return 'images/[name][extname]';
          return '[name][extname]';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      },
      external: ['react', 'react-dom']
    },
    cssCodeSplit: false,
    minify: 'terser',
    sourcemap: true,
    assetsInlineLimit: 0 // Don't inline any assets
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
      '~': resolve(__dirname, '../../packages/ui/src'),
      '@repo/ui': resolve(__dirname, '../../packages/ui')
    }
  }
}); 