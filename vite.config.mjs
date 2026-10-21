import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { siteUrl } from './src/config/site.js';

const siteFiles = {
  'robots.txt': 'public/robots.txt',
  'sitemap.xml': 'public/sitemap.xml',
};

export default defineConfig(({ mode }) => {
  const emailEnv = loadEnv(mode, process.cwd(), 'VITE_');
  const publicFilesPlugin = {
    name: 'portfolio-public-site-files',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', siteUrl);
    },
    writeBundle(outputOptions) {
      const outputDir = outputOptions.dir || resolve('dist');
      Object.entries(siteFiles).forEach(([fileName, sourcePath]) => {
        const content = readFileSync(resolve(sourcePath), 'utf8').replaceAll('__SITE_URL__', siteUrl);
        writeFileSync(resolve(outputDir, fileName), content);
      });
    },
  };

  return {
    plugins: [react(), publicFilesPlugin],
    define: {
      'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(emailEnv.VITE_EMAILJS_SERVICE_ID || ''),
      'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(emailEnv.VITE_EMAILJS_TEMPLATE_ID || ''),
      'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(emailEnv.VITE_EMAILJS_PUBLIC_KEY || ''),
    },
  };
});
