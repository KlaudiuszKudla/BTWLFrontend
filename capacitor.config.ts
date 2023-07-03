import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kpz.btwlogistic',
  appName: 'frontend-demo',
  webDir: 'dist/frontend-demo',
  server: {
    androidScheme: 'https'
  }
};

export default config;
