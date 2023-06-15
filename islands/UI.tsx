import {useState} from 'preact/hooks';
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import {useEffect} from "https://esm.sh/stable/preact@10.13.1/denonext/hooks.js";
import {askPermission, getNotifications, subscribeUserToPush} from "../utils/notifier.ts";
import Navbar from "../components/Navbar.tsx";
import Intro from "../components/intro.tsx";
import RegisterButton from "../components/RegisterButton.tsx";
import Curl from "../components/curl.tsx";
import NotificationList from "../components/NotificationList.tsx";

const channel = new BroadcastChannel('sw-messages');

export default function UI(props: { PUBLIC_KEY: string }) {
    const [id, setId] = useState<string | null>(null);
    const register = async () => {
        const registered = window.localStorage.getItem("registered");
        if (registered) {
            console.log("already registered")
            console.log(registered)
            return;
        }
        console.log("registering")
        try {
            const permission = await askPermission();
            const subscription = (await subscribeUserToPush(props.PUBLIC_KEY)).toJSON();
            console.log({subscription: subscription});
            console.log("sending subscription")
            const response = await fetch("/api/subscribe", {
                method: "POST",
                body: JSON.stringify({subscription})
            });
            const data = await response.json();
            console.log(data);
            window.localStorage.setItem("registered", data.id);
            setId(data.id);

        } catch (e) {
            console.log(e);
        }

    }
    useEffect(() => {
        try {
            const registered = window.localStorage.getItem("registered");
            if (registered) {
                setId(registered);
            }
            channel.addEventListener('message', event => {
                console.log('Received', event.data);
            });
            getNotifications().then((notifications) => {
                console.log(notifications);
            });
        } catch (e) {

        }
    }, [])
    return (<>
        <Navbar/>
        {/*{!id && <Intro/>}*/}
        <Intro/>
        <RegisterButton onclick={()=>register()}/>
        <Curl id={id}/>
        <NotificationList/>
    </>)
}