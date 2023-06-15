export default function Curl({id}: { id: string }) {
    const curl_cmd = `curl -X POST https://notifire.deno.dev/api/send -H 'Content-Type: application/json' -d '{"key": "${id}", "msg": "Test Notification"}'`
    return (
        <>
            <div className="flex items-center gap-x-6 bg-blue-600 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                <p className="text-sm leading-6 text-white w-full text-center">
                    Your Key is <strong>{id}</strong>
                </p>
            </div>

            <article className="prose mx-auto mt-8 prose-blue p-2 lg:p-0">
                <h2>API Documentation</h2>
                <p>Send an HTTPS request to <code>https://notifire.deno.dev/api/send</code> with the following
                    parameters:</p>
                <ul>
                    <li>
                        -&nbsp;<code>key</code> (required) - The key that identifies your device(s)
                    </li>
                    <li>
                        -&nbsp;<code>message</code> (required) - The message for your notification
                    </li>
                </ul>
                <h2>POST using CURL</h2>
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-50">
                    <div class="italic font-medium leading-relaxed text-gray-900">
                        {curl_cmd}
                    </div>
                </blockquote>
            </article>
        </>
    )
}