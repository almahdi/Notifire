export default function Intro() {
    return (
        <article className="prose lg:prose-xl mx-auto mt-8 prose-blue p-2 lg:p-0">
        <h1>NotiFire</h1>
        <p>
            NotiFire is a simple notification service that allows you to send notifications to your browser using curl, Deno, nodeJS, or any other language that can make a POST request.
        </p>
            <p>
                To Get Started you need to register your browser to receive notifications. To do that, click the register button to get your unique Key ID. Then, copy the CURL command and run it in your terminal.
            </p>
        </article>
    )
}