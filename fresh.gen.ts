// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/list.ts";
import * as $1 from "./routes/api/send.ts";
import * as $2 from "./routes/api/subscribe.ts";
import * as $3 from "./routes/api/unsubscribe.ts";
import * as $4 from "./routes/index.tsx";
import * as $$0 from "./islands/UI.tsx";

const manifest = {
  routes: {
    "./routes/api/list.ts": $0,
    "./routes/api/send.ts": $1,
    "./routes/api/subscribe.ts": $2,
    "./routes/api/unsubscribe.ts": $3,
    "./routes/index.tsx": $4,
  },
  islands: {
    "./islands/UI.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
