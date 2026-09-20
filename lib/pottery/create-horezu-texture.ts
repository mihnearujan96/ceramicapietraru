/**
 * Higher-quality procedural Horezu clay texture (U around, V up).
 * Soft grain + hand-painted motifs — avoids harsh pixel noise that causes moiré.
 */
export function createHorezuTexture(size = 2048): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Base clay — warm biscuit / terracotta like the atelier façade
  const body = ctx.createLinearGradient(0, 0, 0, size);
  body.addColorStop(0, "#E8C4A0");
  body.addColorStop(0.22, "#D9A87A");
  body.addColorStop(0.5, "#C9825D");
  body.addColorStop(0.78, "#B96F4B");
  body.addColorStop(1, "#9E5A3A");
  ctx.fillStyle = body;
  ctx.fillRect(0, 0, size, size);

  // Soft mottling (clay variation) — large blurred blobs, not 1px noise
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 18 + Math.random() * 55;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const darker = Math.random() > 0.5;
    g.addColorStop(
      0,
      darker ? "rgba(68,47,38,0.07)" : "rgba(251,248,242,0.08)",
    );
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine grain via semi-transparent overlay (smoothed)
  const grain = ctx.createImageData(size, size);
  for (let i = 0; i < grain.data.length; i += 4) {
    const n = 118 + Math.floor(Math.random() * 40);
    grain.data[i] = n;
    grain.data[i + 1] = n - 8;
    grain.data[i + 2] = n - 18;
    grain.data[i + 3] = 18;
  }
  const grainCanvas = document.createElement("canvas");
  grainCanvas.width = size;
  grainCanvas.height = size;
  const gctx = grainCanvas.getContext("2d");
  if (gctx) {
    gctx.putImageData(grain, 0, 0);
    ctx.globalAlpha = 0.35;
    ctx.filter = "blur(0.6px)";
    ctx.drawImage(grainCanvas, 0, 0);
    ctx.filter = "none";
    ctx.globalAlpha = 1;
  }

  const cream = "#FBF8F2";
  const white = "#F5EFE5";
  const brown = "#3A2A22";

  // Neck bands
  strokeBand(ctx, size * 0.07, size, cream, 2.5);
  strokeBand(ctx, size * 0.1, size, cream, 2);
  strokeZigzag(ctx, size * 0.145, size, cream, size * 0.022);

  // Shoulder wave
  strokeOrganicWave(ctx, size * 0.26, size, cream, 3.5, 0.014, 10);

  // Roosters (two sides of unwrap)
  drawHorezuRooster(ctx, size * 0.28, size * 0.34, size * 0.26, cream, brown);
  drawHorezuRooster(ctx, size * 0.78, size * 0.34, size * 0.24, cream, brown);

  // Spiral accents near roosters
  drawSpiral(ctx, size * 0.48, size * 0.32, size * 0.045, cream);
  drawSpiral(ctx, size * 0.08, size * 0.36, size * 0.035, cream);

  // Classic belly wave + dots
  strokeOrganicWave(ctx, size * 0.5, size, cream, 5, 0.02, 8);
  paintDotsAlongWave(ctx, size * 0.5, size, cream, 14);

  // Brown snake / life line
  ctx.strokeStyle = brown;
  ctx.lineWidth = size * 0.004;
  ctx.lineCap = "round";
  ctx.globalAlpha = 0.85;
  ctx.beginPath();
  for (let x = 0; x <= size; x += 2) {
    const y =
      size * 0.68 +
      Math.sin((x / size) * Math.PI * 5) * size * 0.03 +
      Math.sin((x / size) * Math.PI * 11) * size * 0.008;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;

  // Base wave
  strokeOrganicWave(ctx, size * 0.84, size, white, 3, 0.012, 9);

  // Very soft seam blend (no harsh vertical shade bands)
  const edge = ctx.createLinearGradient(0, 0, size, 0);
  edge.addColorStop(0, "rgba(68,47,38,0.06)");
  edge.addColorStop(0.08, "rgba(68,47,38,0)");
  edge.addColorStop(0.92, "rgba(68,47,38,0)");
  edge.addColorStop(1, "rgba(68,47,38,0.06)");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

/** Soft bump/roughness map for clay surface. */
export function createClayBumpTexture(size = 1024): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 900; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 10;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const light = Math.random() > 0.5;
    g.addColorStop(0, light ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.28)");
    g.addColorStop(1, "rgba(128,128,128,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return canvas;
}

function strokeBand(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color: string,
  lineWidth: number,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.globalAlpha = 0.92;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(width, y);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function strokeZigzag(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color: string,
  amp: number,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.beginPath();
  const step = width / 22;
  for (let x = 0; x <= width; x += step) {
    const yy = y + ((Math.round(x / step) % 2 === 0 ? -1 : 1) * amp);
    if (x === 0) ctx.moveTo(x, yy);
    else ctx.lineTo(x, yy);
  }
  ctx.stroke();
}

function strokeOrganicWave(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color: string,
  lineWidth: number,
  ampRatio: number,
  cycles: number,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  const amp = width * ampRatio;
  for (let x = 0; x <= width; x += 2) {
    const t = x / width;
    const yy =
      y +
      Math.sin(t * Math.PI * cycles) * amp +
      Math.sin(t * Math.PI * cycles * 2.3) * amp * 0.25;
    if (x === 0) ctx.moveTo(x, yy);
    else ctx.lineTo(x, yy);
  }
  ctx.stroke();
}

function paintDotsAlongWave(
  ctx: CanvasRenderingContext2D,
  y: number,
  width: number,
  color: string,
  count: number,
) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const t = (i + 0.5) / count;
    const x = t * width;
    const yy =
      y +
      Math.sin(t * Math.PI * 8) * width * 0.02 +
      width * 0.028;
    ctx.beginPath();
    ctx.arc(x, yy, width * 0.0055, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawSpiral(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let a = 0; a < Math.PI * 3.2; a += 0.08) {
    const r = (a / (Math.PI * 3.2)) * radius;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    if (a === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawHorezuRooster(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  fill: string,
  ink: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale / 110, scale / 110);

  // Body fill (cream paint)
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(-8, 8);
  ctx.bezierCurveTo(-30, 0, -36, 28, -10, 36);
  ctx.bezierCurveTo(18, 42, 36, 22, 28, 4);
  ctx.bezierCurveTo(22, -6, 4, -2, -8, 8);
  ctx.fill();

  // Tail plumes
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2.4;
  const tails = [
    [-14, 10, -48, -8, -42, -32],
    [-10, 14, -40, 4, -52, -18],
    [-6, 16, -34, 18, -46, 2],
    [-12, 8, -56, -20, -38, -40],
  ];
  for (const [x0, y0, x1, y1, x2, y2] of tails) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.quadraticCurveTo(x1, y1, x2, y2);
    ctx.stroke();
  }

  // Neck + head
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(18, 4);
  ctx.bezierCurveTo(28, -10, 42, -18, 48, -6);
  ctx.bezierCurveTo(54, 4, 46, 14, 32, 14);
  ctx.bezierCurveTo(24, 14, 18, 10, 18, 4);
  ctx.fill();

  // Comb
  ctx.beginPath();
  ctx.moveTo(40, -10);
  ctx.lineTo(44, -26);
  ctx.lineTo(50, -12);
  ctx.lineTo(56, -22);
  ctx.lineTo(58, -6);
  ctx.closePath();
  ctx.fill();

  // Beak + eye
  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.moveTo(52, -2);
  ctx.lineTo(68, 2);
  ctx.lineTo(52, 8);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(46, -2, 2.4, 0, Math.PI * 2);
  ctx.fill();

  // Wing stroke
  ctx.strokeStyle = ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 14);
  ctx.quadraticCurveTo(14, 28, 26, 10);
  ctx.stroke();

  // Outline body lightly
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = ink;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-8, 8);
  ctx.bezierCurveTo(-30, 0, -36, 28, -10, 36);
  ctx.bezierCurveTo(18, 42, 36, 22, 28, 4);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore();
}
