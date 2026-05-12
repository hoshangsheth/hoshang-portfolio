import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';

/**
 * Vite config — migrated from CRA/Craco.
 *
 * Highlights:
 *  - SWC-based React plugin (fast refresh, faster builds than Babel).
 *  - Keeps CRA-style `REACT_APP_*` env support via `envPrefix` (no rename needed).
 *  - `@` path alias matches the old jsconfig.json.
 *  - Dev server bound to 0.0.0.0:3000 to match supervisor + Emergent ingress.
 *  - HMR forced through wss/443 because the preview is reverse-proxied over HTTPS.
 *  - Production build splits vendor/ui chunks and uses esbuild for ultra-fast minify.
 */
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [
      react({
        // SWC handles JSX transform — no need for explicit jsxRuntime config.
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    // Allow legacy CRA env names so REACT_APP_* keeps working untouched.
    envPrefix: ['REACT_APP_', 'VITE_'],

    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      // File watching inside containers behaves better with polling.
      watch: {
        usePolling: true,
        interval: 200,
      },
      // Preview runs behind an HTTPS proxy → HMR must use wss on 443.
      hmr: {
        clientPort: 443,
        protocol: 'wss',
      },
      // Accept any forwarded host (Emergent rotates preview hostnames).
      allowedHosts: true,
    },

    preview: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      allowedHosts: true,
    },

    build: {
      target: 'es2020',
      outDir: 'build', // keep parity with CRA so Vercel/Render configs work unchanged
      assetsDir: 'static',
      sourcemap: false,
      cssCodeSplit: true,
      // esbuild is faster than terser; minified output is comparable for our size.
      minify: 'esbuild',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1024,
      rollupOptions: {
        output: {
          // Manual chunking keeps the critical path small and lets the browser
          // cache the heavy framework code separately from app code.
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
              return 'vendor-react';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
              return 'vendor-ui';
            }
            return 'vendor';
          },
          // Stable, cache-friendly filenames in production.
          entryFileNames: isProd ? 'static/js/[name]-[hash].js' : '[name].js',
          chunkFileNames: isProd ? 'static/js/[name]-[hash].js' : '[name].js',
          assetFileNames: isProd ? 'static/[ext]/[name]-[hash][extname]' : '[name][extname]',
        },
      },
    },

    // Drop a few heavy dev-only artifacts from CRA that Vite doesn't need.
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react'],
    },

    // Speed up cold starts.
    esbuild: {
      legalComments: 'none',
      // Keep class/function names for easier debugging of React DevTools.
      keepNames: true,
    },
  };
});
