import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Download,
  Calendar,
  Sparkles,
  Type,
  Image as ImageIcon,
  Crop,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  BookOpen,
  Check,
  Upload,
  Undo2,
  Redo2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Copy,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Layers,
  RotateCcw,
  Star,
  MessageSquare
} from 'lucide-react';
import {
  THEMES_97,
  DEMO_DUAS,
  DAILY_QUOTES_97,
  FONT_OPTIONS,
  FontOption,
  ThemePreset,
  toBengaliNumber
} from './data/ramadanData';
import {
  CardConfig,
  DEFAULT_PIXELLAB_STYLE,
  HitBox,
  ISLAMIC_ICON_OPTIONS,
  MunajatStyle,
  PixelLabTextStyle,
  renderCardToCanvas
} from './utils/cardRenderer';
import { LogoCropModal } from './components/LogoCropModal';
import { ThemesGalleryModal } from './components/ThemesGalleryModal';
import { ContactFeedbackModal } from './components/ContactFeedbackModal';

const STORAGE_KEY_AUTO_DATE = 'ramadan_97_campaign_start_iso';
const STORAGE_KEY_AUTO_ENABLED = 'ramadan_97_auto_decrement_enabled';

function getDefaultConfigForReference1(): CardConfig {
  const theme1 = THEMES_97[0];
  return {
    day: 97,
    useBengaliDigits: false,
    aspectRatio: '4:5',
    themeId: 1,
    customBgUrl: null,
    useRawRef1Photo: false,
    bgBrightness: 100,
    bgContrast: 100,
    bgBlur: 0,
    bgVignette: 18,
    bgOverlayColor: '#000000',
    bgOverlayOpacity: 0,
    bgZoom: 1,
    bgPanX: 0,
    bgPanY: 0,
    showStars: true,
    showGoldenFrame: false,

    // Generous gap between Munajat hands (79.5%) and Bottom Quote (92.5%)
    showPrayingHands: true,
    handsLocked: false,
    handsStyle: 'ref1_line',
    handsColor1: '#f97316',
    handsColor2: '#fde047',
    handsX: 50,
    handsY: 79.5,
    handsScale: 0.85,
    handsRotation: 0,

    scriptText: 'Counting down to',
    scriptFont: "'Great Vibes', cursive",
    scriptSize: 92,
    scriptColor: '#ffffff',
    scriptX: 51,
    scriptY: 22,
    scriptStyle: { ...DEFAULT_PIXELLAB_STYLE, shadowBlur: 10, shadowOpacity: 0.7 },

    titleText: 'RAMADHAN',
    titleFont: "'Montserrat', sans-serif",
    titleSize: 94,
    titleColor: '#ffffff',
    titleX: 51,
    titleY: 28,
    showSwishUnderline: true,
    titleStyle: { ...DEFAULT_PIXELLAB_STYLE, bold: true, shadowBlur: 16, shadowOpacity: 0.75 },

    numberFont: "'Montserrat', sans-serif",
    numberSize: 320,
    numberColor: '#ffffff',
    numberX: 59,
    numberY: 47.5,
    numberShadow: true,
    numberStyle: {
      ...DEFAULT_PIXELLAB_STYLE,
      bold: true,
      shadowBlur: 28,
      shadowOpacity: 0.65,
      shadowOffsetY: 8,
      lineHeight: 0.9
    },

    daysLabelText: 'days to left',
    daysLabelFont: "'Plus Jakarta Sans', sans-serif",
    daysLabelSize: 42,
    daysLabelColor: '#f1f5f9',
    daysLabelX: 69.5,
    daysLabelY: 60.5,
    daysLabelStyle: { ...DEFAULT_PIXELLAB_STYLE, shadowBlur: 10, shadowOpacity: 0.7 },

    showDua: false,
    duaArabicText: DEMO_DUAS[0].arabic,
    duaMeaningText: DEMO_DUAS[0].meaningBn,
    showDuaMeaning: true,
    duaFont: "'Amiri', serif",
    duaSize: 34,
    duaColor: '#fde68a',
    duaX: 50,
    duaY: 69,
    duaBoxWidth: 84,
    duaBgPill: true,
    duaStyle: { ...DEFAULT_PIXELLAB_STYLE, shadowBlur: 12, shadowOpacity: 0.8 },

    quoteText: 'পবিত্র মাসকে স্বাগত জানাতে নিজেকে\nপ্রস্তুত করুন, মনকে গুছিয়ে নিন',
    quoteFont: "'Hind Siliguri', sans-serif",
    quoteSize: 38,
    quoteColor: theme1.quoteColor,
    quoteX: 50,
    quoteY: 92.5,
    quoteStyle: { ...DEFAULT_PIXELLAB_STYLE, shadowBlur: 12, shadowOpacity: 0.85 },

    logo: {
      enabled: true,
      locked: false,
      mode: 'default_ccp',
      customTextMain: 'Creative CONCEPT Point',
      customTextSub: 'Your Vision • Our Creativity',
      imageUrl: null,
      x: 50,
      y: 10,
      scale: 0.92,
      opacity: 1,
      cropX: 0,
      cropY: 0,
      cropW: 1,
      cropH: 1,
      rotation: 0,
      shapeMask: 'none',
      featherAmount: 0,
      borderWidth: 0,
      borderColor: '#fbbf24',
      glowColor: '#000000',
      glowBlur: 0,
      removeBg: 'none',
      removeBgTolerance: 32
    },

    extraTexts: []
  };
}

export default function App() {
  const [config, setConfig] = useState<CardConfig>(getDefaultConfigForReference1);
  const [historyPast, setHistoryPast] = useState<CardConfig[]>([]);
  const [historyFuture, setHistoryFuture] = useState<CardConfig[]>([]);
  const configRef = useRef<CardConfig>(config);
  configRef.current = config;

  const [activeTab, setActiveTab] = useState<'days' | 'text' | 'dua' | 'logo' | 'bg' | 'layers'>('days');
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>('quote');
  const [showSelectionBox, setShowSelectionBox] = useState<boolean>(true);
  const [snapGuides, setSnapGuides] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });
  const [customFonts, setCustomFonts] = useState<FontOption[]>([]);
  const [fontsReadyTick, setFontsReadyTick] = useState<number>(0);

  const [autoDecrement, setAutoDecrement] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_AUTO_ENABLED);
    return saved !== null ? saved === 'true' : true;
  });
  const [campaignStartIso, setCampaignStartIso] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_AUTO_DATE);
    if (saved) return saved;
    const todayIso = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEY_AUTO_DATE, todayIso);
    return todayIso;
  });
  const [autoSyncThemeOnDayChange, setAutoSyncThemeOnDayChange] = useState<boolean>(true);
  const [autoSyncQuoteOnDayChange, setAutoSyncQuoteOnDayChange] = useState<boolean>(false);

  const [isLogoCropOpen, setIsLogoCropOpen] = useState<boolean>(false);
  const [isThemesModalOpen, setIsThemesModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, HTMLImageElement>>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hitBoxesRef = useRef<HitBox[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const lastHistoryPushTimeRef = useRef<number>(0);

  const draggingLayerRef = useRef<{
    id: string;
    startMouseX: number;
    startMouseY: number;
    startLayerX: number;
    startLayerY: number;
    initialConfigSnapshot: CardConfig;
    moved: boolean;
  } | null>(null);

  const activeTheme = THEMES_97.find((t) => t.id === config.themeId) || THEMES_97[0];
  const allFontOptions = [...customFonts, ...FONT_OPTIONS];

  // Fast, throttled Undo History commit (never blocks slider dragging or causes lag!)
  const updateConfigWithHistory = useCallback(
    (updater: CardConfig | ((prev: CardConfig) => CardConfig), forceSnapshot = false) => {
      const now = performance.now();
      const shouldPushSnapshot = forceSnapshot || now - lastHistoryPushTimeRef.current > 450;
      if (shouldPushSnapshot) {
        lastHistoryPushTimeRef.current = now;
        const snapshot = configRef.current;
        setHistoryPast((past) => [...past.slice(-29), snapshot]);
        setHistoryFuture([]);
      }
      setConfig((prev) => (typeof updater === 'function' ? updater(prev) : updater));
    },
    []
  );

  const handleUndo = useCallback(() => {
    setHistoryPast((past) => {
      if (past.length === 0) return past;
      const previous = past[past.length - 1];
      setHistoryFuture((future) => [configRef.current, ...future.slice(0, 29)]);
      setConfig(previous);
      return past.slice(0, -1);
    });
  }, []);

  const handleRedo = useCallback(() => {
    setHistoryFuture((future) => {
      if (future.length === 0) return future;
      const next = future[0];
      setHistoryPast((past) => [...past.slice(-29), configRef.current]);
      setConfig(next);
      return future.slice(1);
    });
  }, []);

  // Keyboard shortcuts for Undo (Ctrl+Z), Redo (Ctrl+Y), and Delete (Delete/Backspace)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT')
      ) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleUndo, handleRedo]);

  // Listen once for initial Google Fonts load
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsReadyTick((t) => t + 1);
      });
    }
  }, []);

  // Preload reference images & custom uploaded images
  const ensureImageLoaded = useCallback((url: string) => {
    if (!url) return;
    setLoadedImages((prev) => {
      if (prev[url]) return prev;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setLoadedImages((current) => ({ ...current, [url]: img }));
      };
      img.src = url;
      return prev;
    });
  }, []);

  useEffect(() => {
    const urlsToPreload = [
      '/assets/aistudio/1793610161444_1a8cdd53.jpg',
      '/assets/aistudio/ae31d7e5aaa483c4cda89c53f62f9fd7_4e5056e4.jpg',
      '/assets/aistudio/e17640942b1b2b2c032f2f2a143fca93_a870084f.jpg',
      '/assets/aistudio/f09f649f864afc278aee0c0e78b694c3_11a30445.jpg',
      '/assets/aistudio/12e3ca5c5fab55b0dbe03f71471ed59b_612107a1.jpg',
      '/assets/aistudio/360f62fe1f4768761491f7dca662a1f5_c4acaaaf.jpg',
      '/assets/aistudio/712fea8964b14995b0375943fabdeebf_9c87caf2.jpg'
    ];
    urlsToPreload.forEach(ensureImageLoaded);
  }, [ensureImageLoaded]);

  useEffect(() => {
    if (config.customBgUrl) ensureImageLoaded(config.customBgUrl);
    if (config.logo.imageUrl) ensureImageLoaded(config.logo.imageUrl);
    if (activeTheme.bgImageUrl) ensureImageLoaded(activeTheme.bgImageUrl);
  }, [config.customBgUrl, config.logo.imageUrl, activeTheme.bgImageUrl, ensureImageLoaded]);

  // Apply theme preset cleanly
  const applyThemePreset = useCallback(
    (theme: ThemePreset, newDay?: number, recordHistory = true) => {
      const updater = (prev: CardConfig): CardConfig => {
        const updatedDay = newDay !== undefined ? newDay : prev.day;
        const isRef1 = theme.id === 1;
        const quoteIdx = (97 - updatedDay) % DAILY_QUOTES_97.length;
        const nextQuote =
          autoSyncQuoteOnDayChange && updatedDay !== 97
            ? DAILY_QUOTES_97[quoteIdx]
            : prev.quoteText;

        return {
          ...prev,
          day: updatedDay,
          themeId: theme.id,
          customBgUrl: null,
          scriptColor: theme.textColor,
          titleColor: theme.textColor,
          numberColor: theme.numberColor,
          daysLabelColor: theme.subTextColor,
          duaColor: theme.duaColor,
          quoteColor: theme.quoteColor,
          handsColor2: theme.accentColor,
          scriptX: theme.headerX,
          titleX: theme.headerX,
          numberX: theme.numberX,
          numberY: theme.numberY,
          daysLabelX: isRef1 ? 69.5 : Math.min(82, theme.numberX + 10),
          daysLabelY: theme.numberY + 13,
          duaX: theme.duaX,
          duaY: theme.duaY,
          handsX: theme.quoteX,
          handsY: 79.5,
          quoteX: theme.quoteX,
          quoteY: theme.quoteY,
          quoteText: nextQuote
        };
      };

      if (recordHistory) updateConfigWithHistory(updater, true);
      else setConfig(updater);
    },
    [autoSyncQuoteOnDayChange, updateConfigWithHistory]
  );

  const handleDayChange = useCallback(
    (nextDay: number, isManual = true) => {
      const clamped = Math.max(1, Math.min(97, nextDay));
      if (autoSyncThemeOnDayChange) {
        const matchingTheme =
          THEMES_97.find((t) => t.day === clamped) || THEMES_97[97 - clamped] || THEMES_97[0];
        applyThemePreset(matchingTheme, clamped, isManual);
      } else {
        const updater = (prev: CardConfig): CardConfig => {
          const quoteIdx = (97 - clamped) % DAILY_QUOTES_97.length;
          return {
            ...prev,
            day: clamped,
            quoteText: autoSyncQuoteOnDayChange ? DAILY_QUOTES_97[quoteIdx] : prev.quoteText
          };
        };
        if (isManual) updateConfigWithHistory(updater, true);
        else setConfig(updater);
      }

      if (isManual && autoDecrement) {
        const today = new Date();
        const offsetDays = 97 - clamped;
        const adjustedStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - offsetDays
        );
        const iso = adjustedStart.toISOString().split('T')[0];
        setCampaignStartIso(iso);
      }
    },
    [
      autoSyncThemeOnDayChange,
      autoSyncQuoteOnDayChange,
      autoDecrement,
      applyThemePreset,
      updateConfigWithHistory
    ]
  );

  // Automatic daily countdown check
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_AUTO_ENABLED, String(autoDecrement));
    localStorage.setItem(STORAGE_KEY_AUTO_DATE, campaignStartIso);

    if (!autoDecrement) return;

    const computeAutoDay = () => {
      const start = new Date(campaignStartIso + 'T00:00:00');
      const now = new Date();
      const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffDays = Math.floor(
        (todayMidnight.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      const calculatedDay = Math.max(1, Math.min(97, 97 - diffDays));
      handleDayChange(calculatedDay, false);
    };

    computeAutoDay();
    const timer = setInterval(computeAutoDay, 60 * 1000);
    return () => clearInterval(timer);
  }, [autoDecrement, campaignStartIso, handleDayChange]);

  // 60FPS Coalesced Canvas Render via requestAnimationFrame
  useEffect(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      hitBoxesRef.current = renderCardToCanvas(canvas, config, activeTheme, loadedImages, {
        selectedLayerId: showSelectionBox ? selectedLayerId : null,
        isExporting: false,
        snapGuideX: snapGuides.x,
        snapGuideY: snapGuides.y
      });
    });
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [config, activeTheme, loadedImages, selectedLayerId, showSelectionBox, snapGuides, fontsReadyTick]);

  // Direct Canvas Pointer Dragging
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const getLayerPositionPercent = (layerId: string): { x: number; y: number } => {
    switch (layerId) {
      case 'logo':
        return { x: config.logo.x, y: config.logo.y };
      case 'script':
        return { x: config.scriptX, y: config.scriptY };
      case 'title':
        return { x: config.titleX, y: config.titleY };
      case 'number':
        return { x: config.numberX, y: config.numberY };
      case 'daysLabel':
        return { x: config.daysLabelX, y: config.daysLabelY };
      case 'dua':
        return { x: config.duaX, y: config.duaY };
      case 'hands':
        return { x: config.handsX, y: config.handsY };
      case 'quote':
        return { x: config.quoteX, y: config.quoteY };
      default: {
        const extra = config.extraTexts.find((t) => t.id === layerId);
        return extra ? { x: extra.x, y: extra.y } : { x: 50, y: 50 };
      }
    }
  };

  const updateLayerPositionPercent = (
    layerId: string,
    newX: number,
    newY: number,
    recordInHistory = false
  ) => {
    let cx = Math.max(2, Math.min(98, Math.round(newX * 10) / 10));
    let cy = Math.max(2, Math.min(98, Math.round(newY * 10) / 10));

    const snapX = Math.abs(cx - 50) < 1.1;
    const snapY = Math.abs(cy - 50) < 1.1;
    if (snapX && !recordInHistory) cx = 50;
    if (snapY && !recordInHistory) cy = 50;
    setSnapGuides({ x: snapX && !recordInHistory, y: snapY && !recordInHistory });

    const updater = (prev: CardConfig): CardConfig => {
      switch (layerId) {
        case 'logo':
          return { ...prev, logo: { ...prev.logo, x: cx, y: cy } };
        case 'script':
          return { ...prev, scriptX: cx, scriptY: cy };
        case 'title':
          return { ...prev, titleX: cx, titleY: cy };
        case 'number':
          return { ...prev, numberX: cx, numberY: cy };
        case 'daysLabel':
          return { ...prev, daysLabelX: cx, daysLabelY: cy };
        case 'dua':
          return { ...prev, duaX: cx, duaY: cy };
        case 'hands':
          return { ...prev, handsX: cx, handsY: cy };
        case 'quote':
          return { ...prev, quoteX: cx, quoteY: cy };
        default:
          return {
            ...prev,
            extraTexts: prev.extraTexts.map((t) =>
              t.id === layerId ? { ...t, x: cx, y: cy } : t
            )
          };
      }
    };

    if (recordInHistory) updateConfigWithHistory(updater, false);
    else setConfig(updater);
  };

  // Delete / Hide ANY Selected Layer with 1 click!
  const handleDeleteSelectedLayer = useCallback(() => {
    if (!selectedLayerId) return;
    updateConfigWithHistory((prev) => {
      switch (selectedLayerId) {
        case 'logo':
          return { ...prev, logo: { ...prev.logo, enabled: false } };
        case 'script':
          return {
            ...prev,
            scriptStyle: { ...DEFAULT_PIXELLAB_STYLE, ...prev.scriptStyle, visible: false }
          };
        case 'title':
          return {
            ...prev,
            titleStyle: { ...DEFAULT_PIXELLAB_STYLE, ...prev.titleStyle, visible: false }
          };
        case 'number':
          return {
            ...prev,
            numberStyle: { ...DEFAULT_PIXELLAB_STYLE, ...prev.numberStyle, visible: false }
          };
        case 'daysLabel':
          return {
            ...prev,
            daysLabelStyle: { ...DEFAULT_PIXELLAB_STYLE, ...prev.daysLabelStyle, visible: false }
          };
        case 'dua':
          return { ...prev, showDua: false };
        case 'hands':
          return { ...prev, showPrayingHands: false };
        case 'quote':
          return {
            ...prev,
            quoteStyle: { ...DEFAULT_PIXELLAB_STYLE, ...prev.quoteStyle, visible: false }
          };
        default:
          return {
            ...prev,
            extraTexts: prev.extraTexts.filter((t) => t.id !== selectedLayerId)
          };
      }
    }, true);
    setSelectedLayerId(null);
  }, [selectedLayerId, updateConfigWithHistory]);

  // Adjust selected layer size quickly from mobile bar
  const handleQuickResizeSelected = (delta: number) => {
    if (!selectedLayerId) return;
    updateConfigWithHistory((prev) => {
      switch (selectedLayerId) {
        case 'logo':
          return {
            ...prev,
            logo: {
              ...prev.logo,
              scale: Math.max(0.25, Math.min(2.5, Math.round((prev.logo.scale + delta * 0.03) * 100) / 100))
            }
          };
        case 'hands':
          return {
            ...prev,
            handsScale: Math.max(0.3, Math.min(2.2, Math.round((prev.handsScale + delta * 0.03) * 100) / 100))
          };
        case 'script':
          return { ...prev, scriptSize: Math.max(24, Math.min(170, prev.scriptSize + delta)) };
        case 'title':
          return { ...prev, titleSize: Math.max(30, Math.min(170, prev.titleSize + delta)) };
        case 'number':
          return { ...prev, numberSize: Math.max(100, Math.min(480, prev.numberSize + delta * 3)) };
        case 'daysLabel':
          return { ...prev, daysLabelSize: Math.max(18, Math.min(100, prev.daysLabelSize + delta)) };
        case 'dua':
          return { ...prev, duaSize: Math.max(20, Math.min(72, prev.duaSize + delta)) };
        case 'quote':
          return { ...prev, quoteSize: Math.max(18, Math.min(86, prev.quoteSize + delta)) };
        default:
          return {
            ...prev,
            extraTexts: prev.extraTexts.map((t) =>
              t.id === selectedLayerId
                ? { ...t, fontSize: Math.max(16, Math.min(160, t.fontSize + delta)) }
                : t
            )
          };
      }
    });
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pt = getCanvasCoords(e);
    const boxes = [...hitBoxesRef.current].reverse();
    const hit = boxes.find(
      (b) => pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h
    );

    if (hit) {
      setSelectedLayerId(hit.id);
      if (hit.id === 'logo') setActiveTab('logo');
      else if (hit.id === 'dua' || hit.id === 'hands') setActiveTab('dua');
      else setActiveTab('text');

      if (hit.locked) return;

      const startPos = getLayerPositionPercent(hit.id);
      draggingLayerRef.current = {
        id: hit.id,
        startMouseX: pt.x,
        startMouseY: pt.y,
        startLayerX: startPos.x,
        startLayerY: startPos.y,
        initialConfigSnapshot: config,
        moved: false
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    } else {
      setSelectedLayerId(null);
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingLayerRef.current || !canvasRef.current) return;
    const pt = getCanvasCoords(e);
    const dxPercent =
      ((pt.x - draggingLayerRef.current.startMouseX) / canvasRef.current.width) * 100;
    const dyPercent =
      ((pt.y - draggingLayerRef.current.startMouseY) / canvasRef.current.height) * 100;

    if (Math.abs(dxPercent) > 0.2 || Math.abs(dyPercent) > 0.2) {
      draggingLayerRef.current.moved = true;
    }

    updateLayerPositionPercent(
      draggingLayerRef.current.id,
      draggingLayerRef.current.startLayerX + dxPercent,
      draggingLayerRef.current.startLayerY + dyPercent,
      false
    );
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggingLayerRef.current) {
      if (draggingLayerRef.current.moved) {
        const snapshot = draggingLayerRef.current.initialConfigSnapshot;
        setHistoryPast((past) => [...past.slice(-29), snapshot]);
        setHistoryFuture([]);
      }
      draggingLayerRef.current = null;
      setSnapGuides({ x: false, y: false });
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  // Custom Font Upload (.ttf / .otf / .woff)
  const handleCustomFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const buffer = await file.arrayBuffer();
      const rawName = file.name.replace(/\.(ttf|otf|woff2?)$/i, '');
      const cleanFamily = `CustomFont_${Date.now()}`;
      const fontFace = new FontFace(cleanFamily, buffer);
      const loadedFace = await fontFace.load();
      document.fonts.add(loadedFace);

      const newFontOption: FontOption = {
        id: cleanFamily,
        name: `কাস্টম ফন্ট: ${rawName}`,
        family: `'${cleanFamily}', 'Hind Siliguri', sans-serif`,
        script: 'bn'
      };
      setCustomFonts((prev) => [newFontOption, ...prev]);
      setFontsReadyTick((t) => t + 1);

      if (selectedLayerId === 'quote') {
        updateConfigWithHistory((p) => ({ ...p, quoteFont: newFontOption.family }), true);
      } else if (selectedLayerId === 'title') {
        updateConfigWithHistory((p) => ({ ...p, titleFont: newFontOption.family }), true);
      } else if (selectedLayerId === 'script') {
        updateConfigWithHistory((p) => ({ ...p, scriptFont: newFontOption.family }), true);
      } else if (selectedLayerId === 'number') {
        updateConfigWithHistory((p) => ({ ...p, numberFont: newFontOption.family }), true);
      } else if (selectedLayerId === 'daysLabel') {
        updateConfigWithHistory((p) => ({ ...p, daysLabelFont: newFontOption.family }), true);
      } else if (selectedLayerId?.startsWith('custom-')) {
        updateConfigWithHistory(
          (p) => ({
            ...p,
            extraTexts: p.extraTexts.map((t) =>
              t.id === selectedLayerId ? { ...t, fontFamily: newFontOption.family } : t
            )
          }),
          true
        );
      }
    } catch (err) {
      console.error('Failed to load custom font:', err);
    }
  };

  // File uploads for Logo & Custom Background
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      ensureImageLoaded(dataUrl);
      updateConfigWithHistory(
        (prev) => ({
          ...prev,
          logo: {
            ...prev.logo,
            enabled: true,
            mode: 'custom_image',
            imageUrl: dataUrl,
            cropX: 0,
            cropY: 0,
            cropW: 1,
            cropH: 1
          }
        }),
        true
      );
      setSelectedLayerId('logo');
    };
    reader.readAsDataURL(file);
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      ensureImageLoaded(dataUrl);
      updateConfigWithHistory(
        (prev) => ({
          ...prev,
          customBgUrl: dataUrl
        }),
        true
      );
    };
    reader.readAsDataURL(file);
  };

  // High-Resolution Image Download
  const handleDownloadCard = (format: 'png' | 'jpeg' = 'png') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    renderCardToCanvas(canvas, config, activeTheme, loadedImages, {
      isExporting: true
    });
    const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const dataUrl = canvas.toDataURL(mime, 0.96);
    const link = document.createElement('a');
    link.download = `ramadan-countdown-day-${config.day}-theme-${config.themeId}.${format}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    renderCardToCanvas(canvas, config, activeTheme, loadedImages, {
      selectedLayerId: showSelectionBox ? selectedLayerId : null,
      isExporting: false
    });
  };

  // Add Extra Custom Text Layer
  const handleAddCustomText = () => {
    const newId = `custom-${Date.now()}`;
    updateConfigWithHistory(
      (prev) => ({
        ...prev,
        extraTexts: [
          ...prev.extraTexts,
          {
            id: newId,
            text: 'নতুন বাংলা বা ইংরেজি লেখা',
            x: 50,
            y: 66,
            fontSize: 40,
            fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif",
            color: '#fde68a',
            align: 'center',
            bold: true,
            shadow: true,
            style: { ...DEFAULT_PIXELLAB_STYLE, bold: true }
          }
        ]
      }),
      true
    );
    setSelectedLayerId(newId);
    setActiveTab('text');
  };

  // Duplicate active text layer
  const handleDuplicateSelectedText = () => {
    if (!selectedLayerId) return;
    const newId = `custom-${Date.now()}`;
    if (selectedLayerId.startsWith('custom-')) {
      const orig = config.extraTexts.find((t) => t.id === selectedLayerId);
      if (!orig) return;
      updateConfigWithHistory(
        (p) => ({
          ...p,
          extraTexts: [
            ...p.extraTexts,
            { ...orig, id: newId, x: Math.min(90, orig.x + 4), y: Math.min(90, orig.y + 4) }
          ]
        }),
        true
      );
      setSelectedLayerId(newId);
    } else if (selectedLayerId === 'quote') {
      updateConfigWithHistory(
        (p) => ({
          ...p,
          extraTexts: [
            ...p.extraTexts,
            {
              id: newId,
              text: p.quoteText,
              x: 50,
              y: Math.max(15, p.quoteY - 8),
              fontSize: p.quoteSize,
              fontFamily: p.quoteFont,
              color: p.quoteColor,
              align: 'center',
              bold: true,
              shadow: true,
              style: { ...DEFAULT_PIXELLAB_STYLE, ...p.quoteStyle }
            }
          ]
        }),
        true
      );
      setSelectedLayerId(newId);
    }
  };

  const quickSwatches = [
    '#ffffff',
    '#fde047',
    '#fbbf24',
    '#f97316',
    '#38bdf8',
    '#67e8f9',
    '#34d399',
    '#f472b6',
    '#e2e8f0',
    '#0f2942'
  ];

  const activeLayerPos = selectedLayerId ? getLayerPositionPercent(selectedLayerId) : null;

  const getLayerDisplayName = (id: string | null) => {
    switch (id) {
      case 'logo':
        return 'লোগো (Logo)';
      case 'script':
        return 'Counting down to';
      case 'title':
        return 'RAMADHAN';
      case 'number':
        return `কাউন্টডাউন সংখ্যা (${config.day})`;
      case 'daysLabel':
        return 'days to left';
      case 'dua':
        return "আরবি দু'আ বক্স";
      case 'hands':
        return 'মোনাজাতের চিহ্ন';
      case 'quote':
        return 'নিচের বাংলা বাণী';
      default:
        return id?.startsWith('custom-') ? 'কাস্টম লেখা' : 'কোনো লেয়ার সিলেক্ট নেই';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Bar Contract: 3 Zones separated by gap-8 */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-30">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            updateConfigWithHistory(getDefaultConfigForReference1(), true);
          }}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          রমজান ৯৭ পিক্সেল স্টুডিও
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setIsThemesModalOpen(true)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            ৯৭টি থিম গ্যালারি
          </button>
          <button
            onClick={() => setActiveTab('dua')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            মোনাজাত ও ইসলামিক আইকন
          </button>
          <button
            onClick={() => setIsLogoCropOpen(true)}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            লোগো অটো রিমুভ ও ক্রপ
          </button>
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap shrink-0"
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>যোগাযোগ ও রেটিং (০১৮৮৬১০১৮২৪)</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleDownloadCard('png')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>এইচডি ডাউনলোড</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Container */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-[1440px] w-full mx-auto">
        {/* Right/Top on Mobile, Right on Desktop: Interactive Canvas + Mobile Quick Position Pad */}
        <section className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-between p-3 sm:p-5 bg-slate-950">
          {/* Top Canvas Utility Bar: Undo/Redo + Day Stepper + Custom BG + Export */}
          <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 mb-3">
            {/* Undo & Redo */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleUndo}
                disabled={historyPast.length === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-xs font-medium text-slate-200 transition-colors"
                title="আনডো (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                <span>আনডো</span>
              </button>
              <button
                onClick={handleRedo}
                disabled={historyFuture.length === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-xs font-medium text-slate-200 transition-colors"
                title="রিডো (Ctrl+Y)"
              >
                <Redo2 className="w-3.5 h-3.5 text-amber-400" />
                <span>রিডো</span>
              </button>
            </div>

            {/* Day Stepper */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleDayChange(config.day + 1, true)}
                disabled={config.day >= 97}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-200 tabular-nums px-1">
                দিন {toBengaliNumber(config.day)} / ৯৭
              </span>
              <button
                onClick={() => handleDayChange(config.day - 1, true)}
                disabled={config.day <= 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Upload Background & Download */}
            <div className="flex items-center gap-1.5">
              <label className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer border border-slate-700">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>ব্যাকগ্রাউন্ড</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomBgUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => handleDownloadCard('png')}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Card Canvas */}
          <div className="flex-1 flex items-center justify-center w-full my-auto py-1">
            <div className="relative group rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] border border-slate-800/90 bg-slate-900">
              <canvas
                ref={canvasRef}
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                style={{
                  maxHeight: '64vh',
                  maxWidth: '100%',
                  width: 'auto',
                  height: 'auto',
                  touchAction: 'none'
                }}
                className="block cursor-grab active:cursor-grabbing select-none"
              />
            </div>
          </div>

          {/* MOBILE-FRIENDLY FLOATING QUICK POSITION, ARROW PAD, SLIDER & DELETE BAR */}
          {/* Appears right below the canvas whenever a text/logo/icon is clicked on the card! */}
          {selectedLayerId && activeLayerPos ? (
            <div className="w-full max-w-2xl mt-3 p-3 rounded-xl bg-slate-900/95 border border-amber-500/40 shadow-lg space-y-2.5">
              {/* Top Row: Selected Layer Name + Size (-/+) + Center + Copy + Delete */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400">
                    সিলেক্টেড: {getLayerDisplayName(selectedLayerId)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => handleQuickResizeSelected(-2)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700"
                    title="সাইজ ছোট করুন"
                  >
                    সাইজ -
                  </button>
                  <button
                    onClick={() => handleQuickResizeSelected(2)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700"
                    title="সাইজ বড় করুন"
                  >
                    সাইজ +
                  </button>
                  <button
                    onClick={() =>
                      updateLayerPositionPercent(selectedLayerId, 50, activeLayerPos.y, true)
                    }
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-300 border border-slate-700"
                  >
                    মাঝখানে
                  </button>
                  {selectedLayerId === 'logo' && (
                    <>
                      <button
                        onClick={() =>
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, x: 50, y: 10 },
                              quoteY: p.quoteY < 86 ? 92.5 : p.quoteY,
                              handsY: p.handsY < 76 ? 79.5 : p.handsY
                            }),
                            true
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-semibold text-emerald-300"
                      >
                        উপরে বসান
                      </button>
                      <button
                        onClick={() =>
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, x: 50, y: 92.5 },
                              quoteY: p.quoteY > 86 ? 82 : p.quoteY,
                              handsY: p.handsY > 75 ? 71.5 : p.handsY
                            }),
                            true
                          )
                        }
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold text-amber-300"
                      >
                        নিচে বসান
                      </button>
                    </>
                  )}
                  {(selectedLayerId === 'quote' || selectedLayerId.startsWith('custom-')) && (
                    <button
                      onClick={handleDuplicateSelectedText}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি</span>
                    </button>
                  )}
                  <button
                    onClick={handleDeleteSelectedLayer}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-semibold text-rose-300"
                    title="ডিলিট / মুছে ফেলুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ডিলিট</span>
                  </button>
                </div>
              </div>

              {/* Second Row: 4-Way Touch Arrow Buttons + Direct X & Y Position Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                {/* 4-Way Touch Arrow Pad for easy mobile nudging */}
                <div className="sm:col-span-5 flex items-center justify-center gap-1.5 bg-slate-950/80 py-1.5 px-2 rounded-lg border border-slate-800">
                  <span className="text-[11px] text-slate-400 mr-1">পজিশন অ্যারো:</span>
                  <button
                    onClick={() =>
                      updateLayerPositionPercent(
                        selectedLayerId,
                        activeLayerPos.x - 1,
                        activeLayerPos.y,
                        true
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white active:scale-95 transition-all"
                    title="বামে সরান"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      updateLayerPositionPercent(
                        selectedLayerId,
                        activeLayerPos.x,
                        activeLayerPos.y - 1,
                        true
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white active:scale-95 transition-all"
                    title="উপরে সরান"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      updateLayerPositionPercent(
                        selectedLayerId,
                        activeLayerPos.x,
                        activeLayerPos.y + 1,
                        true
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white active:scale-95 transition-all"
                    title="নিচে সরান"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      updateLayerPositionPercent(
                        selectedLayerId,
                        activeLayerPos.x + 1,
                        activeLayerPos.y,
                        true
                      )
                    }
                    className="p-2 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-white active:scale-95 transition-all"
                    title="ডানে সরান"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct X and Y Sliders */}
                <div className="sm:col-span-7 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>বাম-ডান (X)</span>
                      <span className="tabular-nums text-amber-400">
                        {Math.round(activeLayerPos.x)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={98}
                      step={0.5}
                      value={activeLayerPos.x}
                      onChange={(e) =>
                        updateLayerPositionPercent(
                          selectedLayerId,
                          parseFloat(e.target.value),
                          activeLayerPos.y,
                          true
                        )
                      }
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300 mb-0.5">
                      <span>উপর-নিচ (Y)</span>
                      <span className="tabular-nums text-amber-400">
                        {Math.round(activeLayerPos.y)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={98}
                      step={0.5}
                      value={activeLayerPos.y}
                      onChange={(e) =>
                        updateLayerPositionPercent(
                          selectedLayerId,
                          activeLayerPos.x,
                          parseFloat(e.target.value),
                          true
                        )
                      }
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-2xl mt-3 px-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-center text-xs text-slate-400">
              পজিশন, সাইজ বা ডিলিট করার জন্য কার্ডের ওপর যেকোনো লেখায় বা আইকনে ক্লিক/ট্যাপ করুন
            </div>
          )}
        </section>

        {/* Left Control Sidebar (5 cols on lg) */}
        <aside className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5 border-r border-slate-800 bg-slate-900/60 flex flex-col lg:h-[calc(100vh-61px)] lg:sticky lg:top-[61px]">
          {/* Segmented Mode Tabs */}
          <div className="grid grid-cols-6 gap-1 p-2 bg-slate-950 border-b border-slate-800">
            {[
              { id: 'days', label: 'দিন ও থিম', icon: Calendar },
              { id: 'text', label: 'লেখা এডিট', icon: Type },
              { id: 'dua', label: 'মোনাজাত/দুয়া', icon: BookOpen },
              { id: 'logo', label: 'লোগো এডিট', icon: Crop },
              { id: 'bg', label: 'ব্যাকগ্রাউন্ড', icon: ImageIcon },
              { id: 'layers', label: 'লেয়ার/রিস্টোর', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Tab Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
            {/* TAB 1: DAYS, CUSTOM BG SHORTCUT & 97 THEMES */}
            {activeTab === 'days' && (
              <div className="space-y-5">
                {/* Countdown Day Control Card */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        রমজান কাউন্টডাউন (৯৭ দিন → ১ দিন)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        প্রতিদিন ১ দিন করে অটো কমবে অথবা নিজে সিলেক্ট করুন
                      </p>
                    </div>
                    <span className="text-2xl font-black text-amber-400 tabular-nums">
                      দিন {toBengaliNumber(config.day)} ({config.day})
                    </span>
                  </div>

                  {/* Stepper + Slider */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDayChange(config.day + 1, true)}
                      disabled={config.day >= 97}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-white whitespace-nowrap shrink-0"
                    >
                      +১ দিন
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={97}
                      value={config.day}
                      onChange={(e) => handleDayChange(parseInt(e.target.value, 10), true)}
                      className="flex-1 accent-amber-500 cursor-pointer"
                    />
                    <button
                      onClick={() => handleDayChange(config.day - 1, true)}
                      disabled={config.day <= 1}
                      className="px-3 py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 disabled:opacity-40 text-xs font-semibold text-amber-300 whitespace-nowrap shrink-0"
                    >
                      -১ দিন (পরের দিন)
                    </button>
                  </div>

                  {/* Quick Digit Language & Auto-Decrement Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80">
                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoDecrement}
                        onChange={(e) => setAutoDecrement(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>প্রতিদিন ১ দিন অটো কমবে</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.useBengaliDigits}
                        onChange={(e) =>
                          updateConfigWithHistory(
                            (prev) => ({
                              ...prev,
                              useBengaliDigits: e.target.checked,
                              daysLabelText: e.target.checked
                                ? prev.daysLabelText === 'days to left'
                                  ? 'দিন বাকি'
                                  : prev.daysLabelText
                                : prev.daysLabelText === 'দিন বাকি'
                                ? 'days to left'
                                : prev.daysLabelText
                            }),
                            true
                          )
                        }
                        className="rounded accent-amber-500"
                      />
                      <span>বাংলা সংখ্যায় দেখান ({toBengaliNumber(config.day)})</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSyncThemeOnDayChange}
                        onChange={(e) => setAutoSyncThemeOnDayChange(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>প্রতিদিন আলাদা ইউনিক থিম (৯৭টি)</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSyncQuoteOnDayChange}
                        onChange={(e) => setAutoSyncQuoteOnDayChange(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>দিন অনুযায়ী নতুন বাংলা বাণী</span>
                    </label>
                  </div>
                </div>

                {/* Quick Custom Background Upload Card */}
                <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      কাস্টম ব্যাকগ্রাউন্ড ছবি আপলোড
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      গ্যালারি থেকে যেকোনো ছবি ব্যাকগ্রাউন্ড হিসেবে যুক্ত করুন
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {config.customBgUrl && (
                      <button
                        onClick={() =>
                          updateConfigWithHistory((p) => ({ ...p, customBgUrl: null }), true)
                        }
                        className="px-2.5 py-2 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-medium"
                      >
                        রিমুভ
                      </button>
                    )}
                    <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" />
                      <span>ছবি আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomBgUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Reference Themes (1 to 9) Quick Selector */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-slate-300">
                      রেফারেন্স থিম ও ৯৭টি ইউনিক গ্রাফিক কার্ড
                    </h4>
                    <button
                      onClick={() => setIsThemesModalOpen(true)}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <span>সব ৯৭টি থিম দেখুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {THEMES_97.slice(0, 9).map((theme) => {
                      const selected = theme.id === config.themeId && !config.customBgUrl;
                      return (
                        <button
                          key={theme.id}
                          onClick={() =>
                            applyThemePreset(
                              theme,
                              autoSyncThemeOnDayChange ? theme.day : config.day,
                              true
                            )
                          }
                          className={`group relative rounded-lg overflow-hidden border text-left transition-all ${
                            selected
                              ? 'border-amber-400 ring-2 ring-amber-400/25'
                              : 'border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div
                            style={{
                              background: `linear-gradient(145deg, ${theme.skyColors[0]}, ${theme.skyColors[1]}, ${theme.skyColors[2]})`
                            }}
                            className="h-20 w-full relative flex items-center justify-center overflow-hidden"
                          >
                            {theme.bgImageUrl && (
                              <img
                                src={theme.bgImageUrl}
                                alt={theme.nameBn}
                                referrerPolicy="no-referrer"
                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                              />
                            )}
                            <span
                              style={{ color: theme.numberColor }}
                              className="relative z-10 text-xl font-black drop-shadow tabular-nums"
                            >
                              {theme.day}
                            </span>
                          </div>
                          <div className="p-2 bg-slate-950">
                            <p className="text-[11px] font-medium text-slate-200 truncate">
                              {theme.nameBn}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setIsThemesModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>৯৭ দিনের সম্পূর্ণ ৯৭টি ইউনিক থিম গ্যালারি খুলুন</span>
                  </button>
                </div>

                {/* Quick 97-to-1 Day Number Matrix */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-300">
                      যেকোনো দিন (৯৭ → ১) সরাসরি সিলেক্ট করুন:
                    </span>
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      বর্তমান থিম: #{config.themeId}
                    </span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 max-h-36 overflow-y-auto pr-1">
                    {Array.from({ length: 97 }, (_, idx) => 97 - idx).map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDayChange(d, true)}
                        className={`py-1.5 rounded text-xs font-semibold tabular-nums transition-colors ${
                          config.day === d
                            ? 'bg-amber-500 text-slate-950 font-bold'
                            : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/80'
                        }`}
                      >
                        {config.useBengaliDigits ? toBengaliNumber(d) : d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PIXELLAB-STYLE TEXT STUDIO */}
            {activeTab === 'text' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-300">
                    যেকোনো লেখা সিলেক্ট, এডিট বা ডিলিট করুন
                  </span>
                  <div className="flex items-center gap-1.5">
                    {selectedLayerId && (
                      <button
                        onClick={handleDeleteSelectedLayer}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-semibold"
                        title="সিলেক্ট করা লেয়ার ডিলিট করুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ডিলিট</span>
                      </button>
                    )}
                    <button
                      onClick={handleAddCustomText}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-semibold whitespace-nowrap shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>নতুন লেখা</span>
                    </button>
                  </div>
                </div>

                {/* Layer Selector Buttons */}
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {[
                    { id: 'quote', label: 'নিচের বাংলা বাণী' },
                    { id: 'number', label: `সংখ্যা (${config.day})` },
                    { id: 'title', label: 'RAMADHAN' },
                    { id: 'script', label: 'Counting down to' },
                    { id: 'daysLabel', label: 'days to left' },
                    ...config.extraTexts.map((t, i) => ({
                      id: t.id,
                      label: `কাস্টম লেখা #${i + 1}`
                    }))
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedLayerId(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        selectedLayerId === item.id
                          ? 'bg-amber-500 text-slate-950 font-semibold'
                          : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Custom Bengali Font Upload Bar */}
                <div className="px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-300">
                    ১০টি বাংলা ফন্ট আছে · নিজের `.ttf` / `.otf` ফন্ট যোগ করুন:
                  </span>
                  <label className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 border border-slate-700">
                    + ফন্ট আপলোড
                    <input
                      type="file"
                      accept=".ttf,.otf,.woff,.woff2"
                      onChange={handleCustomFontUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Selected Text Layer PixelLab Editor */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                  {/* 1. Script Layer */}
                  {selectedLayerId === 'script' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          উপরের ক্যালিগ্রাফি লেখা (Script Text)
                        </label>
                        <input
                          type="text"
                          value={config.scriptText}
                          onChange={(e) =>
                            updateConfigWithHistory({
                              ...config,
                              scriptText: e.target.value,
                              scriptStyle: {
                                ...DEFAULT_PIXELLAB_STYLE,
                                ...config.scriptStyle,
                                visible: true
                              }
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.scriptFont}
                        size={config.scriptSize}
                        minSize={30}
                        maxSize={160}
                        color={config.scriptColor}
                        x={config.scriptX}
                        y={config.scriptY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.scriptStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            scriptFont: u.font ?? p.scriptFont,
                            scriptSize: u.size ?? p.scriptSize,
                            scriptColor: u.color ?? p.scriptColor,
                            scriptX: u.x ?? p.scriptX,
                            scriptY: u.y ?? p.scriptY,
                            scriptStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.scriptStyle, ...u.style }
                              : p.scriptStyle
                          }))
                        }
                      />
                    </>
                  )}

                  {/* 2. Main Title Layer */}
                  {selectedLayerId === 'title' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          মূল শিরোনাম (Main Title)
                        </label>
                        <input
                          type="text"
                          value={config.titleText}
                          onChange={(e) =>
                            updateConfigWithHistory({
                              ...config,
                              titleText: e.target.value,
                              titleStyle: {
                                ...DEFAULT_PIXELLAB_STYLE,
                                ...config.titleStyle,
                                visible: true
                              }
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.showSwishUnderline}
                          onChange={(e) =>
                            updateConfigWithHistory({
                              ...config,
                              showSwishUnderline: e.target.checked
                            })
                          }
                          className="rounded accent-amber-500"
                        />
                        <span>১ম রেফারেন্সের মতো নিচে বাঁকা আর্টিস্টিক দাগ ও ডট দেখান</span>
                      </label>
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.titleFont}
                        size={config.titleSize}
                        minSize={40}
                        maxSize={160}
                        color={config.titleColor}
                        x={config.titleX}
                        y={config.titleY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.titleStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            titleFont: u.font ?? p.titleFont,
                            titleSize: u.size ?? p.titleSize,
                            titleColor: u.color ?? p.titleColor,
                            titleX: u.x ?? p.titleX,
                            titleY: u.y ?? p.titleY,
                            titleStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.titleStyle, ...u.style }
                              : p.titleStyle
                          }))
                        }
                      />
                    </>
                  )}

                  {/* 3. Countdown Number Layer */}
                  {(selectedLayerId === 'number' || !selectedLayerId) && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-300">
                          কাউন্টডাউন সংখ্যা:{' '}
                          <strong className="text-amber-400">
                            {config.useBengaliDigits ? toBengaliNumber(config.day) : config.day}
                          </strong>
                        </span>
                        <button
                          onClick={() =>
                            updateConfigWithHistory((p) => ({
                              ...p,
                              useBengaliDigits: !p.useBengaliDigits
                            }))
                          }
                          className="px-2.5 py-1 rounded bg-slate-800 text-xs text-amber-300 border border-slate-700"
                        >
                          {config.useBengaliDigits ? 'English (97) করুন' : 'বাংলা (৯৭) করুন'}
                        </button>
                      </div>
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.numberFont}
                        size={config.numberSize}
                        minSize={120}
                        maxSize={460}
                        color={config.numberColor}
                        x={config.numberX}
                        y={config.numberY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.numberStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            numberFont: u.font ?? p.numberFont,
                            numberSize: u.size ?? p.numberSize,
                            numberColor: u.color ?? p.numberColor,
                            numberX: u.x ?? p.numberX,
                            numberY: u.y ?? p.numberY,
                            numberStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.numberStyle, ...u.style }
                              : p.numberStyle
                          }))
                        }
                      />
                    </>
                  )}

                  {/* 4. Days Label Layer */}
                  {selectedLayerId === 'daysLabel' && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5">
                          সংখ্যার নিচের লেখা (days to left / দিন বাকি)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={config.daysLabelText}
                            onChange={(e) =>
                              updateConfigWithHistory({
                                ...config,
                                daysLabelText: e.target.value,
                                daysLabelStyle: {
                                  ...DEFAULT_PIXELLAB_STYLE,
                                  ...config.daysLabelStyle,
                                  visible: true
                                }
                              })
                            }
                            className="flex-1 px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                          <button
                            onClick={() =>
                              updateConfigWithHistory({ ...config, daysLabelText: 'days to left' })
                            }
                            className="px-2.5 py-1.5 rounded bg-slate-800 text-xs text-slate-300"
                          >
                            days to left
                          </button>
                          <button
                            onClick={() =>
                              updateConfigWithHistory({ ...config, daysLabelText: 'দিন বাকি' })
                            }
                            className="px-2.5 py-1.5 rounded bg-slate-800 text-xs text-slate-300"
                          >
                            দিন বাকি
                          </button>
                        </div>
                      </div>
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.daysLabelFont}
                        size={config.daysLabelSize}
                        minSize={20}
                        maxSize={95}
                        color={config.daysLabelColor}
                        x={config.daysLabelX}
                        y={config.daysLabelY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.daysLabelStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            daysLabelFont: u.font ?? p.daysLabelFont,
                            daysLabelSize: u.size ?? p.daysLabelSize,
                            daysLabelColor: u.color ?? p.daysLabelColor,
                            daysLabelX: u.x ?? p.daysLabelX,
                            daysLabelY: u.y ?? p.daysLabelY,
                            daysLabelStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.daysLabelStyle, ...u.style }
                              : p.daysLabelStyle
                          }))
                        }
                      />
                    </>
                  )}

                  {/* 5. Bottom Bengali Quote Layer */}
                  {selectedLayerId === 'quote' && (
                    <>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-slate-300">
                            নিচের বাংলা বাণী / মেসেজ
                          </label>
                          <button
                            onClick={() => {
                              const nextIdx = Math.floor(Math.random() * DAILY_QUOTES_97.length);
                              updateConfigWithHistory({
                                ...config,
                                quoteText: DAILY_QUOTES_97[nextIdx],
                                quoteStyle: {
                                  ...DEFAULT_PIXELLAB_STYLE,
                                  ...config.quoteStyle,
                                  visible: true
                                }
                              });
                            }}
                            className="text-[11px] text-amber-400 hover:underline"
                          >
                            নতুন ডেমো বাণী দিন
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={config.quoteText}
                          onChange={(e) =>
                            updateConfigWithHistory({
                              ...config,
                              quoteText: e.target.value,
                              quoteStyle: {
                                ...DEFAULT_PIXELLAB_STYLE,
                                ...config.quoteStyle,
                                visible: true
                              }
                            })
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.quoteFont}
                        size={config.quoteSize}
                        minSize={20}
                        maxSize={82}
                        color={config.quoteColor}
                        x={config.quoteX}
                        y={config.quoteY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.quoteStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            quoteFont: u.font ?? p.quoteFont,
                            quoteSize: u.size ?? p.quoteSize,
                            quoteColor: u.color ?? p.quoteColor,
                            quoteX: u.x ?? p.quoteX,
                            quoteY: u.y ?? p.quoteY,
                            quoteStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.quoteStyle, ...u.style }
                              : p.quoteStyle
                          }))
                        }
                      />
                    </>
                  )}

                  {/* 6. Extra Custom Text Layer */}
                  {selectedLayerId?.startsWith('custom-') &&
                    (() => {
                      const extra = config.extraTexts.find((t) => t.id === selectedLayerId);
                      if (!extra) return null;
                      return (
                        <>
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-medium text-slate-300">
                              কাস্টম টেক্সট এডিট করুন
                            </label>
                            <button
                              onClick={handleDeleteSelectedLayer}
                              className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>ডিলিট করুন</span>
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={extra.text}
                            onChange={(e) =>
                              updateConfigWithHistory((p) => ({
                                ...p,
                                extraTexts: p.extraTexts.map((t) =>
                                  t.id === extra.id ? { ...t, text: e.target.value } : t
                                )
                              }))
                            }
                            className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                          />
                          <PixelLabStyleControls
                            fonts={allFontOptions}
                            font={extra.fontFamily}
                            size={extra.fontSize}
                            minSize={18}
                            maxSize={160}
                            color={extra.color}
                            x={extra.x}
                            y={extra.y}
                            style={{ ...DEFAULT_PIXELLAB_STYLE, ...extra.style }}
                            swatches={quickSwatches}
                            onChange={(u) =>
                              updateConfigWithHistory((p) => ({
                                ...p,
                                extraTexts: p.extraTexts.map((t) =>
                                  t.id === extra.id
                                    ? {
                                        ...t,
                                        fontFamily: u.font ?? t.fontFamily,
                                        fontSize: u.size ?? t.fontSize,
                                        color: u.color ?? t.color,
                                        x: u.x ?? t.x,
                                        y: u.y ?? t.y,
                                        style: u.style
                                          ? { ...DEFAULT_PIXELLAB_STYLE, ...t.style, ...u.style }
                                          : t.style
                                      }
                                    : t
                                )
                              }))
                            }
                          />
                        </>
                      );
                    })()}
                </div>
              </div>
            )}

            {/* TAB 3: MUNAJAT HANDS ICON & BOUNDED ARABIC DUA BOX */}
            {activeTab === 'dua' && (
              <div className="space-y-5">
                {/* Munajat & 12 Islamic Icons Customizer Card */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.showPrayingHands}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            showPrayingHands: e.target.checked
                          })
                        }
                        className="rounded accent-amber-500 w-4 h-4"
                      />
                      <span>মোনাজাতের হাত ও ইসলামিক আইকন (১২টি স্টাইল)</span>
                    </label>
                    <button
                      onClick={() => setSelectedLayerId('hands')}
                      className="text-xs text-amber-400 hover:underline"
                    >
                      পজিশন এডিট করুন
                    </button>
                  </div>

                  {config.showPrayingHands && (
                    <>
                      <p className="text-[11px] text-slate-400">
                        মোনাজাতের হাত ছাড়াও নতুন চাঁদ-তারা, ফানুস, পবিত্র কুরআন, মসজিদ, তসবিহ, খেজুর বা কাবা শরীফ আইকন যেকোনোটি ব্যবহার করতে পারেন:
                      </p>
                      <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                        {ISLAMIC_ICON_OPTIONS.map((st) => (
                          <button
                            key={st.id}
                            onClick={() => {
                              updateConfigWithHistory({
                                ...config,
                                showPrayingHands: true,
                                handsStyle: st.id
                              });
                              setSelectedLayerId('hands');
                            }}
                            className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                              config.handsStyle === st.id
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {st.labelBn}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>আইকন সাইজ</span>
                            <span className="tabular-nums text-amber-400">
                              {Math.round(config.handsScale * 100)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={0.4}
                            max={1.8}
                            step={0.05}
                            value={config.handsScale}
                            onChange={(e) =>
                              updateConfigWithHistory({
                                ...config,
                                handsScale: parseFloat(e.target.value)
                              })
                            }
                            className="w-full accent-amber-500"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>উপর-নিচ পজিশন (Y)</span>
                            <span className="tabular-nums text-amber-400">
                              {Math.round(config.handsY)}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={92}
                            step={0.5}
                            value={config.handsY}
                            onChange={(e) =>
                              updateConfigWithHistory({
                                ...config,
                                handsY: parseFloat(e.target.value)
                              })
                            }
                            className="w-full accent-amber-500"
                          />
                        </div>

                        <div>
                          <span className="block text-xs text-slate-300 mb-1">
                            মোনাজাত কালার গ্রেডিয়েন্ট
                          </span>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={config.handsColor1 || '#f97316'}
                              onChange={(e) =>
                                updateConfigWithHistory({
                                  ...config,
                                  handsColor1: e.target.value
                                })
                              }
                              className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                            />
                            <input
                              type="color"
                              value={config.handsColor2 || '#fde047'}
                              onChange={(e) =>
                                updateConfigWithHistory({
                                  ...config,
                                  handsColor2: e.target.value
                                })
                              }
                              className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Arabic Dua Section (Bounded inside Box) */}
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.showDua}
                        onChange={(e) => {
                          updateConfigWithHistory({ ...config, showDua: e.target.checked }, true);
                          if (e.target.checked) setSelectedLayerId('dua');
                        }}
                        className="rounded accent-amber-500 w-4 h-4"
                      />
                      <span>কার্ডে আরবি দু'আ বক্স প্রদর্শন করুন</span>
                    </label>

                    {config.showDua && (
                      <button
                        onClick={() =>
                          updateConfigWithHistory({ ...config, showDua: false }, true)
                        }
                        className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>দু'আ মুছুন</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                    যেকোনো বড় আরবি দু'আ বা অর্থ লিখলে সেটি স্বয়ংক্রিয়ভাবে বক্সের ভেতরে লাইন-ব্রেক ও ফিট হয়ে থাকবে, কখনোই বক্সের বাইরে যাবে না।
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        নিজের মতো আরবি দু'আ লিখুন বা নিচের ডেমো থেকে সিলেক্ট করুন:
                      </label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={config.duaArabicText}
                        onChange={(e) => {
                          updateConfigWithHistory({
                            ...config,
                            showDua: true,
                            duaArabicText: e.target.value
                          });
                          setSelectedLayerId('dua');
                        }}
                        className="w-full px-3 py-2 text-base bg-slate-900 border border-slate-700 rounded-lg text-amber-200 font-serif"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-slate-300">
                          বাংলা অর্থ / অনুবাদ:
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={config.showDuaMeaning}
                            onChange={(e) =>
                              updateConfigWithHistory({
                                ...config,
                                showDuaMeaning: e.target.checked
                              })
                            }
                            className="rounded accent-amber-500"
                          />
                          <span>অর্থসহ দেখান</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        value={config.duaMeaningText}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            showDua: true,
                            duaMeaningText: e.target.value
                          })
                        }
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    {/* Box Width & Box Frame Toggle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.duaBgPill}
                          onChange={(e) =>
                            updateConfigWithHistory({ ...config, duaBgPill: e.target.checked })
                          }
                          className="rounded accent-amber-500"
                        />
                        <span>দু'আর চারপাশে দৃশ্যমান বর্ডার বক্স</span>
                      </label>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>দু'আ বক্সের চওড়া (Box Width)</span>
                          <span className="tabular-nums text-amber-400">
                            {config.duaBoxWidth || 84}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={55}
                          max={92}
                          value={config.duaBoxWidth || 84}
                          onChange={(e) =>
                            updateConfigWithHistory({
                              ...config,
                              duaBoxWidth: parseInt(e.target.value, 10)
                            })
                          }
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {config.showDua && (
                    <div className="pt-3 border-t border-slate-800">
                      <PixelLabStyleControls
                        fonts={allFontOptions}
                        font={config.duaFont}
                        size={config.duaSize}
                        minSize={22}
                        maxSize={64}
                        color={config.duaColor}
                        x={config.duaX}
                        y={config.duaY}
                        style={{ ...DEFAULT_PIXELLAB_STYLE, ...config.duaStyle }}
                        swatches={quickSwatches}
                        onChange={(u) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            duaFont: u.font ?? p.duaFont,
                            duaSize: u.size ?? p.duaSize,
                            duaColor: u.color ?? p.duaColor,
                            duaX: u.x ?? p.duaX,
                            duaY: u.y ?? p.duaY,
                            duaStyle: u.style
                              ? { ...DEFAULT_PIXELLAB_STYLE, ...p.duaStyle, ...u.style }
                              : p.duaStyle
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Curated Demo Duas List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-semibold text-slate-300">
                    রেডিমেড ডেমো আরবি দু'আ সমূহ (ক্লিক করলেই কার্ডের বক্সে যুক্ত হবে):
                  </h4>
                  <div className="space-y-2">
                    {DEMO_DUAS.map((dua) => {
                      const isCurrent = config.duaArabicText === dua.arabic && config.showDua;
                      return (
                        <button
                          key={dua.id}
                          onClick={() => {
                            updateConfigWithHistory(
                              (prev) => ({
                                ...prev,
                                showDua: true,
                                duaArabicText: dua.arabic,
                                duaMeaningText: dua.meaningBn
                              }),
                              true
                            );
                            setSelectedLayerId('dua');
                          }}
                          className={`w-full text-left p-3 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-amber-500/15 border-amber-400'
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-semibold text-amber-300">
                              {dua.titleBn}
                            </span>
                            {isCurrent && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                          </div>
                          <p
                            dir="rtl"
                            className="text-base text-white font-serif leading-relaxed mb-1"
                          >
                            {dua.arabic}
                          </p>
                          <p className="text-[11px] text-slate-300">{dua.meaningBn}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LOGO ADD, AUTO BG REMOVE, CROP & TOP/BOTTOM PLACEMENT */}
            {activeTab === 'logo' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm font-semibold text-white cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.logo.enabled}
                        onChange={(e) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: { ...p.logo, enabled: e.target.checked }
                          }))
                        }
                        className="rounded accent-amber-500 w-4 h-4"
                      />
                      <span>কার্ডে লোগো প্রদর্শন করুন</span>
                    </label>

                    <button
                      onClick={() => setIsLogoCropOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold hover:bg-amber-400 transition-colors"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      <span>বড় ক্রপ স্টুডিও</span>
                    </button>
                  </div>

                  {/* Logo Mode Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'default_ccp', label: '১ম রেফারেন্স লোগো' },
                      { id: 'custom_image', label: 'ছবি লোগো আপলোড' },
                      { id: 'custom_text', label: 'টেক্সট ব্র্যান্ড লোগো' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: {
                              ...p.logo,
                              enabled: true,
                              mode: m.id as CardConfig['logo']['mode']
                            }
                          }));
                          setSelectedLayerId('logo');
                        }}
                        className={`py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                          config.logo.mode === m.id
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Quick Logo Top / Bottom Position Selector */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300">
                        লোগো উপরে বা নিচে বসানোর ১-ক্লিক পজিশন:
                      </span>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        X:{Math.round(config.logo.x)}% Y:{Math.round(config.logo.y)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 50, y: 10 },
                              quoteY: p.quoteY < 86 ? 92.5 : p.quoteY,
                              handsY: p.handsY < 76 ? 79.5 : p.handsY
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                          Math.abs(config.logo.y - 10) < 4 && Math.abs(config.logo.x - 50) < 6
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                        <span>উপরে মাঝখানে</span>
                      </button>

                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 50, y: 92.5 },
                              // Automatically lift quote & hands slightly so bottom logo has clean room!
                              quoteY: p.quoteY > 86 ? 82 : p.quoteY,
                              handsY: p.handsY > 75 ? 71.5 : p.handsY
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className={`flex items-center justify-center gap-1 py-2 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                          config.logo.y > 86 && Math.abs(config.logo.x - 50) < 6
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                        }`}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                        <span>নিচে মাঝখানে</span>
                      </button>

                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 20, y: 10 }
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className="py-2 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800"
                      >
                        উপরে বামে
                      </button>

                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 80, y: 10 }
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className="py-2 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800"
                      >
                        উপরে ডানে
                      </button>

                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 20, y: 92 }
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className="py-2 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800"
                      >
                        নিচে বামে
                      </button>

                      <button
                        onClick={() => {
                          updateConfigWithHistory(
                            (p) => ({
                              ...p,
                              logo: { ...p.logo, enabled: true, x: 80, y: 92 }
                            }),
                            true
                          );
                          setSelectedLayerId('logo');
                        }}
                        className="py-2 px-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-xs font-medium text-slate-200 border border-slate-800"
                      >
                        নিচে ডানে
                      </button>
                    </div>
                  </div>

                  {config.logo.mode === 'custom_image' && (
                    <div className="space-y-3 pt-1">
                      <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-amber-500/50 hover:border-amber-400 rounded-xl bg-slate-900/70 cursor-pointer transition-colors">
                        <Upload className="w-6 h-6 text-amber-400 mb-1.5" />
                        <span className="text-xs font-semibold text-white">
                          গ্যালারি থেকে লোগো ছবি আপলোড করুন (PNG / JPG)
                        </span>
                        <span className="text-[11px] text-slate-400 mt-0.5">
                          নিচে ১-ক্লিকে অটো ব্যাকগ্রাউন্ড রিমুভ ও সহজ ক্রপ করতে পারবেন
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </label>

                      {/* Inline Simplified Auto Background Removal & Quick Crop */}
                      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>১-ক্লিক লোগো ব্যাকগ্রাউন্ড অটো রিমুভাল:</span>
                          </span>
                          <button
                            onClick={() => setIsLogoCropOpen(true)}
                            className="text-[11px] text-amber-400 hover:underline font-medium"
                          >
                            বিস্তারিত ক্রপ খুলুন
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {[
                            { id: 'auto', label: '✨ অটো রিমুভ' },
                            { id: 'white', label: 'সাদা মুছুন' },
                            { id: 'dark', label: 'কালো মুছুন' },
                            { id: 'none', label: 'অরিজিনাল' }
                          ].map((rm) => (
                            <button
                              key={rm.id}
                              onClick={() =>
                                updateConfigWithHistory((p) => ({
                                  ...p,
                                  logo: {
                                    ...p.logo,
                                    removeBg: rm.id as CardConfig['logo']['removeBg']
                                  }
                                }))
                              }
                              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors ${
                                config.logo.removeBg === rm.id
                                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                              }`}
                            >
                              {rm.label}
                            </button>
                          ))}
                        </div>

                        {config.logo.removeBg !== 'none' && (
                          <div>
                            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                              <span>ব্যাকগ্রাউন্ড রিমুভ পাওয়ার (Sensitivity)</span>
                              <span className="tabular-nums text-emerald-400 font-bold">
                                {config.logo.removeBgTolerance}%
                              </span>
                            </div>
                            <input
                              type="range"
                              min={8}
                              max={85}
                              value={config.logo.removeBgTolerance}
                              onChange={(e) =>
                                updateConfigWithHistory((p) => ({
                                  ...p,
                                  logo: {
                                    ...p.logo,
                                    removeBgTolerance: parseInt(e.target.value, 10)
                                  }
                                }))
                              }
                              className="w-full accent-emerald-500"
                            />
                          </div>
                        )}

                        {/* Quick Shape & Crop Buttons */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <span className="block text-[11px] text-slate-300 mb-1.5">
                            সহজ শেপ ও ছোবড় (Soft Edge):
                          </span>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { id: 'none', label: 'স্বাভাবিক' },
                              { id: 'circle', label: 'গোল' },
                              { id: 'rounded', label: 'রাউন্ড' },
                              { id: 'feather', label: 'ছোবড়' }
                            ].map((sh) => (
                              <button
                                key={sh.id}
                                onClick={() =>
                                  updateConfigWithHistory((p) => ({
                                    ...p,
                                    logo: {
                                      ...p.logo,
                                      shapeMask: sh.id as CardConfig['logo']['shapeMask'],
                                      featherAmount:
                                        sh.id === 'feather'
                                          ? Math.max(p.logo.featherAmount, 28)
                                          : p.logo.featherAmount
                                    }
                                  }))
                                }
                                className={`py-1.5 px-2 rounded-lg text-xs font-medium border ${
                                  config.logo.shapeMask === sh.id
                                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                    : 'bg-slate-900 border-slate-800 text-slate-300'
                                }`}
                              >
                                {sh.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {config.logo.mode === 'custom_text' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          প্রতিষ্ঠানের নাম (Main Brand Name)
                        </label>
                        <input
                          type="text"
                          value={config.logo.customTextMain}
                          onChange={(e) =>
                            updateConfigWithHistory((p) => ({
                              ...p,
                              logo: { ...p.logo, customTextMain: e.target.value }
                            }))
                          }
                          className="w-full px-3 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-300 mb-1">
                          স্লোগান / ট্যাগলাইন (Sub-text)
                        </label>
                        <input
                          type="text"
                          value={config.logo.customTextSub}
                          onChange={(e) =>
                            updateConfigWithHistory((p) => ({
                              ...p,
                              logo: { ...p.logo, customTextSub: e.target.value }
                            }))
                          }
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Position, Size, Rotation & Opacity Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>লোগো সাইজ (Scale)</span>
                        <span className="tabular-nums text-amber-400">
                          {Math.round(config.logo.scale * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.3}
                        max={2.2}
                        step={0.05}
                        value={config.logo.scale}
                        onChange={(e) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: { ...p.logo, scale: parseFloat(e.target.value) }
                          }))
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>রোটেশন (Rotation)</span>
                        <span className="tabular-nums text-amber-400">{config.logo.rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min={-180}
                        max={180}
                        value={config.logo.rotation}
                        onChange={(e) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: { ...p.logo, rotation: parseInt(e.target.value, 10) }
                          }))
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>বাম-ডান পজিশন (X)</span>
                        <button
                          onClick={() =>
                            updateConfigWithHistory((p) => ({
                              ...p,
                              logo: { ...p.logo, x: 50 }
                            }))
                          }
                          className="text-[11px] text-amber-400 hover:underline"
                        >
                          মাঝখানে (50%)
                        </button>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={config.logo.x}
                        onChange={(e) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: { ...p.logo, x: parseInt(e.target.value, 10) }
                          }))
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>উপর-নিচ পজিশন (Y)</span>
                        <span className="tabular-nums text-amber-400">{config.logo.y}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={95}
                        value={config.logo.y}
                        onChange={(e) =>
                          updateConfigWithHistory((p) => ({
                            ...p,
                            logo: { ...p.logo, y: parseInt(e.target.value, 10) }
                          }))
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: CUSTOM BACKGROUND STUDIO, CROP, BLUR & TINT */}
            {activeTab === 'bg' && (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4">
                  <h3 className="text-sm font-semibold text-white">
                    কাস্টম ব্যাকগ্রাউন্ড আপলোড, ব্লার, জুম ও কার্ড সাইজ
                  </h3>

                  {/* Card Aspect Ratio */}
                  <div>
                    <label className="block text-xs text-slate-300 mb-2">
                      কার্ডের অনুপাত (Card Size)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '4:5', label: '৪:৫ পোর্ট্রেট (রেফারেন্স)' },
                        { id: '1:1', label: '১:১ স্কয়ার পোস্ট' },
                        { id: '9:16', label: '৯:১৬ স্টোরি / রিলস' }
                      ].map((ar) => (
                        <button
                          key={ar.id}
                          onClick={() =>
                            updateConfigWithHistory((p) => ({
                              ...p,
                              aspectRatio: ar.id as CardConfig['aspectRatio']
                            }))
                          }
                          className={`py-2 px-2 rounded-lg text-xs font-medium border transition-colors ${
                            config.aspectRatio === ar.id
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300'
                          }`}
                        >
                          {ar.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Background Upload */}
                  <div className="space-y-2">
                    <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-amber-500/50 hover:border-amber-400 rounded-xl bg-slate-900/80 cursor-pointer transition-colors">
                      <Upload className="w-6 h-6 text-amber-400 mb-1.5" />
                      <span className="text-xs font-semibold text-white">
                        গ্যালারি থেকে নিজের ব্যাকগ্রাউন্ড ছবি আপলোড করুন
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        যেকোনো JPG, PNG বা WebP ছবি সাপোর্ট করবে
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCustomBgUpload}
                        className="hidden"
                      />
                    </label>
                    {config.customBgUrl && (
                      <div className="flex items-center justify-between bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                        <span className="text-xs text-emerald-400 font-medium">
                          কাস্টম ব্যাকগ্রাউন্ড চালু আছে
                        </span>
                        <button
                          onClick={() =>
                            updateConfigWithHistory((p) => ({ ...p, customBgUrl: null }), true)
                          }
                          className="text-xs text-rose-400 hover:underline font-medium"
                        >
                          মুছে থিমের ব্যাকগ্রাউন্ডে ফিরুন
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Background Adjustments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>ব্যাকগ্রাউন্ড জুম (Crop Zoom)</span>
                        <span className="tabular-nums text-amber-400">
                          {Math.round(config.bgZoom * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={2.4}
                        step={0.05}
                        value={config.bgZoom}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgZoom: parseFloat(e.target.value)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>ব্যাকগ্রাউন্ড ব্লার (Blur)</span>
                        <span className="tabular-nums text-amber-400">{config.bgBlur || 0}px</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={16}
                        step={0.5}
                        value={config.bgBlur || 0}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgBlur: parseFloat(e.target.value)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>বাম-ডান প্যান (Pan X)</span>
                        <span className="tabular-nums text-amber-400">{config.bgPanX}%</span>
                      </div>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={config.bgPanX}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgPanX: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>উপর-নিচ প্যান (Pan Y)</span>
                        <span className="tabular-nums text-amber-400">{config.bgPanY}%</span>
                      </div>
                      <input
                        type="range"
                        min={-50}
                        max={50}
                        value={config.bgPanY}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgPanY: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>উজ্জ্বলতা (Brightness)</span>
                        <span className="tabular-nums text-amber-400">{config.bgBrightness}%</span>
                      </div>
                      <input
                        type="range"
                        min={40}
                        max={150}
                        value={config.bgBrightness}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgBrightness: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>চারপাশের ডার্ক ভিগনেট</span>
                        <span className="tabular-nums text-amber-400">{config.bgVignette}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={95}
                        value={config.bgVignette}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgVignette: parseInt(e.target.value, 10)
                          })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  {/* Color Tint Overlay */}
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                      <span>কালার ওভারলে টিন্ট (লেখা ফুটিয়ে তোলার জন্য)</span>
                      <span className="tabular-nums text-amber-400">
                        {config.bgOverlayOpacity || 0}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={config.bgOverlayColor || '#000000'}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgOverlayColor: e.target.value
                          })
                        }
                        className="w-8 h-8 rounded cursor-pointer bg-transparent border border-slate-700"
                      />
                      <input
                        type="range"
                        min={0}
                        max={80}
                        value={config.bgOverlayOpacity || 0}
                        onChange={(e) =>
                          updateConfigWithHistory({
                            ...config,
                            bgOverlayOpacity: parseInt(e.target.value, 10)
                          })
                        }
                        className="flex-1 accent-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: PIXELLAB LAYER MANAGER (Lock / Hide / Restore / Delete) */}
            {activeTab === 'layers' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      লেয়ার লিস্ট, লক ও ডিলিট/রিস্টোর প্যানেল
                    </h3>
                    <p className="text-xs text-slate-400">
                      ডিলিট করা বা লুকানো লেয়ার এখান থেকে আবার চালু (Restore) করা যাবে
                    </p>
                  </div>
                  <button
                    onClick={() => updateConfigWithHistory(getDefaultConfigForReference1(), true)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-amber-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>সব রিসেট</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      id: 'logo',
                      title: 'ব্র্যান্ড লোগো (Logo)',
                      visible: config.logo.enabled,
                      locked: !!config.logo.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            logo: { ...p.logo, enabled: !p.logo.enabled }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          logo: { ...p.logo, locked: !p.logo.locked }
                        }))
                    },
                    {
                      id: 'script',
                      title: `উপরের স্ক্রিপ্ট (${config.scriptText})`,
                      visible: config.scriptStyle?.visible !== false,
                      locked: !!config.scriptStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            scriptStyle: {
                              ...DEFAULT_PIXELLAB_STYLE,
                              ...p.scriptStyle,
                              visible: p.scriptStyle?.visible === false
                            }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          scriptStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.scriptStyle,
                            locked: !p.scriptStyle?.locked
                          }
                        }))
                    },
                    {
                      id: 'title',
                      title: `মূল শিরোনাম (${config.titleText})`,
                      visible: config.titleStyle?.visible !== false,
                      locked: !!config.titleStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            titleStyle: {
                              ...DEFAULT_PIXELLAB_STYLE,
                              ...p.titleStyle,
                              visible: p.titleStyle?.visible === false
                            }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          titleStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.titleStyle,
                            locked: !p.titleStyle?.locked
                          }
                        }))
                    },
                    {
                      id: 'number',
                      title: `কাউন্টডাউন সংখ্যা (${config.day})`,
                      visible: config.numberStyle?.visible !== false,
                      locked: !!config.numberStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            numberStyle: {
                              ...DEFAULT_PIXELLAB_STYLE,
                              ...p.numberStyle,
                              visible: p.numberStyle?.visible === false
                            }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          numberStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.numberStyle,
                            locked: !p.numberStyle?.locked
                          }
                        }))
                    },
                    {
                      id: 'daysLabel',
                      title: `দিন বাকি সাব-লেখা (${config.daysLabelText})`,
                      visible: config.daysLabelStyle?.visible !== false,
                      locked: !!config.daysLabelStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            daysLabelStyle: {
                              ...DEFAULT_PIXELLAB_STYLE,
                              ...p.daysLabelStyle,
                              visible: p.daysLabelStyle?.visible === false
                            }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          daysLabelStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.daysLabelStyle,
                            locked: !p.daysLabelStyle?.locked
                          }
                        }))
                    },
                    {
                      id: 'dua',
                      title: "আরবি দু'আ বক্স (Arabic Dua)",
                      visible: config.showDua,
                      locked: !!config.duaStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory((p) => ({ ...p, showDua: !p.showDua }), true),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          duaStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.duaStyle,
                            locked: !p.duaStyle?.locked
                          }
                        }))
                    },
                    {
                      id: 'hands',
                      title: 'মোনাজাতের চিহ্ন (Praying Hands)',
                      visible: config.showPrayingHands,
                      locked: !!config.handsLocked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            showPrayingHands: !p.showPrayingHands
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({ ...p, handsLocked: !p.handsLocked }))
                    },
                    {
                      id: 'quote',
                      title: 'নিচের বাংলা বাণী (Bottom Quote)',
                      visible: config.quoteStyle?.visible !== false,
                      locked: !!config.quoteStyle?.locked,
                      onToggleVisible: () =>
                        updateConfigWithHistory(
                          (p) => ({
                            ...p,
                            quoteStyle: {
                              ...DEFAULT_PIXELLAB_STYLE,
                              ...p.quoteStyle,
                              visible: p.quoteStyle?.visible === false
                            }
                          }),
                          true
                        ),
                      onToggleLock: () =>
                        updateConfigWithHistory((p) => ({
                          ...p,
                          quoteStyle: {
                            ...DEFAULT_PIXELLAB_STYLE,
                            ...p.quoteStyle,
                            locked: !p.quoteStyle?.locked
                          }
                        }))
                    }
                  ].map((layer) => (
                    <div
                      key={layer.id}
                      onClick={() => setSelectedLayerId(layer.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                        selectedLayerId === layer.id
                          ? 'bg-amber-500/15 border-amber-400'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className={`text-xs font-medium truncate pr-2 ${
                          layer.visible ? 'text-slate-200' : 'text-slate-500 line-through'
                        }`}
                      >
                        {layer.title}
                      </span>
                      <div
                        className="flex items-center gap-1.5 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={layer.onToggleLock}
                          className={`p-1.5 rounded-lg border ${
                            layer.locked
                              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                          title={layer.locked ? 'আনলক করুন' : 'লক করুন'}
                        >
                          {layer.locked ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <Unlock className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={layer.onToggleVisible}
                          className={`px-2 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 ${
                            !layer.visible
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                          }`}
                        >
                          {layer.visible ? (
                            <>
                              <Trash2 className="w-3 h-3" />
                              <span>মুছুন</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>ফিরিয়ে আনুন</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Extra Custom Text Layers */}
                  {config.extraTexts.map((extra, idx) => {
                    const isLock = !!extra.style?.locked;
                    return (
                      <div
                        key={extra.id}
                        onClick={() => {
                          setSelectedLayerId(extra.id);
                          setActiveTab('text');
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          selectedLayerId === extra.id
                            ? 'bg-amber-500/15 border-amber-400'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-medium text-amber-300 truncate pr-2">
                          কাস্টম লেখা #{idx + 1}: {extra.text}
                        </span>
                        <div
                          className="flex items-center gap-1.5 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              updateConfigWithHistory((p) => ({
                                ...p,
                                extraTexts: p.extraTexts.map((t) =>
                                  t.id === extra.id
                                    ? {
                                        ...t,
                                        style: {
                                          ...DEFAULT_PIXELLAB_STYLE,
                                          ...t.style,
                                          locked: !isLock
                                        }
                                      }
                                    : t
                                )
                              }))
                            }
                            className={`p-1.5 rounded-lg border ${
                              isLock
                                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {isLock ? (
                              <Lock className="w-3.5 h-3.5" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              updateConfigWithHistory(
                                (p) => ({
                                  ...p,
                                  extraTexts: p.extraTexts.filter((t) => t.id !== extra.id)
                                }),
                                true
                              )
                            }
                            className="px-2 py-1 rounded-lg border bg-rose-500/15 border-rose-500/30 text-rose-300 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>ডিলিট</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Persistent Creative Concept Point Contact, Rating & Feedback Banner inside Sidebar */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-white">Creative Concept Point</p>
              <p className="text-[11px] text-slate-400">
                হোয়াটসঅ্যাপ: <span className="text-emerald-400 font-semibold">০১৮৮৬১০১৮২৪</span> • ফেসবুক
              </p>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>রেটিং ও পরামর্শ</span>
            </button>
          </div>
        </aside>
      </main>

      {/* Modals */}
      <LogoCropModal
        isOpen={isLogoCropOpen}
        onClose={() => setIsLogoCropOpen(false)}
        logo={config.logo}
        onUploadLogo={handleLogoUpload}
        onChange={(updated) =>
          updateConfigWithHistory((prev) => ({
            ...prev,
            logo: { ...prev.logo, ...updated }
          }))
        }
      />

      <ThemesGalleryModal
        isOpen={isThemesModalOpen}
        onClose={() => setIsThemesModalOpen(false)}
        activeThemeId={config.themeId}
        onSelectTheme={(theme, syncDayWithTheme) => {
          applyThemePreset(theme, syncDayWithTheme ? theme.day : config.day, true);
        }}
      />

      <ContactFeedbackModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}

/**
 * PIXELLAB-STYLE COMPREHENSIVE TEXT & LAYER STYLING COMPONENT
 * Includes dedicated Shadow Opacity slider separate from Shadow Blur radius!
 */
interface PixelLabStyleControlsProps {
  fonts: FontOption[];
  font: string;
  size: number;
  minSize: number;
  maxSize: number;
  color: string;
  x: number;
  y: number;
  style: PixelLabTextStyle;
  swatches: string[];
  onChange: (updated: {
    font?: string;
    size?: number;
    color?: string;
    x?: number;
    y?: number;
    style?: Partial<PixelLabTextStyle>;
  }) => void;
}

const PixelLabStyleControls: React.FC<PixelLabStyleControlsProps> = ({
  fonts,
  font,
  size,
  minSize,
  maxSize,
  color,
  x,
  y,
  style,
  swatches,
  onChange
}) => {
  const [subTab, setSubTab] = useState<
    'font' | 'color' | 'stroke_shadow' | 'bg_box' | 'spacing_rot' | 'position'
  >('font');
  const [nudgeStep, setNudgeStep] = useState<number>(1);

  return (
    <div className="space-y-3.5 pt-1">
      {/* PixelLab Feature Ribbon */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
        {[
          { id: 'font', label: 'ফন্ট/সাইজ' },
          { id: 'color', label: 'কালার/গ্রেডিয়েন্ট' },
          { id: 'stroke_shadow', label: 'স্ট্রোক/শ্যাডো' },
          { id: 'bg_box', label: 'ব্যাকগ্রাউন্ড বক্স' },
          { id: 'spacing_rot', label: 'স্পেসিং/বাঁকানো' },
          { id: 'position', label: 'পজিশন প্যাড' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id as typeof subTab)}
            className={`py-1.5 px-1.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap ${
              subTab === t.id
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: FONT, SIZE, BOLD, ITALIC */}
      {subTab === 'font' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              ফন্ট নির্বাচন করুন (বাংলা, আরবি ও ইংরেজি)
            </label>
            <select
              value={font}
              onChange={(e) => onChange({ font: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-amber-500"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.family}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>লেখার সাইজ (Size)</span>
                <span className="tabular-nums text-amber-400">{size}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChange({ size: Math.max(minSize, size - 2) })}
                  className="px-2 py-1 rounded bg-slate-800 text-xs font-bold text-white"
                >
                  -
                </button>
                <input
                  type="range"
                  min={minSize}
                  max={maxSize}
                  value={size}
                  onChange={(e) => onChange({ size: parseInt(e.target.value, 10) })}
                  className="flex-1 accent-amber-500"
                />
                <button
                  onClick={() => onChange({ size: Math.min(maxSize, size + 2) })}
                  className="px-2 py-1 rounded bg-slate-800 text-xs font-bold text-white"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">স্টাইল (B / I)</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onChange({ style: { bold: !style.bold } })}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                    style.bold
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  B বোল্ড
                </button>
                <button
                  onClick={() => onChange({ style: { italic: !style.italic } })}
                  className={`flex-1 py-1.5 rounded-lg text-xs italic border ${
                    style.italic
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  I ইটালিক
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: COLOR & GRADIENT */}
      {subTab === 'color' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-300 mb-1.5">মূল কালার (Primary Color)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => onChange({ color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border border-slate-700 shrink-0"
              />
              <div className="flex items-center gap-1.5 flex-wrap">
                {swatches.map((sw) => (
                  <button
                    key={sw}
                    onClick={() => onChange({ color: sw })}
                    style={{ backgroundColor: sw }}
                    className={`w-5 h-5 rounded-full border ${
                      color.toLowerCase() === sw.toLowerCase()
                        ? 'border-amber-400 scale-110'
                        : 'border-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={style.gradientEnabled}
                onChange={(e) => onChange({ style: { gradientEnabled: e.target.checked } })}
                className="rounded accent-amber-500"
              />
              <span>পিক্সেলল্যাব ডুয়াল গ্রেডিয়েন্ট কালার চালু করুন</span>
            </label>

            {style.gradientEnabled && (
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">দ্বিতীয় কালার:</span>
                <input
                  type="color"
                  value={style.gradientColor2}
                  onChange={(e) => onChange({ style: { gradientColor2: e.target.value } })}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: STROKE (OUTLINE) & SHADOW (WITH INDEPENDENT SHADOW OPACITY SLIDER!) */}
      {subTab === 'stroke_shadow' && (
        <div className="grid grid-cols-1 gap-3">
          {/* Stroke */}
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
              <input
                type="checkbox"
                checked={style.strokeEnabled}
                onChange={(e) => onChange({ style: { strokeEnabled: e.target.checked } })}
                className="rounded accent-amber-500"
              />
              <span>স্ট্রোক / আউটলাইন (Stroke Outline)</span>
            </label>
            {style.strokeEnabled && (
              <div className="flex items-center gap-2.5">
                <input
                  type="color"
                  value={style.strokeColor}
                  onChange={(e) => onChange({ style: { strokeColor: e.target.value } })}
                  className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                />
                <span className="text-xs text-slate-400">পুরুত্ব:</span>
                <input
                  type="range"
                  min={1}
                  max={18}
                  value={style.strokeWidth}
                  onChange={(e) =>
                    onChange({ style: { strokeWidth: parseInt(e.target.value, 10) } })
                  }
                  className="flex-1 accent-amber-500"
                />
                <span className="text-xs text-amber-400 tabular-nums">{style.strokeWidth}px</span>
              </div>
            )}
          </div>

          {/* Shadow (with separate Blur Radius AND Shadow Opacity sliders!) */}
          <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={style.shadowEnabled}
                  onChange={(e) => onChange({ style: { shadowEnabled: e.target.checked } })}
                  className="rounded accent-amber-500"
                />
                <span>টেক্সট শ্যাডো / ছায়া (Text Shadow)</span>
              </label>
              {style.shadowEnabled && (
                <input
                  type="color"
                  value={style.shadowColor}
                  onChange={(e) => onChange({ style: { shadowColor: e.target.value } })}
                  className="w-6 h-6 rounded cursor-pointer bg-transparent border border-slate-700"
                  title="শ্যাডো কালার"
                />
              )}
            </div>

            {style.shadowEnabled && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Blur Radius Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>শ্যাডো ব্লার (Blur Radius)</span>
                    <span className="text-amber-400 tabular-nums">{style.shadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={style.shadowBlur}
                    onChange={(e) =>
                      onChange({ style: { shadowBlur: parseInt(e.target.value, 10) } })
                    }
                    className="w-full accent-amber-500"
                  />
                </div>

                {/* Separate Shadow Opacity Slider */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>শ্যাডো অপাসিটি (Shadow Opacity)</span>
                    <span className="text-amber-400 tabular-nums">
                      {Math.round((style.shadowOpacity ?? 0.75) * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={style.shadowOpacity ?? 0.75}
                    onChange={(e) =>
                      onChange({ style: { shadowOpacity: parseFloat(e.target.value) } })
                    }
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: TEXT BACKGROUND BOX */}
      {subTab === 'bg_box' && (
        <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 space-y-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
            <input
              type="checkbox"
              checked={style.bgBoxEnabled}
              onChange={(e) => onChange({ style: { bgBoxEnabled: e.target.checked } })}
              className="rounded accent-amber-500"
            />
            <span>লেখার পেছনে ব্যাকগ্রাউন্ড বক্স (Text Background)</span>
          </label>

          {style.bgBoxEnabled && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <span className="block text-[11px] text-slate-400 mb-1">বক্স কালার ও স্বচ্ছতা</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style.bgBoxColor}
                    onChange={(e) => onChange({ style: { bgBoxColor: e.target.value } })}
                    className="w-7 h-7 rounded cursor-pointer bg-transparent border border-slate-700"
                  />
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={style.bgBoxOpacity}
                    onChange={(e) =>
                      onChange({ style: { bgBoxOpacity: parseFloat(e.target.value) } })
                    }
                    className="flex-1 accent-amber-500"
                  />
                </div>
              </div>

              <div>
                <span className="block text-[11px] text-slate-400 mb-1">
                  প্যাডিং ({style.bgBoxPadding}px)
                </span>
                <input
                  type="range"
                  min={6}
                  max={50}
                  value={style.bgBoxPadding}
                  onChange={(e) =>
                    onChange({ style: { bgBoxPadding: parseInt(e.target.value, 10) } })
                  }
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <span className="block text-[11px] text-slate-400 mb-1">
                  গোল কোণা ({style.bgBoxRadius}px)
                </span>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={style.bgBoxRadius}
                  onChange={(e) =>
                    onChange({ style: { bgBoxRadius: parseInt(e.target.value, 10) } })
                  }
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 5: SPACING, OPACITY & ROTATION */}
      {subTab === 'spacing_rot' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>রোটেশন (Rotate)</span>
              <button
                onClick={() => onChange({ style: { rotation: 0 } })}
                className="text-[11px] text-amber-400"
              >
                {style.rotation}° (রিসেট)
              </button>
            </div>
            <input
              type="range"
              min={-180}
              max={180}
              value={style.rotation}
              onChange={(e) =>
                onChange({ style: { rotation: parseInt(e.target.value, 10) } })
              }
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>স্বচ্ছতা (Opacity)</span>
              <span className="tabular-nums text-amber-400">
                {Math.round(style.opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.15}
              max={1}
              step={0.05}
              value={style.opacity}
              onChange={(e) =>
                onChange({ style: { opacity: parseFloat(e.target.value) } })
              }
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>অক্ষরের দূরত্ব (Letter Spacing)</span>
              <span className="tabular-nums text-amber-400">{style.letterSpacing}px</span>
            </div>
            <input
              type="range"
              min={-4}
              max={25}
              value={style.letterSpacing}
              onChange={(e) =>
                onChange({ style: { letterSpacing: parseInt(e.target.value, 10) } })
              }
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>লাইনের দূরত্ব (Line Height)</span>
              <span className="tabular-nums text-amber-400">{style.lineHeight}</span>
            </div>
            <input
              type="range"
              min={0.85}
              max={2.0}
              step={0.05}
              value={style.lineHeight}
              onChange={(e) =>
                onChange({ style: { lineHeight: parseFloat(e.target.value) } })
              }
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      )}

      {/* SUB-TAB 6: PIXELLAB NUDGE PAD & RELATIVE POSITION */}
      {subTab === 'position' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-slate-900/70 border border-slate-800">
          {/* Nudge D-Pad */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>সূক্ষ্ম পজিশন মুভ (Nudge)</span>
              <span className="text-amber-400 tabular-nums">{nudgeStep}%</span>
            </div>
            <input
              type="range"
              min={0.2}
              max={4}
              step={0.2}
              value={nudgeStep}
              onChange={(e) => setNudgeStep(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => onChange({ x: Math.max(2, x - nudgeStep) })}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => onChange({ y: Math.max(2, y - nudgeStep) })}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onChange({ y: Math.min(98, y + nudgeStep) })}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => onChange({ x: Math.min(98, x + nudgeStep) })}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Relative Position 6-Button Grid */}
          <div className="space-y-2">
            <span className="block text-xs text-slate-300">
              রিলেটিভ পজিশন (Relative Align)
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => onChange({ x: 22 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 flex flex-col items-center gap-1"
              >
                <AlignLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>বামে</span>
              </button>
              <button
                onClick={() => onChange({ x: 50 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 flex flex-col items-center gap-1"
              >
                <AlignCenter className="w-3.5 h-3.5 text-amber-400" />
                <span>মাঝখানে (X)</span>
              </button>
              <button
                onClick={() => onChange({ x: 78 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200 flex flex-col items-center gap-1"
              >
                <AlignRight className="w-3.5 h-3.5 text-amber-400" />
                <span>ডানে</span>
              </button>
              <button
                onClick={() => onChange({ y: 15 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
              >
                উপরে
              </button>
              <button
                onClick={() => onChange({ y: 50 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
              >
                কেন্দ্রে (Y)
              </button>
              <button
                onClick={() => onChange({ y: 92 })}
                className="py-2 px-2 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-200"
              >
                নিচে
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
