// @deno-types="npm:@types/web-push"
import * as webpush from "npm:web-push"

const vapidKeys = webpush.generateVAPIDKeys()
console.log(vapidKeys);