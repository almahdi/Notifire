export default async function setClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text)
    } catch (_e) {
        //Do Nothing
    }
}
