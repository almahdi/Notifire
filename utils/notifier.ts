import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

export async function getNotifications() {
    const registration = await navigator.serviceWorker.ready;
    return await registration.getNotifications();
}
export async function clearNotifications() {
    const notifications = await getNotifications();
    notifications.forEach(n => n.close());
}
export function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error("We weren't granted permission.");
        }
    });
}

export async function subscribeUserToPush(PUBLIC_KEY: string) {
    if (!PUBLIC_KEY) {
        throw new Error("No public key")
    }
    const registration = await navigator.serviceWorker.ready;
    const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: base64.toUint8Array(PUBLIC_KEY),
    }
    const pushSubscription = await registration.pushManager.subscribe(subscribeOptions);
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
}
