
export default function Curl({id}: { id: string}) {
    const curl_cmd = `curl -X POST https://notifire.deno.dev/api/send -H 'Content-Type: application/json' -d '{"key": "${id}", "msg": "Test Notification"}'`
    return (
        <article className="prose lg:prose-xl mx-auto mt-8 prose-blue p-2 lg:p-0">
            <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-50">
                <div class="text-xl italic font-medium leading-relaxed text-gray-900">
                    {curl_cmd}
                </div>
            </blockquote>
        </article>
    )
}