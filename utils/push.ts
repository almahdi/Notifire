// @deno-types="npm:@types/web-push"
import * as webpush from "npm:web-push"

const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY")!;
const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY")!;
export async function push(subscription: webpush.PushSubscription, data: string) {
    await webpush.setVapidDetails('mailto:', PUBLIC_KEY, PRIVATE_KEY);
    return await webpush.sendNotification(subscription, data);
}