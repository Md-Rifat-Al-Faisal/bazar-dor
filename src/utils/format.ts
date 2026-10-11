export const bn = (n: number, d = 0) =>
  new Intl.NumberFormat("bn-BD", { minimumFractionDigits: d, maximumFractionDigits: d }).format(n);

export const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const getTrend = (dir?: string, pct?: number) => {
  const isUp = dir === "up" || (pct ?? 0) > 0;
  const isDown = dir === "down" || (pct ?? 0) < 0;
  return {
    color: isUp ? "text-rise bg-rise/10" : isDown ? "text-fall bg-fall/10" : "text-muted bg-canvas",
    text: isUp ? "text-rise" : isDown ? "text-fall" : "text-muted",
    icon: isUp ? "▲" : isDown ? "▼" : "—",
  };
};