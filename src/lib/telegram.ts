import { formatToman, toFaDigits } from "@/lib/utils";

type OrderNotification = {
  id: string;
  productName: string;
  productPrice: number;
  telegram: string;
  note?: string | null;
};

type ReceiptFile = {
  bytes: ArrayBuffer;
  filename: string;
  type: string;
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

export async function sendOrderNotification(
  order: OrderNotification,
  receipt: ReceiptFile,
) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram env vars missing; skipping notification.");
    return;
  }

  const caption = orderCaption(order);
  const form = new FormData();
  form.set("chat_id", chatId);
  form.set("caption", caption);
  form.set("parse_mode", "HTML");
  form.set(
    "photo",
    new Blob([receipt.bytes], { type: receipt.type }),
    receipt.filename,
  );

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) {
      console.warn("Telegram sendPhoto failed", res.status, await res.text());
    }
  } catch (err) {
    console.warn("Telegram sendPhoto error", err);
  }
}