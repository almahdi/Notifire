import { nanoid } from "https://deno.land/x/nanoid/mod.ts"
// Generate ID using Math.random
// const id = Math.random().toString(32).slice(2);
// const id = parseInt(crypto.getRandomValues(new Uint8Array(5)).join("")).toString(16).slice(2);

// const id = crypto.getRandomValues(new Uint8Array(5))[0].toString(16);
const id = nanoid(7)
console.log(id);