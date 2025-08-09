import { YooCheckout } from "@a2seven/yoo-checkout";

let YooKassaInstance: YooCheckout | null = null;

export function getYooKassa(): YooCheckout {
    if (!YooKassaInstance) {
        const shopId = process.env.YOOKASSA_SHOP_ID;
        const secretKey = process.env.YOOKASSA_SECRET_KEY;

        if (!shopId || !secretKey) {
            console.error(
                "Yookassa is not configured: missing YOOKASSA_SHOP_ID or YOOKASSA_SECRET_KEY"
            );

            throw new Error(
                "Yookassa is not configured: missing YOOKASSA_SHOP_ID or YOOKASSA_SECRET_KEY"
            );
        }

        YooKassaInstance = new YooCheckout({ shopId, secretKey });
    }
    return YooKassaInstance;
}
