import {Head} from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import UI from "../islands/UI.tsx";
const PUBLIC_KEY = Deno.env.get("PUBLIC_KEY");

export default function Home() {
    return (
        <>
            <Head>
                <title>Fresh App</title>
                <link
                    crossorigin="use-credentials"
                    rel="manifest"
                    href="/manifest.json"
                />

            </Head>
            <script
                type="module"
                src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate"
            ></script>
            <pwa-update swpath="/pwa-sw.js"></pwa-update>
            <UI PUBLIC_KEY={PUBLIC_KEY}/>
            <div class="p-4 mx-auto max-w-screen-md">
                <img
                    src="/logo.svg"
                    class="w-32 h-32"
                    alt="the fresh logo: a sliced lemon dripping with juice"
                />
                <p class="my-6">
                    Welcome to `inotify`. Try updating this message in the
                    ./routes/index.tsx file, and refresh.
                </p>
                <Counter start={3}/>
            </div>
        </>
    );
}
