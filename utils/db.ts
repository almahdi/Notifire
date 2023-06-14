import {nanoid} from "https://deno.land/x/nanoid@v3.0.0/mod.ts";

const kv = await Deno.openKv();

export const addSubscription = async (
    subscription: Required<PushSubscriptionJSON>,
) => {
    const id = nanoid(7);
    const primaryKey = ["subscriptions", id];
    const byAuthKey = ["subscriptions_by_auth", subscription.keys.auth];
    const id_and_auth_keys = ["subscription_id_by_auth", subscription.keys.auth];
    const existingId = await getSubscriptionIdbyAuthKey(subscription.keys.auth);
    if (existingId) return {id: existingId};
    const res = await kv.atomic().check()
        .check({key: primaryKey, versionstamp: null})
        .check({key: byAuthKey, versionstamp: null})
        .check({key: id_and_auth_keys, versionstamp: null})
        .set(primaryKey, subscription)
        .set(byAuthKey, subscription)
        .set(id_and_auth_keys, id)
        .commit();
    if (res.ok) {
        return {id: id};
    } else {
        return {id: -1};
    }
};

export const getSubscriptionIdbyAuthKey = async (authKey: string) => {
    const res = await kv.get<string>(["subscription_id_by_auth", authKey]);
    return res.value;
};

export const getSubscriptionById = async (id: string) => {
    const res = await kv.get<Required<PushSubscriptionJSON>>([
        "subscriptions",
        id,
    ]);
    return res.value;
};

export const getSubscriptionByAuthKey = async (authKey: string) => {
    const res = await kv.get<Required<PushSubscriptionJSON>>([
        "subscriptions_by_auth",
    ]);
    return res.value;
};

export const deleteSubscription = async (id: string) => {
    const subscription = await getSubscriptionById(id);
    if (!subscription) return false;
    const primaryKey = ["subscriptions", id];
    const getRes = await kv.get(primaryKey);
    const byAuthKey = ["subscriptions_by_auth", subscription.keys.auth];
    const id_and_auth_keys = ["subscription_id_by_auth", subscription.keys.auth];
    const res = await kv.atomic()
        .check(getRes).delete(primaryKey)
        .delete(byAuthKey)
        .delete(id_and_auth_keys)
        .commit();
    return res.ok;
};

export const listAll = async () => {
    const list = kv.list<Required<PushSubscriptionJSON>>({
        prefix: ["subscriptions"],
    });
    const items: { key: Deno.KvKey; value: Required<PushSubscriptionJSON> }[] =
        [];
    for await (const item of list) {
        items.push({key: item.key, value: item.value});
    }
    return items;
};
