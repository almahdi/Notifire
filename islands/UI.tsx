import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import {useEffect} from "https://esm.sh/stable/preact@10.13.1/denonext/hooks.js";


function askPermission() {
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

async function subscribeUserToPush(PUBLIC_KEY: string) {
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

const channel = new BroadcastChannel('sw-messages');

export default function UI(props: { PUBLIC_KEY: string }) {
    const register = async () => {
        console.log("registering")
        try {
            const permission = await askPermission();
            const subscription = (await subscribeUserToPush(props.PUBLIC_KEY)).toJSON();
            console.log({ subscription: subscription });
            console.log("sending subscription")
            const response = await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({subscription})
            });
            const data = await response.json();
            console.log(data);

        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        try {
            channel.addEventListener('message', event => {
                console.log('Received', event.data);
            });
        } catch (e) {

        }
    })
    return (<>
        <div class="p-4 mx-auto max-w-screen-md">
            <button onclick={() => register()}
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Register
            </button>
        </div>
    </>)
}