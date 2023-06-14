
import { HandlerContext, Handler } from "$fresh/server.ts";
import { listAll } from "../../utils/db.ts";


export const handler: Handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
    // const request: SubscribeRequest = await req.json();
    const res = await listAll();
    return new Response(JSON.stringify(res));
};
