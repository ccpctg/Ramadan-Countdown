import React, { useState } from 'react';
import { X, Search, Check, Sparkles } from 'lucide-react';
import { THEMES_97, ThemePreset, toBengaliNumber } from '../data/ramadanData';

interface ThemesGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId: number;
  onSelectTheme: (theme: ThemePreset, syncDayWithTheme: boolean) => void;
}

export const ThemesGalleryModal: React.FC<ThemesGalleryModalProps> = ({
  isOpen,
  onClose,
  activeThemeId,
  onSelectTheme
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [syncDay, setSyncDay] = useState<boolean>(true);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'সব ৯৭টি থিম' },
    { id: 'reference', label: 'রেফারেন্স থিম (১–৭)' },
    { id: 'mosque', label: 'মসজিদ ও মিনার' },
    { id: 'lantern', label: 'ফানুস ও আলো' },
    { id: 'arch', label: 'মেহরাব ও আর্চ' },
    { id: 'crescent', label: 'চাঁদ ও নক্ষত্র' },
    { id: 'minimal', label: 'শুভ্র ও পেপার আর্ট' },
    { id: 'royal', label: 'রাজকীয় সোনালী' }
  ];

  const filteredThemes = THEMES_97.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCat;
    return (
      matchesCat &&
      (t.nameBn.toLowerCase().includes(q) ||
        String(t.day).includes(q) ||
        toBengaliNumber(t.day).includes(q) ||
        String(t.id).includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl rounded-xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">
              ৯৭ দিনের ৯৭টি ইউনিক থিম গ্যালারি
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={syncDay}
                onChange={(e) => setSyncDay(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span>থিমের সাথে দিন সংখ্যাও পরিবর্তন করুন (৯৭ → ১)</span>
            </label>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="px-6 py-3.5 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দিন (যেমন 97 বা ৯৭) বা নাম খুঁজুন..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Grid of 97 Themes */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 flex-1">
          {filteredThemes.map((theme) => {
            const isSelected = theme.id === activeThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme, syncDay);
                  onClose();
                }}
                className={`group relative rounded-xl overflow-hidden border text-left transition-all flex flex-col ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
              >
                {/* Visual Thumbnail */}
                <div
                  style={{
                    background: `linear-gradient(155deg, ${theme.skyColors[0]} 0%, ${theme.skyColors[1]} 55%, ${theme.skyColors[2]} 100%)`
                  }}
                  className="relative h-36 w-full overflow-hidden flex flex-col items-center justify-center p-3"
                >
                  {theme.bgImageUrl && (
                    <img
                      src={theme.bgImageUrl}
                      alt={theme.nameBn}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <span
                      style={{ color: theme.textColor }}
                      className="text-[10px] tracking-wider uppercase font-bold opacity-85 drop-shadow"
                    >
                      RAMADHAN
                    </span>
                    <span
                      style={{ color: theme.numberColor }}
                      className="text-3xl font-black leading-none mt-0.5 tabular-nums drop-shadow-md"
                    >
                      {theme.day}
                    </span>
                    <span
                      style={{ color: theme.subTextColor }}
                      className="text-[10px] mt-0.5 opacity-90 drop-shadow"
                    >
                      days to left
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Theme Info */}
                <div className="p-2.5 bg-slate-900 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-medium text-slate-200 line-clamp-1">
                    {theme.nameBn}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 tabular-nums">
                    দিন {toBengaliNumber(theme.day)} ({theme.day} Days) · থিম #{toBengaliNumber(theme.id)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
