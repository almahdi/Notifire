import { HandlerContext, Handler } from "$fresh/server.ts";
import {getSubscriptionById} from "../../../utils/db.ts";
import {push} from "../../../utils/push.ts";

export const handler: Handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    const id = ctx.params.id;
    const subscription = await getSubscriptionById(id);
    if (!subscription) {
        return new Response(JSON.stringify({error: "Invalid Subscription"}), {status: 401});
    }
    const request = await req.json();
    try {
        // await InitializePush(PUBLIC_KEY, PRIVATE_KEY);
        // const output = await push(subscription, JSON.stringify(request));
        const output = await push(subscription, JSON.stringify(request));
        console.log({output});
    } catch (e) {}
    return new Response(JSON.stringify({id, request, subscription}, null, 2));
};
