export const site = {
  name: "passkadeh",
  url: "https://mobcode.dev",
  tagline: "فروش اکانت‌های هوش مصنوعی",
  description:
    "خرید اکانت معتبر opencode و دیگر سرویس‌های هوش مصنوعی با تحویل ۲۴ ساعته. پرداخت کارت به کارت و پشتیبانی ۲۴/۷ در تلگرام.",
  email: "hello@passkadeh.dev",
  telegram: "passkadeh",
};

export const telegramUrl = `https://t.me/${site.telegram}`;

export const payment = {
  cardNumber: "6037997471707910",
  bank: "بانک ملی",
  holderName: "",
  note: "بعد از واریز، تصویر رسید را در تلگرام بفرستید تا اکانت تحویل داده شود.",
};

export const navLinks = [
  { label: "محصولات", href: "/#products" },
  { label: "نحوه خرید", href: "/#how" },
  { label: "فروشگاه", href: "/shop" },
  { label: "سوالات", href: "/#faq" },
];

export const marqueeItems = [
  "تحویل ۲۴ ساعته",
  "اکانت اورجینال",
  "پشتیبانی ۲۴/۷",
  "پرداخت کارت به کارت",
  "قیمت منصفانه",
];

export type Feature = {
  title: string;
  body: string;
  icon: string;
  span: string;
};

export const features: Feature[] = [
  {
    title: "تحویل ۲۴ ساعته",
    body: "اکانت بعد از تأیید پرداخت، در تلگرام تحویل داده می‌شود.",
    icon: "rocket",
    span: "lg:col-span-2",
  },
  {
    title: "اکانت اورجینال",
    body: "تمام اکانت‌ها به‌صورت قانونی و با ضمانت اصالت عرضه می‌شوند.",
    icon: "shield",
    span: "",
  },
  {
    title: "پشتیبانی ۲۴/۷",
    body: "قبل و بعد از خرید، پاسخگوی سوالات شما در تلگرام هستیم.",
    icon: "headset",
    span: "",
  },
  {
    title: "پرداخت کارت به کارت",
    body: "بدون درگاه پرداخت، فقط با یک کارت به کارت ساده.",
    icon: "store",
    span: "",
  },
  {
    title: "قیمت منصفانه",
    body: "قیمت‌های رقابتی و شفاف، بدون هیچ هزینه پنهانی.",
    icon: "code",
    span: "lg:col-span-2",
  },
];

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "۰۱",
    title: "انتخاب اکانت",
    body: "محصول موردنظرت را از لیست محصولات انتخاب کن.",
  },
  {
    number: "۰۲",
    title: "پرداخت کارت به کارت",
    body: "مبلغ را به شماره کارت سایت واریز کن.",
  },
  {
    number: "۰۳",
    title: "تحویل در تلگرام",
    body: "تصویر رسید را در تلگرام یا وبسایت بفرست؛ اکانت ۲۴ ساعته تحویل داده می‌شود.",
  },
];

export type Product = {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  featured?: boolean;
  badge?: string;
};

export const products: Product[] = [
  {
    name: "اکانت opencode",
    price: 2000000,
    tagline: "دسترسی کامل به opencode با کیفیت بالا.",
    features: ["اکانت اصلی و اورجینال", "تحویل ۲۴ ساعته در تلگرام",  "پشتیبانی ۲۴/۷"],
    featured: true,
    badge: "پیشنهاد ویژه",
  },
];

export type Faq = {
  q: string;
  a: string;
};

export const faqs: Faq[] = [
  {
    q: "اکانت چطور تحویل داده می‌شود؟",
    a: "بعد از واریز کارت به کارت و ارسال تصویر رسید در تلگرام، اکانت به‌صورت ۲۴ ساعته تحویل داده می‌شود.",
  },
  {
    q: "چه روش پرداختی دارید؟",
    a: "فعلاً پرداخت فقط به‌صورت کارت به کارت انجام می‌شود. به‌زودی درگاه پرداخت آنلاین هم اضافه خواهد شد.",
  },
  {
    q: "اگر اکانت کار نکند چه می‌شود؟",
    a: "تمام اکانت‌ها ضمانت ۲۴ ساعته دارند. در صورت بروز مشکل، در بازه ضمانت اکانت جایگزین می‌شود.",
  },
  {
    q: "چطور با پشتیبانی تماس بگیرم؟",
    a: "از طریق تلگرام در دسترس هستیم و در سریع‌ترین زمان پاسخگوی شما هستیم.",
  },
];
