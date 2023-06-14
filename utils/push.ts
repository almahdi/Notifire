import {
    ApplicationServerKeys,
    generatePushHTTPRequest,
} from "../webpush-webcrypto/webpush.js";

const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY")!;
const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY")!;

const keys = await ApplicationServerKeys.fromJSON({
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY
});
export async function push(subscription: Required<PushSubscriptionJSON>, data: string) {
    console.log("Generating push request")
    const { headers, body, endpoint } = await generatePushHTTPRequest({
        applicationServerKeys: keys,
        payload: data,
        target: {
            endpoint: subscription.endpoint,
            keys: {
                p256dh: subscription.keys.p256dh,
                auth: subscription.keys.auth,
            }
        },
        adminContact: 'mailto:hello@example.com',
        ttl: 90,
    });
    const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body,
    });
    const json = res.status;
    console.log(json);
    return json;

}