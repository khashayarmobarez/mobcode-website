const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toFaDigits(value: string | number) {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatToman(value: number) {
  return `${toFaDigits(value.toLocaleString("en-US"))} تومان`;
}
