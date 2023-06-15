import "$std/dotenv/load.ts";
import {
    ApplicationServerKeys,
    // generatePushHTTPRequest,
    setWebCrypto
} from "./webpush-webcrypto/webpush.js";

setWebCrypto(crypto);
const keys = await ApplicationServerKeys.generate();
const json_keys = await keys.toJSON();
console.log(json_keys);
await Deno.writeTextFile("./.env", `PUBLIC_KEY=${json_keys.publicKey}\nPRIVATE_KEY=${json_keys.privateKey}`);
//
// const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY")!;
// const PRIVATE_KEY = Deno.env.get("PRIVATE_KEY")!;
// const newKeys = await ApplicationServerKeys.fromJSON({
//     publicKey: PUBLIC_KEY,
//     privateKey: PRIVATE_KEY,
// });
//
// console.log(newKeys)