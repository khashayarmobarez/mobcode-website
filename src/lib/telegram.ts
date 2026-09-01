import { formatToman, toFaDigits } from "@/lib/utils";

type OrderNotification = {
  id: string;
  productName: string;
  productPrice: number;
  telegram: string;
  note?: string | null;
  receiptUrl: string;
};

export function orderCaption(order: OrderNotification) {
  const lines = [
    `🛒 سفارش جدید`,
    `—`,
    `محصول: ${order.productName}`,
    `قیمت: ${formatToman(order.productPrice)}`,
    `تلگرام: @${order.telegram}`,
    order.note ? `یادداشت: ${order.note}` : null,
    `—`,
    `کد سفارش: #${toFaDigits(order.id.slice(-6))}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export async function sendOrderNotification(order: OrderNotification) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram env vars missing; skipping notification.");
    return;
  }

  const caption = orderCaption(order);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendPhoto`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          photo: order.receiptUrl,
          caption,
          parse_mode: "HTML",
        }),
      },
    );
    if (!res.ok) {
      console.warn("Telegram sendPhoto failed", res.status, await res.text());
    }
  } catch (err) {
    console.warn("Telegram sendPhoto error", err);
  }
}