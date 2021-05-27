export function toUSD(number) {
  const n = number ?? 0;
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
