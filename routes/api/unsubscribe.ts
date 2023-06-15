import {Handler, HandlerContext} from "$fresh/server.ts";
import {deleteSubscription, getSubscriptionIdbyAuthKey} from "../../utils/db.ts";


type SubscribeRequest = {
    subscription: Required<PushSubscriptionJSON>;
}

export const handler: Handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
    const request: SubscribeRequest = await req.json();
    const id = await getSubscriptionIdbyAuthKey(request.subscription.keys.auth)
    if (!id) return new Response(JSON.stringify({success: false, message: "Subscription not found"}));
    const res = await deleteSubscription(id);
    if (res)
        return new Response(JSON.stringify({success: true, message: "Subscription deleted"}));
    else
        return new Response(JSON.stringify({success: false, message: "Subscription not found"}));
};
