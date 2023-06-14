import {deleteSubscription, listAll} from "./db.ts";

const kv = await Deno.openKv();

export const cleanKv = async () => {
    const list = await listAll();
    console.log(list);
    for (const item of list) {
//     const primaryKey = item.key;
//     const byAuthKey = ["subscriptions_by_auth", item.value.keys.auth];
//     const id_and_auth_keys = ["subscription_id_by_auth", item.value.keys.auth];
//     await kv.atomic()
//       .delete(primaryKey).delete(byAuthKey).delete(id_and_auth_keys)
//       .commit();
        await deleteSubscription(String(item.key[1]))
    }
};

await cleanKv();
