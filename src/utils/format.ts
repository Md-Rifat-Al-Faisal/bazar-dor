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
    color: isUp ? "text-green-600 bg-green-50" : isDown ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50",
    icon: isUp ? "▲" : isDown ? "▼" : "—",
  };
};