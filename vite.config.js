import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        rwa: resolve(__dirname, 'rwa/index.html'),
        developers: resolve(__dirname, 'developers/index.html'),
        commercialProperties: resolve(__dirname, 'commercial-properties/index.html'),
        publicInfrastructure: resolve(__dirname, 'public-infrastructure/index.html'),
        smartDb: resolve(__dirname, 'products/smart-db/index.html'),
        movableCharger: resolve(__dirname, 'products/movable-charger/index.html'),
        ebeeDashboard: resolve(__dirname, 'products/ebee-dashboard/index.html'),
        about: resolve(__dirname, 'about/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
        demo: resolve(__dirname, 'demo/index.html'),
        tailwindHero: resolve(__dirname, 'index-tailwind.html')
      }
    }
  }
});
