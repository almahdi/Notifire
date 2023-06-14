import { HandlerContext, Handler } from "$fresh/server.ts";
import {getSubscriptionById} from "../../utils/db.ts";

export const handler: Handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    const id = ctx.params.id;
    const subscription = await getSubscriptionById(id);
if (!subscription) {
    return new Response(JSON.stringify({error: "Invalid Subscription"}), {status: 401});
}
    const request = await req.json();
    return new Response(JSON.stringify({id, request, subscription}));
};
