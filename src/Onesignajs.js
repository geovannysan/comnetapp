import { OneSignal } from '@ionic-native/onesignal';


export const initializeOneSignal = () => {
// Configura tu App ID de OneSignal
OneSignal.push(() => {
    OneSignal.init({
        appId: '849c3d23-45d6-4477-9a2a-e2f964a03c79', // Reemplaza con tu App ID de OneSignal
    });

    // Suscripción a las notificaciones push
    OneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log('Suscripción a las notificaciones push:', isSubscribed);
    });

    // Manejo de notificaciones recibidas
    OneSignal.on('notificationDisplay', (event) => {
        console.log('Notificación recibida (global):', event);
    });

    // Manejo de notificación recibida solo para un usuario específico
   /* const playerId = 'PLAYER_ID'; // Reemplaza con el ID de jugador del usuario específico
    OneSignal.on('notificationDisplay', (event) => {
        const { additionalData } = event;
        if (additionalData && additionalData.playerId === playerId) {
            console.log('Notificación recibida (usuario específico):', event);
        }
    });*/
});

}