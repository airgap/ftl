// Ensure -200 <= value <= 200
export const lock200 = (n: number): number => Math.min(200, Math.max(-200, n));
