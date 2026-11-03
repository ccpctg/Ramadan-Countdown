import React, { useEffect, useRef, useState } from 'react';
import { X, Crop, Sparkles, RotateCcw, Check, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import { LogoSettings, getProcessedLogoCanvas } from '../utils/cardRenderer';

interface LogoCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  logo: LogoSettings;
  onChange: (updated: Partial<LogoSettings>) => void;
  onUploadLogo?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LogoCropModal: React.FC<LogoCropModalProps> = ({
  isOpen,
  onClose,
  logo,
  onChange,
  onUploadLogo
}) => {
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cropContainerRef = useRef<HTMLDivElement | null>(null);
  const [loadedImg, setLoadedImg] = useState<HTMLImageElement | null>(null);
  const [isDraggingCrop, setIsDraggingCrop] = useState(false);
  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    cropX: number;
    cropY: number;
  } | null>(null);

  useEffect(() => {
    if (!logo.imageUrl) {
      setLoadedImg(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => setLoadedImg(img);
    img.src = logo.imageUrl;
  }, [logo.imageUrl]);

  // Render live cropped & background-removed preview onto the preview canvas
  useEffect(() => {
    if (!isOpen || !loadedImg || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const processed = getProcessedLogoCanvas(loadedImg, logo);
    const size = 200;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);
    const aspect = processed.width / processed.height;
    const maxDim = size * 0.82;
    const drawW = aspect >= 1 ? maxDim : maxDim * aspect;
    const drawH = aspect >= 1 ? maxDim / aspect : maxDim;

    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate(((logo.rotation || 0) * Math.PI) / 180);

    ctx.beginPath();
    if (logo.shapeMask === 'circle') {
      ctx.arc(0, 0, Math.min(drawW, drawH) / 2, 0, Math.PI * 2);
      ctx.clip();
    } else if (logo.shapeMask === 'rounded') {
      ctx.roundRect(-drawW / 2, -drawH / 2, drawW, drawH, 22);
      ctx.clip();
    } else if (logo.shapeMask === 'arch') {
      ctx.moveTo(-drawW / 2, drawH / 2);
      ctx.lineTo(-drawW / 2, -drawH * 0.1);
      ctx.quadraticCurveTo(-drawW / 2, -drawH / 2, 0, -drawH / 2);
      ctx.quadraticCurveTo(drawW / 2, -drawH / 2, drawW / 2, -drawH * 0.1);
      ctx.lineTo(drawW / 2, drawH / 2);
      ctx.closePath();
      ctx.clip();
    } else if (logo.shapeMask === 'Badge') {
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

    if (logo.borderWidth > 0) {
      ctx.strokeStyle = logo.borderColor;
      ctx.lineWidth = logo.borderWidth;
      ctx.stroke();
    }
    ctx.restore();
  }, [isOpen, loadedImg, logo]);

  if (!isOpen) return null;

  const resetCrop = () => {
    onChange({
      cropX: 0,
      cropY: 0,
      cropW: 1,
      cropH: 1,
      rotation: 0,
      shapeMask: 'none',
      featherAmount: 0,
      borderWidth: 0,
      glowBlur: 0,
      removeBg: 'none',
      removeBgTolerance: 32
    });
  };

  // Drag the yellow crop box directly with mouse/touch
  const handleCropPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingCrop(true);
    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      cropX: logo.cropX,
      cropY: logo.cropY
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleCropPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingCrop || !dragStartRef.current || !cropContainerRef.current) return;
    const rect = cropContainerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const dx = (e.clientX - dragStartRef.current.clientX) / rect.width;
    const dy = (e.clientY - dragStartRef.current.clientY) / rect.height;

    const nextX = Math.max(0, Math.min(1 - logo.cropW, Math.round((dragStartRef.current.cropX + dx) * 100) / 100));
    const nextY = Math.max(0, Math.min(1 - logo.cropH, Math.round((dragStartRef.current.cropY + dy) * 100) / 100));
    onChange({ cropX: nextX, cropY: nextY });
  };

  const handleCropPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingCrop) {
      setIsDraggingCrop(false);
      dragStartRef.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <Crop className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                লোগো অটো ব্যাকগ্রাউন্ড রিমুভ, সহজ ক্রপ ও ছোবড় স্টুডিও
              </h3>
              <p className="text-[11px] text-slate-400">
                ১-ক্লিকে লোগোর ব্যাকগ্রাউন্ড মুছুন, ক্রপ করুন এবং কার্ডের উপরে বা নিচে বসান
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Top Visual Dual Preview: Interactive Crop on Left + Live Transparent Output on Right */}
          {logo.imageUrl ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left: Interactive Drag Crop Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-slate-300 mb-2">
                  ১. মূল ছবি ও ক্রপ এরিয়া (ড্র্যাগ করে সরান)
                </span>
                <div
                  ref={cropContainerRef}
                  className="relative inline-block max-h-44 overflow-hidden rounded border border-slate-700 select-none"
                >
                  <img
                    src={logo.imageUrl}
                    alt="Uploaded Logo Preview"
                    referrerPolicy="no-referrer"
                    className="max-h-44 w-auto object-contain block opacity-45 pointer-events-none"
                  />
                  {/* Draggable Highlighted Crop Region */}
                  <div
                    onPointerDown={handleCropPointerDown}
                    onPointerMove={handleCropPointerMove}
                    onPointerUp={handleCropPointerUp}
                    style={{
                      left: `${logo.cropX * 100}%`,
                      top: `${logo.cropY * 100}%`,
                      width: `${logo.cropW * 100}%`,
                      height: `${logo.cropH * 100}%`,
                      touchAction: 'none'
                    }}
                    className="absolute border-2 border-amber-400 bg-amber-400/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] cursor-move flex items-center justify-center"
                  >
                    <span className="px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] text-amber-300 font-medium pointer-events-none">
                      ড্র্যাগ করুন
                    </span>
                  </div>
                </div>

                {/* Quick 1-Click Crop Presets */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                  <button
                    onClick={() => onChange({ cropX: 0, cropY: 0, cropW: 1, cropH: 1 })}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 border border-slate-700"
                  >
                    সম্পূর্ণ ছবি (100%)
                  </button>
                  <button
                    onClick={() => onChange({ cropX: 0.1, cropY: 0.1, cropW: 0.8, cropH: 0.8 })}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-amber-300 border border-slate-700"
                  >
                    মাঝখানে ক্রপ (80%)
                  </button>
                  <button
                    onClick={() => onChange({ cropX: 0.18, cropY: 0.18, cropW: 0.64, cropH: 0.64 })}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-slate-200 border border-slate-700"
                  >
                    ক্লোজ-আপ (64%)
                  </button>
                  <button
                    onClick={() =>
                      onChange({
                        cropX: 0.1,
                        cropY: 0.1,
                        cropW: 0.8,
                        cropH: 0.8,
                        shapeMask: 'circle'
                      })
                    }
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-emerald-300 border border-slate-700"
                  >
                    গোল প্রোফাইল ক্রপ
                  </button>
                </div>
              </div>

              {/* Right: Live Processed Output on Checkerboard Grid */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-emerald-400 mb-2">
                  ২. লাইভ আউটপুট (ব্যাকগ্রাউন্ড রিমুভ ও ক্রপের পর)
                </span>
                <div
                  style={{
                    backgroundImage:
                      'linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0'
                  }}
                  className="w-44 h-44 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden bg-slate-900"
                >
                  <canvas ref={previewCanvasRef} className="w-40 h-40 object-contain" />
                </div>
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  চেকবোর্ড অংশটি স্বচ্ছ (Transparent) থাকবে
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center space-y-3">
              <p className="text-sm text-slate-300">
                কাস্টম ছবি লোগো ক্রপ ও ব্যাকগ্রাউন্ড রিমুভ করতে প্রথমে আপনার লোগো ছবি আপলোড করুন:
              </p>
              {onUploadLogo && (
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>গ্যালারি থেকে লোগো ছবি আপলোড করুন</span>
                  <input type="file" accept="image/*" onChange={onUploadLogo} className="hidden" />
                </label>
              )}
            </div>
          )}

          {/* 1-CLICK AUTOMATIC BACKGROUND REMOVER SECTION */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  লোগোর ব্যাকগ্রাউন্ড অটো রিমুভাল (Auto Background Remover)
                </span>
              </div>
              {logo.removeBg !== 'none' && (
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ব্যাকগ্রাউন্ড রিমুভ চালু আছে
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'auto', label: '✨ অটো রিমুভ (১-ক্লিক)' },
                { id: 'white', label: 'সাদা ব্যাকগ্রাউন্ড মুছুন' },
                { id: 'dark', label: 'কালো ব্যাকগ্রাউন্ড মুছুন' },
                { id: 'custom', label: 'পছন্দের রঙ মুছুন' },
                { id: 'none', label: 'রিমুভ বন্ধ (অরিজিনাল)' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onChange({ removeBg: m.id as LogoSettings['removeBg'] })}
                  className={`px-2.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    logo.removeBg === m.id
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                      : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {logo.removeBg !== 'none' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center pt-1">
                {logo.removeBg === 'custom' && (
                  <div className="sm:col-span-4 flex items-center gap-2">
                    <span className="text-xs text-slate-300">ব্যাকগ্রাউন্ড রঙ:</span>
                    <input
                      type="color"
                      value={logo.removeBgCustomColor || '#ffffff'}
                      onChange={(e) => onChange({ removeBgCustomColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent border border-slate-700"
                    />
                  </div>
                )}
                <div className={logo.removeBg === 'custom' ? 'sm:col-span-8' : 'sm:col-span-12'}>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>নিখুঁত রিমুভ পাওয়ার (Sensitivity Slider)</span>
                    <span className="tabular-nums text-emerald-400 font-semibold">
                      {logo.removeBgTolerance}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={85}
                    value={logo.removeBgTolerance}
                    onChange={(e) => onChange({ removeBgTolerance: parseInt(e.target.value, 10) })}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Quick Top / Bottom Logo Placement Buttons */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <label className="block text-xs font-semibold text-slate-200">
              কার্ডে লোগো উপরে বা নিচে বসানোর কুইক অপশন:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => onChange({ x: 50, y: 10 })}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>উপরে মাঝখানে</span>
              </button>
              <button
                onClick={() => onChange({ x: 50, y: 92 })}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              >
                <ArrowDown className="w-3.5 h-3.5" />
                <span>নিচে মাঝখানে</span>
              </button>
              <button
                onClick={() => onChange({ x: 20, y: 10 })}
                className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
              >
                উপরে বামে
              </button>
              <button
                onClick={() => onChange({ x: 80, y: 10 })}
                className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
              >
                উপরে ডানে
              </button>
            </div>
          </div>

          {/* Shape Mask & "ছোবড়" (Feather/Brush Soft Edge) */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              লোগো শেপ ও ছোবড় স্টাইল (Shape & Feathered Soft Edge)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { id: 'none', label: 'স্বাভাবিক' },
                { id: 'feather', label: 'ছোবড় (Soft)' },
                { id: 'circle', label: 'বৃত্তাকার' },
                { id: 'rounded', label: 'রাউন্ডেড' },
                { id: 'arch', label: 'মেহরাব আর্চ' },
                { id: 'Badge', label: 'অষ্টভুজ ব্যাজ' }
              ].map((sh) => (
                <button
                  key={sh.id}
                  onClick={() =>
                    onChange({
                      shapeMask: sh.id as LogoSettings['shapeMask'],
                      featherAmount:
                        sh.id === 'feather' ? Math.max(logo.featherAmount, 28) : logo.featherAmount
                    })
                  }
                  className={`px-2.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                    logo.shapeMask === sh.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-800/70 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {sh.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fine Crop Sliders + Feather & Border */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>ক্রপ চওড়া (Crop Width)</span>
                <span className="tabular-nums text-amber-400">{Math.round(logo.cropW * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={1 - logo.cropX}
                step={0.01}
                value={logo.cropW}
                onChange={(e) => onChange({ cropW: parseFloat(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>ক্রপ উচ্চতা (Crop Height)</span>
                <span className="tabular-nums text-amber-400">{Math.round(logo.cropH * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.2}
                max={1 - logo.cropY}
                step={0.01}
                value={logo.cropH}
                onChange={(e) => onChange({ cropH: parseFloat(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>ছোবড় / সফট এজ (Feather Brush)</span>
                <span className="tabular-nums text-amber-400">{logo.featherAmount}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={45}
                value={logo.featherAmount}
                onChange={(e) => onChange({ featherAmount: parseInt(e.target.value, 10) })}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>বর্ডার ও শ্যাডো গ্লো</span>
                <span className="tabular-nums text-amber-400">{logo.borderWidth}px</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={14}
                  value={logo.borderWidth}
                  onChange={(e) => onChange({ borderWidth: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-amber-500"
                />
                <input
                  type="color"
                  value={logo.borderColor}
                  onChange={(e) => onChange({ borderColor: e.target.value })}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={resetCrop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিসেট করুন</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>সেভ ও সম্পন্ন করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};

