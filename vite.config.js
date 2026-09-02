import fs from 'fs';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  plugins: [
    injectHTML(),
    {
      name: 'materi-route-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && (req.url.startsWith('/materi/') || req.url === '/materi')) {
            req.url = '/src' + req.url;
          }
          next();
        });
      },
    },
    {
      name: 'post-build-assets',
      closeBundle() {
        // Guarantee all assets including kabim photos are available in dist/assets
        copyDirSync(resolve(__dirname, 'assets'), resolve(__dirname, 'dist/assets'));
        // Make materi accessible at both /materi/ and /src/materi/
        if (fs.existsSync(resolve(__dirname, 'dist/src/materi'))) {
          copyDirSync(resolve(__dirname, 'dist/src/materi'), resolve(__dirname, 'dist/materi'));
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        vscode: resolve(__dirname, 'src/materi/vscode/index.html'),
        git: resolve(__dirname, 'src/materi/git/index.html'),
        utility: resolve(__dirname, 'src/materi/utility/index.html'),
        forkPr: resolve(__dirname, 'src/materi/fork-pr/index.html'),
      },
    },
  },
});
