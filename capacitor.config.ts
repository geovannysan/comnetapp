import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'portal',
  webDir: 'build',
  bundledWebRuntime: false,
  "server": { "allowNavigation": ["https://portal.comnet.ec"] }
};

export default config;
