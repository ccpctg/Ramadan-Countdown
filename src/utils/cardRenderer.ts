import { ThemePreset, toBengaliNumber } from '../data/ramadanData';

export interface PixelLabTextStyle {
  strokeEnabled: boolean;
  strokeColor: string;
  strokeWidth: number;
  shadowEnabled: boolean;
  shadowColor: string;
  shadowOpacity: number; // 0 to 1 (separate from blur radius!)
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  gradientEnabled: boolean;
  gradientColor2: string;
  bgBoxEnabled: boolean;
  bgBoxColor: string;
  bgBoxOpacity: number;
  bgBoxRadius: number;
  bgBoxPadding: number;
  rotation: number;
  opacity: number;
  letterSpacing: number;
  lineHeight: number;
  bold: boolean;
  italic: boolean;
  locked: boolean;
  visible: boolean;
}

export const DEFAULT_PIXELLAB_STYLE: PixelLabTextStyle = {
  strokeEnabled: false,
  strokeColor: '#000000',
  strokeWidth: 4,
  shadowEnabled: true,
  shadowColor: '#000000',
  shadowOpacity: 0.75,
  shadowBlur: 14,
  shadowOffsetX: 0,
  shadowOffsetY: 4,
  gradientEnabled: false,
  gradientColor2: '#f59e0b',
  bgBoxEnabled: false,
  bgBoxColor: '#041827',
  bgBoxOpacity: 0.65,
  bgBoxRadius: 16,
  bgBoxPadding: 20,
  rotation: 0,
  opacity: 1,
  letterSpacing: 0,
  lineHeight: 1.35,
  bold: false,
  italic: false,
  locked: false,
  visible: true
};

export interface CustomTextLayer {
  id: string;
  text: string;
  x: number; // 0-100%
  y: number; // 0-100%
  fontSize: number;
  fontFamily: string;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  shadow: boolean;
  style?: Partial<PixelLabTextStyle>;
}

export interface LogoSettings {
  enabled: boolean;
  locked?: boolean;
  mode: 'default_ccp' | 'custom_image' | 'custom_text';
  customTextMain: string;
  customTextSub: string;
  imageUrl: string | null;
  x: number; // 0-100%
  y: number; // 0-100%
  scale: number; // 0.3 to 2.5
  opacity: number; // 0.1 to 1
  cropX: number;
  cropY: number;
  cropW: number;
  cropH: number;
  rotation: number;
  shapeMask: 'none' | 'circle' | 'rounded' | 'arch' | 'feather' | 'Badge';
  featherAmount: number;
  borderWidth: number;
  borderColor: string;
  glowColor: string;
  glowBlur: number;
  removeBg: 'none' | 'auto' | 'white' | 'dark' | 'custom';
  removeBgCustomColor?: string;
  removeBgTolerance: number;
}

export type MunajatStyle =
  | 'ref1_line'
  | 'filled_gold'
  | 'tasbih_hands'
  | 'radiant_dua'
  | 'crescent_star'
  | 'fanous_lantern'
  | 'open_quran'
  | 'mosque_dome'
  | 'tasbih_beads'
  | 'dates_iftar'
  | 'islamic_star_badge'
  | 'makkah_kaaba';

export const ISLAMIC_ICON_OPTIONS: Array<{
  id: MunajatStyle;
  labelBn: string;
  categoryBn: string;
}> = [
  { id: 'ref1_line', labelBn: '১. ১ম রেফারেন্স মোনাজাত হাত', categoryBn: 'মোনাজাত' },
  { id: 'filled_gold', labelBn: '২. গোল্ডেন ভরাট মোনাজাত হাত', categoryBn: 'মোনাজাত' },
  { id: 'tasbih_hands', labelBn: '৩. তসবিহ হাতে মোনাজাত', categoryBn: 'মোনাজাত' },
  { id: 'radiant_dua', labelBn: '৪. নূরানী রশ্মি ও মোনাজাত', categoryBn: 'মোনাজাত' },
  { id: 'crescent_star', labelBn: '৫. নতুন চাঁদ ও তারা (হেলাল)', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'fanous_lantern', labelBn: '৬. রমজানের নূরানী ফানুস', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'open_quran', labelBn: '৭. রেহেলসহ পবিত্র কুরআন', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'mosque_dome', labelBn: '৮. মসজিদের গম্বুজ ও মিনার', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'tasbih_beads', labelBn: '৯. সুবর্ণ তসবিহ মালা', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'dates_iftar', labelBn: '১০. ইফতারের খেজুর ও পাত্র', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'islamic_star_badge', labelBn: '১১. রয়্যাল ইসলামিক স্টার ব্যাজ', categoryBn: 'ইসলামিক প্রতীক' },
  { id: 'makkah_kaaba', labelBn: '১২. পবিত্র কাবা শরীফ প্রতীক', categoryBn: 'ইসলামিক প্রতীক' }
];

export interface CardConfig {
  day: number; // 97 down to 1
  useBengaliDigits: boolean;
  aspectRatio: '4:5' | '1:1' | '9:16';
  themeId: number;

  // Background overrides
  customBgUrl: string | null;
  useRawRef1Photo: boolean;
  bgBrightness: number;
  bgContrast: number;
  bgBlur: number;
  bgVignette: number;
  bgOverlayColor: string;
  bgOverlayOpacity: number;
  bgZoom: number;
  bgPanX: number;
  bgPanY: number;
  showStars: boolean;
  showGoldenFrame: boolean;

  // Munajat / Praying Hands Icon
  showPrayingHands: boolean;
  handsLocked?: boolean;
  handsStyle: MunajatStyle;
  handsColor1: string;
  handsColor2: string;
  handsX: number;
  handsY: number;
  handsScale: number;
  handsRotation?: number;

  // Script Header ("Counting down to")
  scriptText: string;
  scriptFont: string;
  scriptSize: number;
  scriptColor: string;
  scriptX: number;
  scriptY: number;
  scriptStyle?: Partial<PixelLabTextStyle>;

  // Main Header ("RAMADHAN")
  titleText: string;
  titleFont: string;
  titleSize: number;
  titleColor: string;
  titleX: number;
  titleY: number;
  showSwishUnderline: boolean;
  titleStyle?: Partial<PixelLabTextStyle>;

  // Big Countdown Number ("97")
  numberFont: string;
  numberSize: number;
  numberColor: string;
  numberX: number;
  numberY: number;
  numberShadow: boolean;
  numberStyle?: Partial<PixelLabTextStyle>;

  // Days Left Label ("days to left")
  daysLabelText: string;
  daysLabelFont: string;
  daysLabelSize: number;
  daysLabelColor: string;
  daysLabelX: number;
  daysLabelY: number;
  daysLabelStyle?: Partial<PixelLabTextStyle>;

  // Arabic Dua Layer (strictly bounded inside box)
  showDua: boolean;
  duaArabicText: string;
  duaMeaningText: string;
  showDuaMeaning: boolean;
  duaFont: string;
  duaSize: number;
  duaColor: string;
  duaX: number;
  duaY: number;
  duaBoxWidth?: number; // percentage of canvas width (50 to 92, default 84)
  duaBgPill: boolean;
  duaStyle?: Partial<PixelLabTextStyle>;

  // Bottom Quote Layer
  quoteText: string;
  quoteFont: string;
  quoteSize: number;
  quoteColor: string;
  quoteX: number;
  quoteY: number;
  quoteStyle?: Partial<PixelLabTextStyle>;

  // Logo
  logo: LogoSettings;

  // Extra user text layers
  extraTexts: CustomTextLayer[];
}

export interface HitBox {
  id: 'logo' | 'script' | 'title' | 'number' | 'daysLabel' | 'dua' | 'hands' | 'quote' | string;
  labelBn: string;
  x: number;
  y: number;
  w: number;
  h: number;
  locked?: boolean;
}

export interface RenderOptions {
  selectedLayerId?: string | null;
  isExporting?: boolean;
  snapGuideX?: boolean;
  snapGuideY?: boolean;
}

// Convert hex or rgb color + alpha (0..1) into rgba() string for independent shadow opacity control
export function colorWithOpacity(color: string, opacity: number): string {
  const clamped = Math.max(0, Math.min(1, opacity));
  if (!color) return `rgba(0, 0, 0, ${clamped})`;
  const hex = color.trim();
  if (hex.startsWith('#')) {
    let c = hex.slice(1);
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    if (c.length >= 6) {
      const r = parseInt(c.slice(0, 2), 16) || 0;
      const g = parseInt(c.slice(2, 4), 16) || 0;
      const b = parseInt(c.slice(4, 6), 16) || 0;
      return `rgba(${r}, ${g}, ${b}, ${clamped})`;
    }
  }
  return `rgba(0, 0, 0, ${clamped})`;
}

// Word-wrap helper so text stays strictly inside maxWidth
function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const paragraphs = text.split('\n');
  const wrapped: string[] = [];

  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/);
    if (words.length === 0 || (words.length === 1 && !words[0])) {
      wrapped.push('');
      continue;
    }
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      if (ctx.measureText(testLine).width <= maxWidth) {
        currentLine = testLine;
      } else {
        wrapped.push(currentLine);
        currentLine = words[i];
      }
    }
    wrapped.push(currentLine);
  }
  return wrapped;
}

// Offscreen caches for 60FPS zero-lag rendering!
let cachedBgCanvas: HTMLCanvasElement | null = null;
let cachedBgKey = '';

let cachedLogoCanvas: HTMLCanvasElement | null = null;
let cachedLogoKey = '';

function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function drawRef1BlueDomeMosqueScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number
) {
  const skyGrad = ctx.createLinearGradient(0, 0, w * 0.35, h);
  skyGrad.addColorStop(0, '#041827');
  skyGrad.addColorStop(0.32, '#0a334d');
  skyGrad.addColorStop(0.58, '#174f68');
  skyGrad.addColorStop(0.76, '#6e5649');
  skyGrad.addColorStop(0.88, '#d96b27');
  skyGrad.addColorStop(1, '#e89923');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  const sunsetGlow = ctx.createRadialGradient(w * 0.78, h * 0.78, 20, w * 0.72, h * 0.78, w * 0.75);
  sunsetGlow.addColorStop(0, 'rgba(255, 165, 55, 0.55)');
  sunsetGlow.addColorStop(0.45, 'rgba(225, 95, 35, 0.35)');
  sunsetGlow.addColorStop(1, 'rgba(10, 40, 65, 0)');
  ctx.fillStyle = sunsetGlow;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  for (let i = 0; i < 6; i++) {
    const cy = h * (0.52 + i * 0.065);
    const cloudGrad = ctx.createLinearGradient(w * 0.2, cy - 40, w, cy + 40);
    cloudGrad.addColorStop(0, 'rgba(15, 45, 68, 0)');
    cloudGrad.addColorStop(0.5, i % 2 === 0 ? 'rgba(42, 72, 92, 0.35)' : 'rgba(235, 125, 52, 0.25)');
    cloudGrad.addColorStop(1, 'rgba(245, 158, 45, 0.3)');
    ctx.fillStyle = cloudGrad;
    ctx.beginPath();
    ctx.ellipse(w * (0.65 + (i % 3) * 0.08), cy, w * 0.48, h * 0.032, -0.06, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const baseX = w * 0.19;
  const domeCenterY = h * 0.65;
  const domeRadiusX = w * 0.245;
  const domeRadiusY = h * 0.23;

  drawDetailedMinaret(ctx, w * 0.018, h * 0.34, w * 0.036, h * 0.36, 0.75);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(baseX - domeRadiusX, domeCenterY);
  ctx.bezierCurveTo(
    baseX - domeRadiusX * 1.02,
    domeCenterY - domeRadiusY * 0.65,
    baseX - domeRadiusX * 0.35,
    domeCenterY - domeRadiusY * 1.02,
    baseX,
    domeCenterY - domeRadiusY * 1.08
  );
  ctx.bezierCurveTo(
    baseX + domeRadiusX * 0.35,
    domeCenterY - domeRadiusY * 1.02,
    baseX + domeRadiusX * 1.02,
    domeCenterY - domeRadiusY * 0.65,
    baseX + domeRadiusX,
    domeCenterY
  );
  ctx.closePath();

  const domeGrad = ctx.createRadialGradient(
    baseX - domeRadiusX * 0.28,
    domeCenterY - domeRadiusY * 0.45,
    w * 0.02,
    baseX + domeRadiusX * 0.1,
    domeCenterY - domeRadiusY * 0.2,
    domeRadiusX * 1.25
  );
  domeGrad.addColorStop(0, '#3898c4');
  domeGrad.addColorStop(0.35, '#196894');
  domeGrad.addColorStop(0.72, '#0c3b5e');
  domeGrad.addColorStop(1, '#051d33');
  ctx.fillStyle = domeGrad;
  ctx.fill();

  ctx.strokeStyle = 'rgba(125, 211, 252, 0.12)';
  ctx.lineWidth = 2;
  for (let r = -0.8; r <= 0.8; r += 0.2) {
    ctx.beginPath();
    ctx.moveTo(baseX, domeCenterY - domeRadiusY * 1.08);
    ctx.quadraticCurveTo(
      baseX + domeRadiusX * r * 1.1,
      domeCenterY - domeRadiusY * 0.45,
      baseX + domeRadiusX * r,
      domeCenterY
    );
    ctx.stroke();
  }
  ctx.restore();

  drawGoldenFinial(ctx, baseX, domeCenterY - domeRadiusY * 1.08, w * 0.045);

  const drumTopY = domeCenterY - h * 0.01;
  const drumHeight = h * 0.16;
  const drumLeft = baseX - domeRadiusX * 0.98;
  const drumWidth = domeRadiusX * 1.96;

  const corniceGrad = ctx.createLinearGradient(drumLeft, drumTopY, drumLeft + drumWidth, drumTopY);
  corniceGrad.addColorStop(0, '#78350f');
  corniceGrad.addColorStop(0.3, '#f59e0b');
  corniceGrad.addColorStop(0.6, '#fbbf24');
  corniceGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = corniceGrad;
  ctx.fillRect(drumLeft, drumTopY, drumWidth, h * 0.018);

  const drumWallGrad = ctx.createLinearGradient(drumLeft, drumTopY, drumLeft + drumWidth, drumTopY);
  drumWallGrad.addColorStop(0, '#57534e');
  drumWallGrad.addColorStop(0.4, '#a8a29e');
  drumWallGrad.addColorStop(0.75, '#44403c');
  drumWallGrad.addColorStop(1, '#1c1917');
  ctx.fillStyle = drumWallGrad;
  ctx.fillRect(drumLeft, drumTopY + h * 0.018, drumWidth, drumHeight);

  const numWindows = 5;
  const winSpacing = drumWidth / (numWindows + 0.5);
  const winW = winSpacing * 0.56;
  const winH = drumHeight * 0.62;
  const winTop = drumTopY + drumHeight * 0.25;

  for (let i = 0; i < numWindows; i++) {
    const wx = drumLeft + winSpacing * (i + 0.45);
    const winGlow = ctx.createRadialGradient(
      wx + winW / 2,
      winTop + winH / 2,
      4,
      wx + winW / 2,
      winTop + winH / 2,
      winW * 1.2
    );
    winGlow.addColorStop(0, 'rgba(255, 190, 60, 0.95)');
    winGlow.addColorStop(0.5, 'rgba(245, 130, 32, 0.45)');
    winGlow.addColorStop(1, 'rgba(245, 130, 32, 0)');
    ctx.fillStyle = winGlow;
    ctx.fillRect(wx - winW * 0.5, winTop - winH * 0.3, winW * 2, winH * 1.6);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(wx, winTop + winH);
    ctx.lineTo(wx, winTop + winW * 0.55);
    ctx.quadraticCurveTo(wx, winTop, wx + winW / 2, winTop);
    ctx.quadraticCurveTo(wx + winW, winTop, wx + winW, winTop + winW * 0.55);
    ctx.lineTo(wx + winW, winTop + winH);
    ctx.closePath();

    const innerWinGrad = ctx.createLinearGradient(wx, winTop, wx, winTop + winH);
    innerWinGrad.addColorStop(0, '#fef08a');
    innerWinGrad.addColorStop(0.5, '#f59e0b');
    innerWinGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = innerWinGrad;
    ctx.fill();

    ctx.strokeStyle = 'rgba(69, 26, 3, 0.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    for (let gy = winTop + 10; gy < winTop + winH; gy += 12) {
      ctx.beginPath();
      ctx.moveTo(wx, gy);
      ctx.lineTo(wx + winW, gy);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawDetailedMinaret(ctx, w * 0.056, h * 0.21, w * 0.064, h * 0.62, 1.0);

  const smallDomeX = w * 0.305;
  const smallDomeY = h * 0.855;
  const smallR = w * 0.068;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(smallDomeX - smallR, smallDomeY);
  ctx.bezierCurveTo(
    smallDomeX - smallR,
    smallDomeY - smallR * 1.1,
    smallDomeX - smallR * 0.3,
    smallDomeY - smallR * 1.45,
    smallDomeX,
    smallDomeY - smallR * 1.55
  );
  ctx.bezierCurveTo(
    smallDomeX + smallR * 0.3,
    smallDomeY - smallR * 1.45,
    smallDomeX + smallR,
    smallDomeY - smallR * 1.1,
    smallDomeX + smallR,
    smallDomeY
  );
  ctx.closePath();
  const smGrad = ctx.createLinearGradient(smallDomeX - smallR, smallDomeY - smallR, smallDomeX + smallR, smallDomeY);
  smGrad.addColorStop(0, '#2980b9');
  smGrad.addColorStop(0.6, '#0e4b75');
  smGrad.addColorStop(1, '#062138');
  ctx.fillStyle = smGrad;
  ctx.fill();
  ctx.restore();
  drawGoldenFinial(ctx, smallDomeX, smallDomeY - smallR * 1.55, w * 0.028);

  const bottomGrad = ctx.createLinearGradient(0, h * 0.77, 0, h);
  bottomGrad.addColorStop(0, 'rgba(6, 26, 38, 0)');
  bottomGrad.addColorStop(0.35, 'rgba(6, 28, 40, 0.78)');
  bottomGrad.addColorStop(1, 'rgba(3, 18, 28, 0.96)');
  ctx.fillStyle = bottomGrad;
  ctx.fillRect(0, h * 0.75, w, h * 0.25);

  ctx.fillStyle = 'rgba(4, 22, 34, 0.85)';
  ctx.fillRect(0, h * 0.88, w * 0.86, h * 0.12);
}

function drawGoldenFinial(ctx: CanvasRenderingContext2D, x: number, topY: number, height: number) {
  ctx.save();
  ctx.strokeStyle = '#fbbf24';
  ctx.fillStyle = '#fbbf24';
  ctx.lineWidth = Math.max(2, height * 0.07);
  ctx.beginPath();
  ctx.moveTo(x, topY + height * 0.2);
  ctx.lineTo(x, topY - height * 0.75);
  ctx.stroke();

  [0.15, 0.38, 0.58].forEach((pos, idx) => {
    ctx.beginPath();
    ctx.arc(x, topY - height * pos, height * (0.09 - idx * 0.018), 0, Math.PI * 2);
    ctx.fill();
  });

  const cy = topY - height * 0.82;
  const cr = height * 0.14;
  ctx.beginPath();
  ctx.arc(x, cy, cr, 0.15 * Math.PI, 1.35 * Math.PI, false);
  ctx.arc(x + cr * 0.28, cy - cr * 0.22, cr * 0.82, 1.3 * Math.PI, 0.2 * Math.PI, true);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawDetailedMinaret(
  ctx: CanvasRenderingContext2D,
  leftX: number,
  topY: number,
  width: number,
  height: number,
  opacity: number
) {
  ctx.save();
  ctx.globalAlpha = opacity;
  const centerX = leftX + width / 2;

  const spireH = height * 0.16;
  ctx.beginPath();
  ctx.moveTo(centerX, topY);
  ctx.quadraticCurveTo(centerX - width * 0.1, topY + spireH * 0.7, centerX - width * 0.34, topY + spireH);
  ctx.lineTo(centerX + width * 0.34, topY + spireH);
  ctx.quadraticCurveTo(centerX + width * 0.1, topY + spireH * 0.7, centerX, topY);
  ctx.closePath();
  const spireGrad = ctx.createLinearGradient(leftX, topY, leftX + width, topY + spireH);
  spireGrad.addColorStop(0, '#3898c4');
  spireGrad.addColorStop(1, '#09314d');
  ctx.fillStyle = spireGrad;
  ctx.fill();

  drawGoldenFinial(ctx, centerX, topY, width * 0.7);

  const pavTop = topY + spireH;
  const pavH = height * 0.12;
  const pavGrad = ctx.createLinearGradient(leftX, pavTop, leftX + width, pavTop);
  pavGrad.addColorStop(0, '#78350f');
  pavGrad.addColorStop(0.5, '#fbbf24');
  pavGrad.addColorStop(1, '#451a03');
  ctx.fillStyle = pavGrad;
  ctx.fillRect(centerX - width * 0.32, pavTop, width * 0.64, pavH);

  const bal1Y = pavTop + pavH;
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.moveTo(centerX - width * 0.56, bal1Y);
  ctx.lineTo(centerX + width * 0.56, bal1Y);
  ctx.lineTo(centerX + width * 0.42, bal1Y + height * 0.045);
  ctx.lineTo(centerX - width * 0.42, bal1Y + height * 0.045);
  ctx.closePath();
  ctx.fill();

  const shaftTop = bal1Y + height * 0.045;
  const shaftH = height * 0.34;
  const shaftGrad = ctx.createLinearGradient(leftX, shaftTop, leftX + width, shaftTop);
  shaftGrad.addColorStop(0, '#9a5b25');
  shaftGrad.addColorStop(0.45, '#f59e0b');
  shaftGrad.addColorStop(0.8, '#78350f');
  shaftGrad.addColorStop(1, '#291507');
  ctx.fillStyle = shaftGrad;
  ctx.fillRect(centerX - width * 0.38, shaftTop, width * 0.76, shaftH);

  const bal2Y = shaftTop + shaftH;
  ctx.fillStyle = '#b45309';
  ctx.fillRect(centerX - width * 0.62, bal2Y, width * 1.24, height * 0.045);

  const baseTop = bal2Y + height * 0.045;
  const baseH = height - (baseTop - topY);
  const baseGrad = ctx.createLinearGradient(leftX, baseTop, leftX + width, baseTop);
  baseGrad.addColorStop(0, '#cbd5e1');
  baseGrad.addColorStop(0.55, '#94a3b8');
  baseGrad.addColorStop(1, '#334155');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(centerX - width * 0.54, baseTop, width * 1.08, baseH);

  ctx.fillStyle = '#0c4a6e';
  ctx.fillRect(centerX - width * 0.36, baseTop + 18, width * 0.22, baseH * 0.42);
  ctx.fillRect(centerX + width * 0.08, baseTop + 18, width * 0.22, baseH * 0.42);

  ctx.restore();
}

function drawProceduralIslamicScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  theme: ThemePreset
) {
  const rand = seededRandom(theme.patternSeed);
  const [c1, c2, c3] = theme.skyColors;

  const bgGrad = ctx.createLinearGradient(0, 0, w * 0.4, h);
  bgGrad.addColorStop(0, c1);
  bgGrad.addColorStop(0.55, c2);
  bgGrad.addColorStop(1, c3);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  const isLight = theme.sceneType === 'minimal_paper_cut' && c1.toLowerCase() === '#f8fafc';
  ctx.strokeStyle = isLight ? 'rgba(15, 41, 66, 0.06)' : 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1.5;

  const gridSize = w * 0.22;
  for (let gx = 0; gx <= w + gridSize; gx += gridSize) {
    for (let gy = 0; gy <= h + gridSize; gy += gridSize) {
      drawEightPointStar(ctx, gx, gy, gridSize * 0.38);
    }
  }
  ctx.restore();

  switch (theme.sceneType) {
    case 'mosque_silhouette_gold':
    case 'twilight_minaret_reflection': {
      const glow = ctx.createRadialGradient(w * 0.3, h * 0.68, 10, w * 0.3, h * 0.68, w * 0.55);
      glow.addColorStop(0, `${theme.accentColor}66`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.fillStyle = c1;
      ctx.strokeStyle = theme.accentColor;
      ctx.lineWidth = 2;

      const domePositions = [0.18, 0.36, 0.78];
      domePositions.forEach((px, i) => {
        const dx = w * px;
        const dy = h * (i === 0 ? 0.72 : 0.78);
        const dr = w * (i === 0 ? 0.16 : 0.1);
        ctx.beginPath();
        ctx.arc(dx, dy, dr, Math.PI, 0, false);
        ctx.lineTo(dx + dr, h);
        ctx.lineTo(dx - dr, h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        drawGoldenFinial(ctx, dx, dy - dr, dr * 0.3);
      });

      drawDetailedMinaret(ctx, w * 0.04, h * 0.32, w * 0.048, h * 0.58, 0.92);
      drawDetailedMinaret(ctx, w * 0.88, h * 0.38, w * 0.042, h * 0.52, 0.85);
      ctx.restore();
      break;
    }

    case 'moroccan_arch_glow':
    case 'emerald_royal_mihrab':
    case 'ottoman_courtyard_arch': {
      ctx.save();
      const archCenterX = theme.layoutAlign === 'left' ? w * 0.74 : w * 0.5;
      const archW = theme.layoutAlign === 'left' ? w * 0.38 : w * 0.84;
      const archTop = h * 0.08;
      const archBottom = h * 0.92;

      const archGlow = ctx.createRadialGradient(
        archCenterX,
        h * 0.48,
        10,
        archCenterX,
        h * 0.48,
        archW * 0.7
      );
      archGlow.addColorStop(0, `${theme.accentColor}44`);
      archGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = archGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = theme.accentColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(archCenterX - archW / 2, archBottom);
      ctx.lineTo(archCenterX - archW / 2, archTop + archW * 0.45);
      ctx.quadraticCurveTo(archCenterX - archW / 2, archTop, archCenterX, archTop - 20);
      ctx.quadraticCurveTo(archCenterX + archW / 2, archTop, archCenterX + archW / 2, archTop + archW * 0.45);
      ctx.lineTo(archCenterX + archW / 2, archBottom);
      ctx.stroke();

      ctx.strokeStyle = `${theme.secondaryAccent}88`;
      ctx.lineWidth = 1.5;
      const inset = 16;
      ctx.beginPath();
      ctx.moveTo(archCenterX - archW / 2 + inset, archBottom);
      ctx.lineTo(archCenterX - archW / 2 + inset, archTop + archW * 0.45);
      ctx.quadraticCurveTo(archCenterX - archW / 2 + inset, archTop + inset, archCenterX, archTop - 20 + inset);
      ctx.quadraticCurveTo(
        archCenterX + archW / 2 - inset,
        archTop + inset,
        archCenterX + archW / 2 - inset,
        archTop + archW * 0.45
      );
      ctx.lineTo(archCenterX + archW / 2 - inset, archBottom);
      ctx.stroke();

      drawHangingFanous(ctx, archCenterX, archTop - 10, h * 0.16, w * 0.065, theme.accentColor);
      ctx.restore();
      break;
    }

    case 'hanging_fanous_trio':
    case 'candle_lantern_dates': {
      drawHangingFanous(ctx, w * 0.82, 0, h * 0.34, w * 0.095, theme.accentColor);
      drawHangingFanous(ctx, w * 0.68, 0, h * 0.48, w * 0.075, theme.secondaryAccent);
      if (rand() > 0.4) {
        drawHangingFanous(ctx, w * 0.91, 0, h * 0.56, w * 0.06, theme.accentColor);
      }
      break;
    }

    case 'crescent_starry_dunes':
    case 'celestial_orbit_crescent': {
      const moonX = w * 0.24;
      const moonY = h * 0.32;
      const moonR = w * 0.16;

      ctx.save();
      const moonGlow = ctx.createRadialGradient(moonX, moonY, moonR * 0.2, moonX, moonY, moonR * 2.2);
      moonGlow.addColorStop(0, `${theme.accentColor}55`);
      moonGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = theme.accentColor;
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonR, 0.2 * Math.PI, 1.3 * Math.PI, false);
      ctx.arc(moonX + moonR * 0.32, moonY - moonR * 0.24, moonR * 0.85, 1.25 * Math.PI, 0.25 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      drawHangingFanous(ctx, w * 0.8, 0, h * 0.38, w * 0.09, theme.accentColor);
      break;
    }

    case 'minimal_paper_cut': {
      ctx.save();
      ctx.strokeStyle = theme.accentColor;
      ctx.lineWidth = 2.5;
      drawEightPointStar(ctx, w * 0.16, h * 0.35, w * 0.18);
      drawEightPointStar(ctx, w * 0.16, h * 0.72, w * 0.22);

      drawHangingFanous(ctx, w * 0.16, 0, h * 0.52, w * 0.075, theme.accentColor);

      const cx = w * 0.27;
      const cy = h * 0.44;
      const cr = w * 0.065;
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, cy - cr);
      ctx.stroke();

      ctx.fillStyle = theme.accentColor;
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0.15 * Math.PI, 1.35 * Math.PI, false);
      ctx.arc(cx + cr * 0.3, cy - cr * 0.25, cr * 0.82, 1.3 * Math.PI, 0.2 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'quran_radiant_mandala':
    default: {
      ctx.save();
      const mx = w * 0.65;
      const my = h * 0.42;
      const mr = w * 0.28;
      const glow = ctx.createRadialGradient(mx, my, 10, mx, my, mr * 1.6);
      glow.addColorStop(0, `${theme.accentColor}66`);
      glow.addColorStop(0.5, `${theme.secondaryAccent}22`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = `${theme.accentColor}55`;
      ctx.lineWidth = 2;
      for (let r = mr * 0.3; r <= mr; r += mr * 0.22) {
        drawEightPointStar(ctx, mx, my, r);
      }
      ctx.restore();
      break;
    }
  }
}

function drawEightPointStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save();
  ctx.translate(cx, cy);
  for (let rot = 0; rot < 2; rot++) {
    ctx.rotate((rot * Math.PI) / 4);
    ctx.strokeRect(-r / 1.414, -r / 1.414, (r * 2) / 1.414, (r * 2) / 1.414);
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawHangingFanous(
  ctx: CanvasRenderingContext2D,
  x: number,
  topY: number,
  cordLen: number,
  radius: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, topY);
  ctx.lineTo(x, topY + cordLen);
  ctx.stroke();

  const ly = topY + cordLen;
  const glow = ctx.createRadialGradient(x, ly + radius * 1.3, 5, x, ly + radius * 1.3, radius * 3.2);
  glow.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
  glow.addColorStop(0.35, 'rgba(245, 158, 11, 0.38)');
  glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, ly + radius * 1.3, radius * 3.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - radius * 0.75, ly + radius * 0.6);
  ctx.quadraticCurveTo(x - radius * 0.5, ly, x, ly);
  ctx.quadraticCurveTo(x + radius * 0.5, ly, x + radius * 0.75, ly + radius * 0.6);
  ctx.closePath();
  ctx.fill();

  const bodyGrad = ctx.createLinearGradient(x, ly + radius * 0.6, x, ly + radius * 2.1);
  bodyGrad.addColorStop(0, '#fef08a');
  bodyGrad.addColorStop(0.5, '#f59e0b');
  bodyGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.moveTo(x - radius * 0.72, ly + radius * 0.65);
  ctx.lineTo(x + radius * 0.72, ly + radius * 0.65);
  ctx.lineTo(x + radius * 0.52, ly + radius * 2.05);
  ctx.lineTo(x - radius * 0.52, ly + radius * 2.05);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - radius * 0.52, ly + radius * 2.05);
  ctx.lineTo(x + radius * 0.52, ly + radius * 2.05);
  ctx.lineTo(x, ly + radius * 2.55);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawSingleMunajatHand(
  ctx: CanvasRenderingContext2D,
  filled: boolean
) {
  ctx.save();
  ctx.translate(6, 4);
  ctx.rotate(0.15);

  ctx.beginPath();
  ctx.moveTo(4, 44);
  ctx.bezierCurveTo(2, 26, 3, 10, 5, -24);
  ctx.bezierCurveTo(5.5, -34, 14.5, -34, 15, -24);
  ctx.lineTo(15, -10);
  ctx.lineTo(16, -32);
  ctx.bezierCurveTo(16.5, -42, 26, -42, 26.5, -32);
  ctx.lineTo(26.5, -10);
  ctx.lineTo(27.5, -27);
  ctx.bezierCurveTo(28, -37, 37, -36, 37.5, -26);
  ctx.lineTo(37.5, -6);
  ctx.lineTo(38.5, -17);
  ctx.bezierCurveTo(39, -25, 47, -24, 47, -15);
  ctx.bezierCurveTo(47, 0, 46, 11, 42, 20);
  ctx.bezierCurveTo(50, 10, 55, 5, 58, 9);
  ctx.bezierCurveTo(61, 13, 54, 25, 42, 33);
  ctx.bezierCurveTo(34, 39, 30, 43, 29, 48);

  if (filled) {
    ctx.closePath();
    ctx.fill();
  }
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(15, -10);
  ctx.quadraticCurveTo(14.5, 2, 13.5, 8);
  ctx.moveTo(26.5, -10);
  ctx.quadraticCurveTo(25.5, 3, 24, 10);
  ctx.moveTo(37.5, -6);
  ctx.quadraticCurveTo(36, 6, 34, 13);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(10, 15);
  ctx.quadraticCurveTo(24, 23, 38, 18);
  ctx.moveTo(38, 21);
  ctx.quadraticCurveTo(30, 29, 20, 32);
  ctx.stroke();

  ctx.restore();
}

function drawPrayingHandsIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  style: MunajatStyle,
  color1: string,
  color2: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(scale, scale);

  const c1 = color1 || '#f97316';
  const c2 = color2 || '#fde047';
  const handGrad = ctx.createLinearGradient(-68, -45, 68, 48);
  handGrad.addColorStop(0, c1);
  handGrad.addColorStop(0.5, '#fbbf24');
  handGrad.addColorStop(1, c2);

  ctx.strokeStyle = handGrad;
  ctx.fillStyle = handGrad;
  ctx.lineWidth = 3.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (style) {
    case 'crescent_star': {
      // 5. Islamic Crescent Moon & 5-Point Star (নতুন চাঁদ ও তারা)
      ctx.save();
      ctx.fillStyle = handGrad;
      ctx.beginPath();
      ctx.arc(-4, 0, 44, 0.18 * Math.PI, 1.38 * Math.PI, false);
      ctx.arc(10, -10, 35, 1.32 * Math.PI, 0.22 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = c2;
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // 5-Point Star
      const sx = 20;
      const sy = -14;
      const outerR = 14;
      const innerR = 6;
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i * Math.PI) / 5 - Math.PI / 2;
        const px = sx + Math.cos(a) * r;
        const py = sy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'fanous_lantern': {
      // 6. Traditional Ramadan Fanous Lantern (রমজানের নূরানী ফানুস)
      ctx.save();
      const glow = ctx.createRadialGradient(0, 4, 4, 0, 4, 52);
      glow.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
      glow.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 4, 52, 0, Math.PI * 2);
      ctx.fill();

      // Top ring
      ctx.strokeStyle = handGrad;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, -44, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Dome cap
      ctx.fillStyle = handGrad;
      ctx.beginPath();
      ctx.moveTo(-22, -22);
      ctx.quadraticCurveTo(-16, -38, 0, -38);
      ctx.quadraticCurveTo(16, -38, 22, -22);
      ctx.closePath();
      ctx.fill();

      // Glass body
      ctx.fillStyle = 'rgba(254, 240, 138, 0.28)';
      ctx.beginPath();
      ctx.moveTo(-24, -20);
      ctx.lineTo(24, -20);
      ctx.lineTo(18, 26);
      ctx.lineTo(-18, 26);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Inner arch lattice
      ctx.beginPath();
      ctx.moveTo(-8, 26);
      ctx.lineTo(-10, -18);
      ctx.moveTo(8, 26);
      ctx.lineTo(10, -18);
      ctx.stroke();

      // Base
      ctx.fillStyle = handGrad;
      ctx.beginPath();
      ctx.moveTo(-22, 26);
      ctx.lineTo(22, 26);
      ctx.lineTo(12, 40);
      ctx.lineTo(-12, 40);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'open_quran': {
      // 7. Open Holy Quran on Rehal (রেহেলসহ পবিত্র কুরআন)
      ctx.save();
      ctx.strokeStyle = handGrad;
      ctx.fillStyle = 'rgba(251, 191, 36, 0.16)';
      ctx.lineWidth = 3.2;

      // Left page
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.quadraticCurveTo(-24, 2, -52, 8);
      ctx.lineTo(-46, -28);
      ctx.quadraticCurveTo(-22, -34, 0, -22);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right page
      ctx.beginPath();
      ctx.moveTo(0, 12);
      ctx.quadraticCurveTo(24, 2, 52, 8);
      ctx.lineTo(46, -28);
      ctx.quadraticCurveTo(22, -34, 0, -22);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Quran text lines
      ctx.lineWidth = 2;
      [-18, -10, -2].forEach((ly) => {
        ctx.beginPath();
        ctx.moveTo(-38, ly);
        ctx.lineTo(-10, ly + 3);
        ctx.moveTo(10, ly + 3);
        ctx.lineTo(38, ly);
        ctx.stroke();
      });

      // Wooden Rehal stand (X-shape below)
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-44, 14);
      ctx.lineTo(26, 42);
      ctx.moveTo(44, 14);
      ctx.lineTo(-26, 42);
      ctx.stroke();

      // Radiant sun/star above Quran
      ctx.fillStyle = c2;
      ctx.beginPath();
      ctx.arc(0, -38, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'mosque_dome': {
      // 8. Mosque Dome & Minarets Emblem (মসজিদের গম্বুজ ও মিনার)
      ctx.save();
      ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
      ctx.strokeStyle = handGrad;
      ctx.lineWidth = 3;

      // Center Dome
      ctx.beginPath();
      ctx.moveTo(-32, 16);
      ctx.bezierCurveTo(-32, -8, -12, -26, 0, -34);
      ctx.bezierCurveTo(12, -26, 32, -8, 32, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Base Hall
      ctx.strokeRect(-36, 16, 72, 22);
      // Arch Door
      ctx.beginPath();
      ctx.moveTo(-10, 38);
      ctx.lineTo(-10, 26);
      ctx.quadraticCurveTo(0, 18, 10, 26);
      ctx.lineTo(10, 38);
      ctx.stroke();

      // Left & Right Minarets
      [-50, 50].forEach((mx) => {
        ctx.strokeRect(mx - 5, -18, 10, 56);
        ctx.beginPath();
        ctx.moveTo(mx - 6, -18);
        ctx.lineTo(mx, -34);
        ctx.lineTo(mx + 6, -18);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      });

      // Top Crescent on Dome
      ctx.beginPath();
      ctx.moveTo(0, -34);
      ctx.lineTo(0, -44);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, -47, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'tasbih_beads': {
      // 9. 33-Bead Golden Tasbih (সুবর্ণ তসবিহ মালা)
      ctx.save();
      ctx.fillStyle = handGrad;
      ctx.strokeStyle = handGrad;
      const numBeads = 18;
      for (let i = 0; i < numBeads; i++) {
        const a = (i / numBeads) * Math.PI * 2;
        const bx = Math.sin(a) * 34;
        const by = -Math.cos(a) * 26 - 4 + (a > Math.PI * 0.6 && a < Math.PI * 1.4 ? 6 : 0);
        ctx.beginPath();
        ctx.arc(bx, by, 4.8, 0, Math.PI * 2);
        ctx.fill();
      }
      // Imam bead & tassel
      ctx.beginPath();
      ctx.moveTo(0, 28);
      ctx.lineTo(0, 46);
      ctx.moveTo(0, 38);
      ctx.lineTo(-8, 48);
      ctx.moveTo(0, 38);
      ctx.lineTo(8, 48);
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'dates_iftar': {
      // 10. Ramadan Iftar Dates & Bowl (ইফতারের খেজুর ও পাত্র)
      ctx.save();
      ctx.fillStyle = handGrad;
      ctx.strokeStyle = handGrad;
      ctx.lineWidth = 3;

      // Dates inside bowl
      [
        [-18, -4, -0.2],
        [0, -8, 0],
        [18, -4, 0.2],
        [-9, 2, -0.1],
        [9, 2, 0.1]
      ].forEach(([dx, dy, rot]) => {
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, 11, 6.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Decorative Islamic Bowl
      ctx.fillStyle = 'rgba(251, 191, 36, 0.25)';
      ctx.beginPath();
      ctx.moveTo(-44, 4);
      ctx.quadraticCurveTo(-36, 34, 0, 34);
      ctx.quadraticCurveTo(36, 34, 44, 4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bowl pedestal
      ctx.beginPath();
      ctx.moveTo(-18, 34);
      ctx.lineTo(-24, 42);
      ctx.lineTo(24, 42);
      ctx.lineTo(18, 34);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
      break;
    }

    case 'islamic_star_badge': {
      // 11. 8-Point Rub el Hizb Islamic Badge (রয়্যাল ইসলামিক স্টার ব্যাজ)
      ctx.save();
      ctx.fillStyle = 'rgba(251, 191, 36, 0.18)';
      ctx.strokeStyle = handGrad;
      ctx.lineWidth = 3;
      for (let rot = 0; rot < 2; rot++) {
        ctx.save();
        ctx.rotate((rot * Math.PI) / 4);
        ctx.fillRect(-30, -30, 60, 60);
        ctx.strokeRect(-30, -30, 60, 60);
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.stroke();
      // Inner crescent
      ctx.fillStyle = handGrad;
      ctx.beginPath();
      ctx.arc(-2, 0, 10, 0.2 * Math.PI, 1.35 * Math.PI, false);
      ctx.arc(2, -2, 8, 1.3 * Math.PI, 0.25 * Math.PI, true);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      break;
    }

    case 'makkah_kaaba': {
      // 12. Holy Kaaba Emblem (পবিত্র কাবা শরীফ প্রতীক)
      ctx.save();
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = handGrad;
      ctx.lineWidth = 3;

      // Cube body
      ctx.beginPath();
      ctx.roundRect(-34, -28, 68, 64, 4);
      ctx.fill();
      ctx.stroke();

      // Golden Kiswah Band (হিজাম)
      ctx.fillStyle = handGrad;
      ctx.fillRect(-34, -14, 68, 11);

      // Golden Kaaba Door
      ctx.fillRect(6, 4, 14, 24);

      // Decorative arches above
      ctx.strokeStyle = c2;
      ctx.lineWidth = 1.8;
      for (let a = -50; a <= 50; a += 25) {
        const rad = ((a - 90) * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * 42, Math.sin(rad) * 42 - 4);
        ctx.lineTo(Math.cos(rad) * 52, Math.sin(rad) * 52 - 4);
        ctx.stroke();
      }
      ctx.restore();
      break;
    }

    case 'ref1_line':
    case 'filled_gold':
    case 'tasbih_hands':
    case 'radiant_dua':
    default: {
      ctx.fillStyle = style === 'filled_gold' ? 'rgba(251, 191, 36, 0.22)' : 'transparent';

      if (style === 'radiant_dua') {
        ctx.save();
        ctx.strokeStyle = c2;
        ctx.lineWidth = 2.2;
        for (let a = -60; a <= 60; a += 24) {
          const rad = ((a - 90) * Math.PI) / 180;
          ctx.beginPath();
          ctx.moveTo(Math.cos(rad) * 44, Math.sin(rad) * 44 - 10);
          ctx.lineTo(Math.cos(rad) * 58, Math.sin(rad) * 58 - 10);
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.save();
      ctx.scale(-1, 1);
      drawSingleMunajatHand(ctx, style === 'filled_gold');
      ctx.restore();

      drawSingleMunajatHand(ctx, style === 'filled_gold');

      if (style === 'tasbih_hands') {
        ctx.save();
        ctx.fillStyle = handGrad;
        const beadPts = [
          [-18, 32],
          [-15, 41],
          [-10, 49],
          [-4, 55],
          [4, 55],
          [10, 49],
          [15, 41],
          [18, 32],
          [0, 62]
        ];
        beadPts.forEach(([bx, by]) => {
          ctx.beginPath();
          ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.moveTo(0, 64);
        ctx.lineTo(-4, 73);
        ctx.moveTo(0, 64);
        ctx.lineTo(4, 73);
        ctx.stroke();
        ctx.restore();
      }
      break;
    }
  }

  ctx.restore();
}

function drawDefaultCCPLogo(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number,
  rotation: number,
  textColor: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.scale(scale, scale);

  const boxW = 270;
  const boxH = 105;

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);
  const ext = 14;
  [
    [-boxW / 2, -boxH / 2],
    [boxW / 2, -boxH / 2],
    [-boxW / 2, boxH / 2],
    [boxW / 2, boxH / 2]
  ].forEach(([vx, vy]) => {
    ctx.beginPath();
    ctx.moveTo(vx - ext, vy);
    ctx.lineTo(vx + ext, vy);
    ctx.moveTo(vx, vy - ext);
    ctx.lineTo(vx, vy + ext);
    ctx.stroke();
  });

  ctx.fillStyle = textColor;
  ctx.font = "400 22px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = 'left';
  ctx.fillText('C r e a t i v e', -116, -24);

  ctx.font = "800 38px 'Montserrat', sans-serif";
  ctx.fillText('C', -118, 14);

  const sphereX = -68;
  const sphereY = 1;
  const sphereR = 15;
  const sphereGrad = ctx.createLinearGradient(
    sphereX - sphereR,
    sphereY - sphereR,
    sphereX + sphereR,
    sphereY + sphereR
  );
  sphereGrad.addColorStop(0, '#ea580c');
  sphereGrad.addColorStop(0.5, '#f59e0b');
  sphereGrad.addColorStop(1, '#fde047');
  ctx.fillStyle = sphereGrad;
  ctx.beginPath();
  ctx.arc(sphereX, sphereY, sphereR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = textColor;
  ctx.fillText('NCΞPT', -46, 14);

  ctx.strokeStyle = '#a3e635';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-114, 27);
  ctx.quadraticCurveTo(-82, 22, -62, 26);
  ctx.lineTo(-72, 33);
  ctx.quadraticCurveTo(-42, 24, 8, 26);
  ctx.stroke();

  ctx.font = "400 22px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = 'right';
  ctx.fillText('P o i n t', 114, 38);

  ctx.font = "400 13.5px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('Your Vision • Our Creativity', 0, 68);

  ctx.restore();
}

export function getProcessedLogoCanvas(
  img: HTMLImageElement,
  logo: LogoSettings
): HTMLCanvasElement {
  const key = `${logo.imageUrl}_${logo.cropX}_${logo.cropY}_${logo.cropW}_${logo.cropH}_${logo.removeBg}_${logo.removeBgCustomColor || ''}_${logo.removeBgTolerance}_${logo.shapeMask}_${logo.featherAmount}`;
  if (cachedLogoCanvas && cachedLogoKey === key) {
    return cachedLogoCanvas;
  }

  const off = document.createElement('canvas');
  const sx = Math.floor(img.width * logo.cropX);
  const sy = Math.floor(img.height * logo.cropY);
  const sw = Math.max(16, Math.floor(img.width * logo.cropW));
  const sh = Math.max(16, Math.floor(img.height * logo.cropH));

  off.width = sw;
  off.height = sh;
  const octx = off.getContext('2d')!;
  octx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  if (logo.removeBg !== 'none') {
    const imgData = octx.getImageData(0, 0, sw, sh);
    const d = imgData.data;

    // Determine target background RGB color(s)
    let targetR = 255;
    let targetG = 255;
    let targetB = 255;

    if (logo.removeBg === 'auto') {
      // Sample 8 perimeter points (4 corners + 4 mid-edges) to auto-detect background color!
      const sampleCoords = [
        [0, 0],
        [sw - 1, 0],
        [0, sh - 1],
        [sw - 1, sh - 1],
        [Math.floor(sw / 2), 0],
        [Math.floor(sw / 2), sh - 1],
        [0, Math.floor(sh / 2)],
        [sw - 1, Math.floor(sh / 2)]
      ];
      let sumR = 0,
        sumG = 0,
        sumB = 0,
        count = 0;
      sampleCoords.forEach(([px, py]) => {
        const idx = (py * sw + px) * 4;
        if (d[idx + 3] > 20) {
          sumR += d[idx];
          sumG += d[idx + 1];
          sumB += d[idx + 2];
          count++;
        }
      });
      if (count > 0) {
        targetR = Math.round(sumR / count);
        targetG = Math.round(sumG / count);
        targetB = Math.round(sumB / count);
      }
    } else if (logo.removeBg === 'dark') {
      targetR = 0;
      targetG = 0;
      targetB = 0;
    } else if (logo.removeBg === 'custom' && logo.removeBgCustomColor) {
      const hex = logo.removeBgCustomColor.replace('#', '');
      if (hex.length >= 6) {
        targetR = parseInt(hex.slice(0, 2), 16) || 0;
        targetG = parseInt(hex.slice(2, 4), 16) || 0;
        targetB = parseInt(hex.slice(4, 6), 16) || 0;
      }
    }

    // Smooth anti-aliased Euclidean color distance removal so edges look clean and natural
    const maxDist = Math.max(12, (logo.removeBgTolerance / 100) * 220);
    const softBand = Math.max(10, maxDist * 0.35);

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      const dr = r - targetR;
      const dg = g - targetG;
      const db = b - targetB;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);

      if (dist <= maxDist - softBand) {
        d[i + 3] = 0;
      } else if (dist < maxDist + softBand) {
        const factor = (dist - (maxDist - softBand)) / (softBand * 2);
        d[i + 3] = Math.round(d[i + 3] * Math.max(0, Math.min(1, factor)));
      }
    }
    octx.putImageData(imgData, 0, 0, 0, 0, sw, sh);
  }

  if (logo.shapeMask === 'feather' || logo.featherAmount > 0) {
    const f = Math.max(logo.featherAmount, logo.shapeMask === 'feather' ? 24 : 0);
    if (f > 0) {
      octx.save();
      octx.globalCompositeOperation = 'destination-in';
      const radGrad = octx.createRadialGradient(
        sw / 2,
        sh / 2,
        Math.min(sw, sh) * Math.max(0.1, 0.5 - f / 100),
        sw / 2,
        sh / 2,
        Math.min(sw, sh) * 0.5
      );
      radGrad.addColorStop(0, 'rgba(0,0,0,1)');
      radGrad.addColorStop(1, 'rgba(0,0,0,0)');
      octx.fillStyle = radGrad;
      octx.fillRect(0, 0, sw, sh);
      octx.restore();
    }
  }

  cachedLogoCanvas = off;
  cachedLogoKey = key;
  return off;
}

function drawPixelLabTextBlock(
  ctx: CanvasRenderingContext2D,
  params: {
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontFamily: string;
    defaultWeight: string;
    color: string;
    align?: 'left' | 'center' | 'right';
    styleOverride?: Partial<PixelLabTextStyle>;
    extraUnderlineSwish?: boolean;
  }
): { x: number; y: number; w: number; h: number } {
  const st: PixelLabTextStyle = {
    ...DEFAULT_PIXELLAB_STYLE,
    ...params.styleOverride
  };

  if (!st.visible || !params.text.trim()) {
    return { x: params.x, y: params.y, w: 0, h: 0 };
  }

  ctx.save();
  ctx.translate(params.x, params.y);
  if (st.rotation) {
    ctx.rotate((st.rotation * Math.PI) / 180);
  }
  ctx.globalAlpha = st.opacity;

  const weight = st.bold ? '800' : params.defaultWeight;
  const italicPrefix = st.italic ? 'italic ' : '';
  ctx.font = `${italicPrefix}${weight} ${params.fontSize}px ${params.fontFamily}`;
  ctx.textAlign = params.align || 'center';
  ctx.textBaseline = 'middle';

  if ('letterSpacing' in ctx) {
    (ctx as unknown as { letterSpacing: string }).letterSpacing = `${st.letterSpacing}px`;
  }

  const lines = params.text.split('\n');
  const lineH = params.fontSize * (st.lineHeight || 1.35);
  const totalH = lines.length * lineH;
  const startY = -totalH / 2 + lineH / 2;

  let maxLineW = 80;
  lines.forEach((line) => {
    const w = ctx.measureText(line).width;
    if (w > maxLineW) maxLineW = w;
  });

  const pad = st.bgBoxEnabled ? st.bgBoxPadding : 14;
  const boxW = maxLineW + pad * 2;
  const boxH = totalH + pad * 1.4;

  if (st.bgBoxEnabled) {
    ctx.save();
    ctx.globalAlpha = st.opacity * st.bgBoxOpacity;
    ctx.fillStyle = st.bgBoxColor;
    ctx.beginPath();
    ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, st.bgBoxRadius);
    ctx.fill();
    ctx.restore();
  }

  if (st.gradientEnabled) {
    const grad = ctx.createLinearGradient(0, -totalH / 2, 0, totalH / 2);
    grad.addColorStop(0, params.color);
    grad.addColorStop(1, st.gradientColor2 || '#f59e0b');
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = params.color;
  }

  // Compute shadow color with independent shadowOpacity!
  const effectiveShadowColor = colorWithOpacity(st.shadowColor, st.shadowOpacity ?? 0.75);

  lines.forEach((line, idx) => {
    const ly = startY + idx * lineH;

    if (st.strokeEnabled && st.strokeWidth > 0) {
      ctx.save();
      ctx.strokeStyle = st.strokeColor;
      ctx.lineWidth = st.strokeWidth * 2;
      ctx.lineJoin = 'round';
      ctx.miterLimit = 2;
      ctx.strokeText(line, 0, ly);
      ctx.restore();
    }

    ctx.save();
    if (st.shadowEnabled && (st.shadowOpacity ?? 0.75) > 0) {
      ctx.shadowColor = effectiveShadowColor;
      ctx.shadowBlur = st.shadowBlur;
      ctx.shadowOffsetX = st.shadowOffsetX;
      ctx.shadowOffsetY = st.shadowOffsetY;
    }
    ctx.fillText(line, 0, ly);
    ctx.restore();
  });

  if (params.extraUnderlineSwish) {
    const uy = totalH * 0.44;
    ctx.save();
    if (st.shadowEnabled && (st.shadowOpacity ?? 0.75) > 0) {
      ctx.shadowColor = effectiveShadowColor;
      ctx.shadowBlur = st.shadowBlur;
    }
    ctx.strokeStyle = params.color;
    ctx.lineWidth = Math.max(4, params.fontSize * 0.075);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-maxLineW * 0.28, uy);
    ctx.quadraticCurveTo(maxLineW * 0.08, uy - 14, maxLineW * 0.36, uy + 8);
    ctx.stroke();

    ctx.fillStyle = params.color;
    ctx.beginPath();
    ctx.arc(maxLineW * 0.37, uy + 22, Math.max(3.5, params.fontSize * 0.045), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.restore();

  return {
    x: params.x - boxW / 2,
    y: params.y - boxH / 2,
    w: boxW,
    h: boxH + (params.extraUnderlineSwish ? 28 : 0)
  };
}

// Render and cache the static background layer so interactive foreground edits take < 1ms
function getRenderedBackgroundCanvas(
  targetW: number,
  targetH: number,
  config: CardConfig,
  theme: ThemePreset,
  loadedImages: Record<string, HTMLImageElement>
): HTMLCanvasElement {
  const activeBgUrl =
    config.customBgUrl ||
    (config.useRawRef1Photo && theme.id === 1
      ? '/assets/aistudio/1793610161444_1a8cdd53.jpg'
      : theme.bgImageUrl);

  const bgImg = activeBgUrl ? loadedImages[activeBgUrl] : undefined;
  const imgReady = bgImg && bgImg.complete && bgImg.naturalWidth > 0 ? 'loaded' : 'none';

  const bgKey = `${targetW}x${targetH}_theme${theme.id}_${activeBgUrl || 'proc'}_${imgReady}_b${config.bgBrightness}_c${config.bgContrast}_bl${config.bgBlur}_v${config.bgVignette}_ov${config.bgOverlayColor}_${config.bgOverlayOpacity}_z${config.bgZoom}_px${config.bgPanX}_py${config.bgPanY}_st${config.showStars}_fr${config.showGoldenFrame}`;

  if (cachedBgCanvas && cachedBgKey === bgKey) {
    return cachedBgCanvas;
  }

  const off = cachedBgCanvas || document.createElement('canvas');
  if (off.width !== targetW || off.height !== targetH) {
    off.width = targetW;
    off.height = targetH;
  }
  const ctx = off.getContext('2d')!;
  ctx.clearRect(0, 0, targetW, targetH);

  // 1. Base Background
  ctx.save();
  const blurPx = config.bgBlur || 0;
  ctx.filter = `brightness(${config.bgBrightness}%) contrast(${config.bgContrast}%)${
    blurPx > 0 ? ` blur(${blurPx}px)` : ''
  }`;

  if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
    const imgRatio = bgImg.naturalWidth / bgImg.naturalHeight;
    const canvasRatio = targetW / targetH;
    let drawW = targetW;
    let drawH = targetH;
    if (imgRatio > canvasRatio) {
      drawH = targetH;
      drawW = targetH * imgRatio;
    } else {
      drawW = targetW;
      drawH = targetW / imgRatio;
    }
    drawW *= config.bgZoom;
    drawH *= config.bgZoom;
    const offsetX = (targetW - drawW) / 2 + (config.bgPanX / 100) * targetW * 0.5;
    const offsetY = (targetH - drawH) / 2 + (config.bgPanY / 100) * targetH * 0.5;
    ctx.drawImage(bgImg, offsetX, offsetY, drawW, drawH);
  } else if (theme.sceneType === 'ref1_blue_dome_sunset') {
    drawRef1BlueDomeMosqueScene(ctx, targetW, targetH);
  } else {
    drawProceduralIslamicScene(ctx, targetW, targetH, theme);
  }
  ctx.restore();

  // 2. Color Overlay Tint
  if (config.bgOverlayOpacity > 0) {
    ctx.save();
    ctx.fillStyle = config.bgOverlayColor || '#000000';
    ctx.globalAlpha = config.bgOverlayOpacity / 100;
    ctx.fillRect(0, 0, targetW, targetH);
    ctx.restore();
  }

  // 3. Starfield
  if (config.showStars) {
    const rand = seededRandom(theme.patternSeed + 99);
    ctx.save();
    for (let i = 0; i < 42; i++) {
      const sx = rand() * targetW;
      const sy = rand() * (targetH * 0.52);
      const sr = rand() * 2.2 + 0.6;
      const alpha = rand() * 0.7 + 0.15;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 4. Vignette
  if (config.bgVignette > 0) {
    const vAlpha = (config.bgVignette / 100) * 0.75;
    const vigGrad = ctx.createRadialGradient(
      targetW / 2,
      targetH / 2,
      targetW * 0.25,
      targetW / 2,
      targetH / 2,
      targetH * 0.75
    );
    vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
    vigGrad.addColorStop(1, `rgba(0,0,0,${vAlpha})`);
    ctx.fillStyle = vigGrad;
    ctx.fillRect(0, 0, targetW, targetH);
  }

  // 5. Golden Frame
  if (config.showGoldenFrame) {
    ctx.save();
    const pad = 34;
    ctx.strokeStyle = theme.accentColor;
    ctx.lineWidth = 2.5;
    ctx.strokeRect(pad, pad, targetW - pad * 2, targetH - pad * 2);
    ctx.strokeStyle = `${theme.accentColor}66`;
    ctx.lineWidth = 1;
    ctx.strokeRect(pad + 10, pad + 10, targetW - (pad + 10) * 2, targetH - (pad + 10) * 2);
    ctx.restore();
  }

  cachedBgCanvas = off;
  cachedBgKey = bgKey;
  return off;
}

export function renderCardToCanvas(
  canvas: HTMLCanvasElement,
  config: CardConfig,
  theme: ThemePreset,
  loadedImages: Record<string, HTMLImageElement>,
  options: RenderOptions = {}
): HitBox[] {
  const hitBoxes: HitBox[] = [];

  const targetW = 1080;
  const targetH =
    config.aspectRatio === '1:1' ? 1080 : config.aspectRatio === '9:16' ? 1920 : 1350;

  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return hitBoxes;

  // Blit cached background in < 0.2ms!
  const bgCanvas = getRenderedBackgroundCanvas(targetW, targetH, config, theme, loadedImages);
  ctx.drawImage(bgCanvas, 0, 0);

  // Render Logo Layer
  if (config.logo.enabled) {
    const lx = (config.logo.x / 100) * targetW;
    const ly = (config.logo.y / 100) * targetH;
    const lScale = config.logo.scale;

    ctx.save();
    ctx.globalAlpha = config.logo.opacity;
    if (config.logo.glowBlur > 0) {
      ctx.shadowColor = config.logo.glowColor;
      ctx.shadowBlur = config.logo.glowBlur;
    }

    if (config.logo.mode === 'default_ccp') {
      drawDefaultCCPLogo(ctx, lx, ly, lScale, config.logo.rotation || 0, config.titleColor);
      hitBoxes.push({
        id: 'logo',
        labelBn: 'লোগো (Logo)',
        x: lx - 140 * lScale,
        y: ly - 60 * lScale,
        w: 280 * lScale,
        h: 135 * lScale,
        locked: config.logo.locked
      });
    } else if (config.logo.mode === 'custom_text') {
      ctx.translate(lx, ly);
      ctx.rotate(((config.logo.rotation || 0) * Math.PI) / 180);
      ctx.scale(lScale, lScale);
      ctx.textAlign = 'center';
      ctx.fillStyle = config.titleColor;
      ctx.font = "800 36px 'Montserrat', 'Hind Siliguri', sans-serif";
      ctx.fillText(config.logo.customTextMain || 'YOUR BRAND', 0, 0);
      if (config.logo.customTextSub) {
        ctx.font = "500 16px 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif";
        ctx.fillStyle = theme.accentColor;
        ctx.fillText(config.logo.customTextSub, 0, 28);
      }
      hitBoxes.push({
        id: 'logo',
        labelBn: 'টেক্সট লোগো (Logo)',
        x: lx - 140 * lScale,
        y: ly - 40 * lScale,
        w: 280 * lScale,
        h: 85 * lScale,
        locked: config.logo.locked
      });
    } else if (config.logo.mode === 'custom_image' && config.logo.imageUrl) {
      const logoImg = loadedImages[config.logo.imageUrl];
      if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
        const processed = getProcessedLogoCanvas(logoImg, config.logo);
        const baseSize = 180 * lScale;
        const aspect = processed.width / processed.height;
        const drawW = aspect >= 1 ? baseSize : baseSize * aspect;
        const drawH = aspect >= 1 ? baseSize / aspect : baseSize;

        ctx.translate(lx, ly);
        ctx.rotate((config.logo.rotation * Math.PI) / 180);

        ctx.beginPath();
        if (config.logo.shapeMask === 'circle') {
          ctx.arc(0, 0, Math.min(drawW, drawH) / 2, 0, Math.PI * 2);
          ctx.clip();
        } else if (config.logo.shapeMask === 'rounded') {
          ctx.roundRect(-drawW / 2, -drawH / 2, drawW, drawH, 28);
          ctx.clip();
        } else if (config.logo.shapeMask === 'arch') {
          ctx.moveTo(-drawW / 2, drawH / 2);
          ctx.lineTo(-drawW / 2, -drawH * 0.1);
          ctx.quadraticCurveTo(-drawW / 2, -drawH / 2, 0, -drawH / 2);
          ctx.quadraticCurveTo(drawW / 2, -drawH / 2, drawW / 2, -drawH * 0.1);
          ctx.lineTo(drawW / 2, drawH / 2);
          ctx.closePath();
          ctx.clip();
        } else if (config.logo.shapeMask === 'Badge') {
          const r = Math.min(drawW, drawH) / 2;
          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.clip();
        }

        ctx.drawImage(processed, -drawW / 2, -drawH / 2, drawW, drawH);

        if (config.logo.borderWidth > 0) {
          ctx.strokeStyle = config.logo.borderColor;
          ctx.lineWidth = config.logo.borderWidth;
          ctx.stroke();
        }

        hitBoxes.push({
          id: 'logo',
          labelBn: 'কাস্টম লোগো (Logo)',
          x: lx - drawW / 2,
          y: ly - drawH / 2,
          w: drawW,
          h: drawH,
          locked: config.logo.locked
        });
      }
    }
    ctx.restore();
  }

  // Render Main Heading ("RAMADHAN")
  if (config.titleText.trim() && config.titleStyle?.visible !== false) {
    const tx = (config.titleX / 100) * targetW;
    const ty = (config.titleY / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: config.titleText,
      x: tx,
      y: ty,
      fontSize: config.titleSize,
      fontFamily: config.titleFont,
      defaultWeight: '900',
      color: config.titleColor,
      styleOverride: config.titleStyle,
      extraUnderlineSwish: config.showSwishUnderline
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: 'title',
        labelBn: 'মূল শিরোনাম (RAMADHAN)',
        ...box,
        locked: config.titleStyle?.locked
      });
    }
  }

  // Script Header ("Counting down to")
  if (config.scriptText.trim() && config.scriptStyle?.visible !== false) {
    const sx = (config.scriptX / 100) * targetW;
    const sy = (config.scriptY / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: config.scriptText,
      x: sx,
      y: sy,
      fontSize: config.scriptSize,
      fontFamily: config.scriptFont,
      defaultWeight: '400',
      color: config.scriptColor,
      styleOverride: config.scriptStyle
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: 'script',
        labelBn: 'উপরের সাব-টাইটেল (Counting down to)',
        ...box,
        locked: config.scriptStyle?.locked
      });
    }
  }

  // Render Giant Countdown Number ("97" or "৯৭")
  if (config.numberStyle?.visible !== false) {
    const dayDisplay = config.useBengaliDigits ? toBengaliNumber(config.day) : String(config.day);
    const nx = (config.numberX / 100) * targetW;
    const ny = (config.numberY / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: dayDisplay,
      x: nx,
      y: ny,
      fontSize: config.numberSize,
      fontFamily: config.numberFont,
      defaultWeight: '900',
      color: config.numberColor,
      styleOverride: {
        shadowEnabled: config.numberShadow,
        shadowBlur: 28,
        shadowOffsetY: 8,
        lineHeight: 0.9,
        ...config.numberStyle
      }
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: 'number',
        labelBn: `কাউন্টডাউন সংখ্যা (${dayDisplay})`,
        ...box,
        locked: config.numberStyle?.locked
      });
    }
  }

  // Render Days Left Label ("days to left" / "দিন বাকি")
  if (config.daysLabelText.trim() && config.daysLabelStyle?.visible !== false) {
    const dx = (config.daysLabelX / 100) * targetW;
    const dy = (config.daysLabelY / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: config.daysLabelText,
      x: dx,
      y: dy,
      fontSize: config.daysLabelSize,
      fontFamily: config.daysLabelFont,
      defaultWeight: '400',
      color: config.daysLabelColor,
      styleOverride: config.daysLabelStyle
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: 'daysLabel',
        labelBn: 'দিন বাকি লেখা (days to left)',
        ...box,
        locked: config.daysLabelStyle?.locked
      });
    }
  }

  // Render Arabic Dua Block — STRICTLY BOUNDED INSIDE A BOX WITH AUTO-WRAPPING & CLIPPING!
  if (config.showDua && config.duaArabicText.trim() && config.duaStyle?.visible !== false) {
    const duaX = (config.duaX / 100) * targetW;
    const duaY = (config.duaY / 100) * targetH;
    const maxBoxW = ((config.duaBoxWidth || 84) / 100) * targetW;
    const padX = 32;
    const padY = 20;
    const innerMaxW = maxBoxW - padX * 2;

    ctx.save();
    ctx.translate(duaX, duaY);
    if (config.duaStyle?.rotation) {
      ctx.rotate((config.duaStyle.rotation * Math.PI) / 180);
    }
    ctx.globalAlpha = config.duaStyle?.opacity ?? 1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure & wrap Arabic lines so they NEVER exceed innerMaxW
    let arFontSize = config.duaSize;
    ctx.font = `700 ${arFontSize}px ${config.duaFont}`;
    let arLines = wrapTextLines(ctx, config.duaArabicText, innerMaxW);
    while (arLines.length > 3 && arFontSize > 22) {
      arFontSize -= 2;
      ctx.font = `700 ${arFontSize}px ${config.duaFont}`;
      arLines = wrapTextLines(ctx, config.duaArabicText, innerMaxW);
    }

    // Measure & wrap Bengali Meaning lines so they NEVER exceed innerMaxW
    let bnFontSize = Math.max(18, Math.round(arFontSize * 0.54));
    let bnLines: string[] = [];
    if (config.showDuaMeaning && config.duaMeaningText.trim()) {
      ctx.font = `500 ${bnFontSize}px 'Hind Siliguri', sans-serif`;
      bnLines = wrapTextLines(ctx, config.duaMeaningText, innerMaxW);
    }

    const arLineH = arFontSize * 1.42;
    const bnLineH = bnFontSize * 1.38;
    const arBlockH = arLines.length * arLineH;
    const bnBlockH = bnLines.length > 0 ? bnLines.length * bnLineH + 10 : 0;

    // Compute exact snug width (never wider than maxBoxW)
    let widestLine = 260;
    ctx.font = `700 ${arFontSize}px ${config.duaFont}`;
    arLines.forEach((l) => {
      const lw = ctx.measureText(l).width;
      if (lw > widestLine) widestLine = lw;
    });
    if (bnLines.length > 0) {
      ctx.font = `500 ${bnFontSize}px 'Hind Siliguri', sans-serif`;
      bnLines.forEach((l) => {
        const lw = ctx.measureText(l).width;
        if (lw > widestLine) widestLine = lw;
      });
    }

    const boxW = Math.min(maxBoxW, Math.max(widestLine + padX * 2, 340));
    const boxH = arBlockH + bnBlockH + padY * 2;

    // Draw enclosing Dua Box & strictly clip to its bounds so text can NEVER escape the box
    ctx.beginPath();
    ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 18);
    if (config.duaBgPill) {
      ctx.fillStyle = 'rgba(4, 20, 34, 0.72)';
      ctx.fill();
      ctx.strokeStyle = `${theme.accentColor}99`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }
    ctx.clip();

    // Draw Arabic lines inside the clipped box
    const dualShadowOpacity = config.duaStyle?.shadowOpacity ?? 0.75;
    ctx.shadowColor = colorWithOpacity(config.duaStyle?.shadowColor || '#000000', dualShadowOpacity);
    ctx.shadowBlur = config.duaStyle?.shadowBlur ?? 12;

    ctx.font = `700 ${arFontSize}px ${config.duaFont}`;
    ctx.fillStyle = config.duaColor;
    const startArY = -boxH / 2 + padY + arLineH / 2;

    arLines.forEach((line, i) => {
      const ly = startArY + i * arLineH;
      if (config.duaStyle?.strokeEnabled && config.duaStyle.strokeWidth) {
        ctx.strokeStyle = config.duaStyle.strokeColor || '#000000';
        ctx.lineWidth = config.duaStyle.strokeWidth * 2;
        ctx.strokeText(line, 0, ly);
      }
      ctx.fillText(line, 0, ly);
    });

    // Draw Bengali Meaning lines inside the clipped box
    if (bnLines.length > 0) {
      ctx.font = `500 ${bnFontSize}px 'Hind Siliguri', sans-serif`;
      ctx.fillStyle = '#f8fafc';
      const startBnY = startArY + arBlockH - arLineH / 2 + 10 + bnLineH / 2;
      bnLines.forEach((line, i) => {
        ctx.fillText(line, 0, startBnY + i * bnLineH);
      });
    }

    ctx.restore();

    hitBoxes.push({
      id: 'dua',
      labelBn: "আরবি দু'আ বক্স (Arabic Dua)",
      x: duaX - boxW / 2,
      y: duaY - boxH / 2,
      w: boxW,
      h: boxH,
      locked: config.duaStyle?.locked
    });
  }

  // Render Praying Hands Icon (মোনাজাতের চিহ্ন)
  if (config.showPrayingHands) {
    const hx = (config.handsX / 100) * targetW;
    const hy = (config.handsY / 100) * targetH;
    drawPrayingHandsIcon(
      ctx,
      hx,
      hy,
      config.handsScale,
      config.handsRotation || 0,
      config.handsStyle || 'ref1_line',
      config.handsColor1 || '#f97316',
      config.handsColor2 || theme.accentColor
    );
    hitBoxes.push({
      id: 'hands',
      labelBn: 'মোনাজাত আইকন (Munajat Hands)',
      x: hx - 68 * config.handsScale,
      y: hy - 50 * config.handsScale,
      w: 136 * config.handsScale,
      h: 105 * config.handsScale,
      locked: config.handsLocked
    });
  }

  // Render Bottom Bengali Quote / Message
  if (config.quoteText.trim() && config.quoteStyle?.visible !== false) {
    const qx = (config.quoteX / 100) * targetW;
    const qy = (config.quoteY / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: config.quoteText,
      x: qx,
      y: qy,
      fontSize: config.quoteSize,
      fontFamily: config.quoteFont,
      defaultWeight: '600',
      color: config.quoteColor,
      styleOverride: config.quoteStyle
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: 'quote',
        labelBn: 'নিচের বাণী / মেসেজ (Quote)',
        ...box,
        locked: config.quoteStyle?.locked
      });
    }
  }

  // Render Extra Custom Text Layers
  config.extraTexts.forEach((layer) => {
    if (!layer.text.trim() || layer.style?.visible === false) return;
    const lx = (layer.x / 100) * targetW;
    const ly = (layer.y / 100) * targetH;
    const box = drawPixelLabTextBlock(ctx, {
      text: layer.text,
      x: lx,
      y: ly,
      fontSize: layer.fontSize,
      fontFamily: layer.fontFamily,
      defaultWeight: layer.bold ? '700' : '500',
      color: layer.color,
      align: layer.align,
      styleOverride: {
        bold: layer.bold,
        shadowEnabled: layer.shadow,
        ...layer.style
      }
    });
    if (box.w > 0) {
      hitBoxes.push({
        id: layer.id,
        labelBn: `কাস্টম লেখা: ${layer.text.slice(0, 14)}`,
        ...box,
        locked: layer.style?.locked
      });
    }
  });

  // Interactive PixelLab Overlay (Selection Box + Center Alignment Snap Guides)
  if (!options.isExporting) {
    if (options.snapGuideX) {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(targetW / 2, 0);
      ctx.lineTo(targetW / 2, targetH);
      ctx.stroke();
      ctx.restore();
    }
    if (options.snapGuideY) {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(0, targetH / 2);
      ctx.lineTo(targetW, targetH / 2);
      ctx.stroke();
      ctx.restore();
    }

    if (options.selectedLayerId) {
      const selBox = hitBoxes.find((b) => b.id === options.selectedLayerId);
      if (selBox) {
        ctx.save();
        ctx.strokeStyle = selBox.locked ? '#f43f5e' : '#fbbf24';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(selBox.x, selBox.y, selBox.w, selBox.h);
        ctx.setLineDash([]);

        const handleR = 8;
        const corners = [
          [selBox.x, selBox.y],
          [selBox.x + selBox.w, selBox.y],
          [selBox.x, selBox.y + selBox.h],
          [selBox.x + selBox.w, selBox.y + selBox.h]
        ];
        corners.forEach(([cx, cy]) => {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = selBox.locked ? '#f43f5e' : '#d97706';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(cx, cy, handleR, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        });
        ctx.restore();
      }
    }
  }

  return hitBoxes;
}
