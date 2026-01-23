export type Rgba = [number, number, number, number];

export function decodeToPixels(frame: any): Rgba[][] {
  const palette = frame?.uniqueColors;
  const rows = frame?.colors;

  if (!palette || !Array.isArray(rows)) return [];

  const pixels: Rgba[][] = [];

  for (let y = 0; y < rows.length; y++) {
    const rowRuns = rows[y];
    const row: Rgba[] = [];

    for (let i = 0; i < rowRuns.length; i++) {
      const run = rowRuns[i];
      const id = run[0];
      const count = run.length === 2 ? run[1] : 1;

      const color: Rgba = palette[String(id)] ?? [0, 0, 0, 0];

      for (let k = 0; k < count; k++) row.push(color);
    }

    pixels.push(row);
  }

  return pixels;
}

export function drawCanvas(
  canvas: HTMLCanvasElement,
  twoDArray: Rgba[][],
  pixelSize: number
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  if (!twoDArray.length || !twoDArray[0].length) return;

  function normalizeAlpha(a: number): number {
    if (!Number.isFinite(a)) return 1;
    if (a <= 1) return Math.max(0, a);                // 0..1
    if (a <= 100) return Math.max(0, a / 100);        // 0..100 (%)
    return Math.max(0, Math.min(255, a)) / 255;       // 0..255
  }

  canvas.width = pixelSize * twoDArray[0].length;
  canvas.height = pixelSize * twoDArray.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < twoDArray.length; y++) {
    for (let x = 0; x < twoDArray[y].length; x++) {
      const [r, g, b, a] = twoDArray[y][x];
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${normalizeAlpha(a)})`;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}
