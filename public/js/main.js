window.addEventListener('beforeinstallprompt', (event) => {
    // Prevenir que se muestre el banner de instalación de la aplicación de forma predeterminada
    event.preventDefault();
    // Guardar el evento para usarlo posteriormente
    const deferredPrompt = event;

    // Mostrar una notificación o un banner personalizado para invitar al usuario a agregar el acceso directo
    // Por ejemplo:
    const installBanner = document.getElementById('install-banner');
    installBanner.style.display = 'block';

    // Manejar el evento de clic en el banner o notificación
    installBanner.addEventListener('click', () => {
        // Mostrar el banner predeterminado para agregar el acceso directo
        deferredPrompt.prompt();
        // Esperar a que el usuario interactúe con el banner
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó agregar el acceso directo');
            } else {
                console.log('El usuario rechazó agregar el acceso directo');
            }
            // Limpiar el banner o notificación personalizada
            installBanner.style.display = 'none';
        });
    });
});