import {useState, useCallback} from 'preact/hooks';
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
import {useEffect} from "https://esm.sh/stable/preact@10.13.1/denonext/hooks.js";
import {askPermission, getNotifications, subscribeUserToPush} from "../utils/notifier.ts";
import Navbar from "../components/Navbar.tsx";
import Intro from "../components/intro.tsx";
import RegisterButton from "../components/RegisterButton.tsx";
import Curl from "../components/curl.tsx";
import NotificationList from "../components/NotificationList.tsx";
import Footer from "../components/Footer.tsx";

const channel = new BroadcastChannel('sw-messages');

type Notification = {
    body: string;
    timestamp: Date | number;
};

export default function UI(props: { PUBLIC_KEY: string }) {
    const [id, setId] = useState<string | null>(null);
    const savedNotifications = JSON.parse(window.localStorage.getItem("notifications")) || [];
    const [notifications, setNotifications] = useState<Notification>(savedNotifications);
    const register = useCallback(async () => {
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

    }, []);
    useEffect(() => {
        try {
            const registered = window.localStorage.getItem("registered");
            if (registered) {
                setId(registered);
            }
            channel.addEventListener('message', event => {
                console.log(event.data.data);
                setNotifications((notifications) => {
                    return [...notifications, {
                        body: event.data.data,
                        timestamp: new Date().toISOString()
                    }]
                });
            });
        } catch (e) {

        }
    }, [])
    useEffect(() => {
        console.log("saving notifications", notifications);
        window.localStorage.setItem("notifications", JSON.stringify(notifications));
    }, [notifications]);
    return (<>
        <Navbar/>
        <div className="min-h-screen">
            {!id && <>
                <Intro/>
                <RegisterButton onclick={() => register()}/>
            </>
            }
            {id && <>
                <Curl id={id}/>
                <NotificationList notifications={notifications}/>
            </>
            }
        </div>
        <Footer/>
    </>)
}