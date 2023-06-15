import setClipboard from "../utils/clipboard.ts";


export default function NotificationList({notifications}: { notifications: Notification[] }) {
    return (
        <article className="max-w-xl mx-auto mt-8 prose-blue p-2 lg:p-0 lg:pb-8">
            <div>
                {notifications.length === 0 &&
                    <div
                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <img src={'/logo-slate.svg'} className="mx-auto h-12 w-12"/>
                        <span className="mt-2 block text-sm font-semibold text-gray-900">No Notifications Yet.</span>
                    </div>
                }
                <ul role="list" className="divide-y divide-gray-100">
                    {notifications.map((notification, i) => (
                        <li key={`${i}-${notification?.timestamp}`}
                            className="flex items-center justify-between gap-x-6 py-5">
                            <div className="flex gap-x-4">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{notification.body}</p>
                                    {notification?.timestamp &&
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{notification?.timestamp}</p>}
                                </div>
                            </div>
                            <button
                                onclick={() => setClipboard(notification.body)}
                                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    )
}