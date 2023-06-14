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
    let output;
    try {
        output = await push(subscription, JSON.stringify(request));
    } catch (e) {
        return new Response(JSON.stringify({error: e.message}), {status: 500});
    }
    return new Response(JSON.stringify({output}, null, 2));
};
