import { HandlerContext, Handler } from "$fresh/server.ts";
import {addSubscription} from "../../utils/db.ts";


type SubscribeRequest = {
    subscription: Required<PushSubscriptionJSON>;
}

export const handler: Handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
    const request: SubscribeRequest = await req.json();
    const res = await addSubscription(request.subscription)
    return new Response(JSON.stringify(res));
};
