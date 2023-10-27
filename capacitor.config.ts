import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'www.speed.com.ec',
  appName: 'speed',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
     
      iconColor: "#488AFF",
     
    },
  },
  
};

export default config;
