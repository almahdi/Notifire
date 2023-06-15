import {Head} from "$fresh/runtime.ts";
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
                    href="/site.webmanifest"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="theme-color" content="#ffffff"/>
            </Head>
            <script
                type="module"
                src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate"
            ></script>
            <pwa-update swpath="/pwa-sw.js"></pwa-update>
            <UI PUBLIC_KEY={PUBLIC_KEY}/>
        </>
    );
}
