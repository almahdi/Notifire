export default function RegisterButton({onclick}: { onclick: () => void }) {
    return (
        <article className="prose lg:prose-xl mx-auto mt-8 prose-blue p-2 lg:p-0">
            <div className="w-full text-center">
                <button
                    onclick={onclick}
                    type="button"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Register
                </button>
            </div>
        </article>
    )
}