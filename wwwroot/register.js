(function () {
    const applicationServerPublicKey = 'BLC8GOevpcpjQiLkO7JmVClQjycvTCYWm6Cq_a7wJZlstGTVZvwGFFHMYfXt6Njyvgx_GlXJeo5cSiZ1y4JOx1o';

    window.blazorPushNotifications = {
        requestSubscription: async () => {
            const worker = await navigator.serviceWorker.getRegistration();
            const existingSubscription = await worker.pushManager.getSubscription();
            if (!existingSubscription) {
                try {
                    return await worker.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: applicationServerPublicKey
                    });
                } catch (error) {
                    if (error.name === 'NotAllowedError') {
                        return null;
                    }
                    throw error;
                }
            }
        }
    };
})();