import {HandlerContext, Handler} from "$fresh/server.ts";
import {getSubscriptionById} from "../../utils/db.ts";
import {z} from "https://deno.land/x/zod@v3.21.4/mod.ts";
import {push} from "../../utils/push.ts";


const RequestSchema = z.object({
    msg: z.string().min(1).max(200),
    key: z.string().min(3).max(10),
});

type TRequest = z.infer<typeof RequestSchema>;

export const handler: Handler = async (req: Request, ctx: HandlerContext): Promise<Response> => {
    const request: TRequest = await req.json();
    console.log(request);
    try {
        const parsed_request = RequestSchema.parse(request);
        const subscription = await getSubscriptionById(parsed_request.key);
        if (!subscription) {
            return new Response(JSON.stringify({error: "Invalid Key"}), {status: 401});
        }
        await push(subscription, JSON.stringify(request));
        return new Response(JSON.stringify({message: 'success'}));
    } catch (e) {
        return new Response(JSON.stringify({error: e.message}), {status: 500});
    }
};
