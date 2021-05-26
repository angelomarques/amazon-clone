export function toBRL(number) {
  const n = number ?? 0;
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}
