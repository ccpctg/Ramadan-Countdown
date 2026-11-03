import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  MessageSquare,
  Phone,
  Copy,
  Check,
  Send,
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';

interface ContactFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FeedbackEntry {
  id: string;
  name: string;
  rating: number;
  topic: string;
  message: string;
  date: string;
}

const STORAGE_KEY_FEEDBACK = 'ccp_ramadan_studio_feedbacks';
const WHATSAPP_NUMBER_INTL = '8801886101824';
const WHATSAPP_NUMBER_DISPLAY = '01886101824';
const WHATSAPP_NUMBER_BN = '০১৮৮৬১০১৮২৪';
const FACEBOOK_SEARCH_URL = 'https://www.facebook.com/search/top?q=Creative%20Concept%20Point';
const EMAIL_ADDRESS = 'creativeconceptpoint@gmail.com';

export const ContactFeedbackModal: React.FC<ContactFeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [topic, setTopic] = useState<string>('ডিজাইন ও অ্যাপ পরামর্শ');
  const [message, setMessage] = useState<string>('');
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [submittedNotice, setSubmittedNotice] = useState<boolean>(false);
  const [savedFeedbacks, setSavedFeedbacks] = useState<FeedbackEntry[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(savedFeedbacks));
    } catch {
      // ignore storage quota errors
    }
  }, [savedFeedbacks]);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(WHATSAPP_NUMBER_DISPLAY);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const buildWhatsAppFeedbackUrl = () => {
    const stars = '⭐'.repeat(rating);
    const text = `আসসালামু আলাইকুম Creative Concept Point!\n\nরেটিং: ${stars} (${rating}/5)\nবিষয়: ${topic}\nনাম: ${
      name.trim() || 'ব্যবহারকারী'
    }\nপরামর্শ/মতামত: ${message.trim() || 'অ্যাপটি দারুণ লেগেছে!'}`;
    return `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(text)}`;
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: FeedbackEntry = {
      id: String(Date.now()),
      name: name.trim() || 'শুভাকাঙ্ক্ষী ব্যবহারকারী',
      rating,
      topic,
      message: message.trim() || 'চমৎকার অ্যাপ!',
      date: new Date().toLocaleDateString('bn-BD')
    };
    setSavedFeedbacks((prev) => [newEntry, ...prev.slice(0, 9)]);
    setSubmittedNotice(true);
    setTimeout(() => setSubmittedNotice(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Creative Concept Point — যোগাযোগ, রেটিং ও পরামর্শ
              </h3>
              <p className="text-xs text-slate-400">
                Your Vision • Our Creativity | আপনার মতামত ও রেটিং আমাদের অনুপ্রেরণা
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
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Direct Contact Cards: WhatsApp (01886101824) & Facebook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp Card */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  হোয়াটসঅ্যাপ ও সরাসরি কল
                </span>
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-lg font-black text-white tabular-nums tracking-wide">
                  {WHATSAPP_NUMBER_BN}
                </p>
                <p className="text-xs text-slate-300 tabular-nums">({WHATSAPP_NUMBER_DISPLAY})</p>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER_INTL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>হোয়াটসঅ্যাপ চ্যাট</span>
                </a>
                <button
                  onClick={handleCopyPhone}
                  className="flex items-center gap-1 py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                  title="নম্বর কপি করুন"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">কপি হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Facebook & Email Card */}
            <div className="p-4 rounded-xl bg-blue-950/25 border border-blue-500/30 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    ফেসবুক ও অফিসিয়াল পেজ
                  </span>
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-sm font-bold text-white">Creative Concept Point</p>
                <p className="text-xs text-slate-300 mt-0.5 break-all">{EMAIL_ADDRESS}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={FACEBOOK_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ফেসবুকে যুক্ত হোন</span>
                </a>
                <a
                  href={`mailto:${EMAIL_ADDRESS}?subject=Ramadan%2097%20Studio%20Feedback`}
                  className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700"
                >
                  ইমেইল
                </a>
              </div>
            </div>
          </div>

          {/* 5-Star Rating & Feedback Form */}
          <form
            onSubmit={handleSaveFeedback}
            className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-400" />
                <span>অ্যাপটি কেমন লেগেছে? রেটিং ও পরামর্শ দিন</span>
              </h4>
              <span className="text-xs font-semibold text-amber-400">
                রেটিং: {rating} / ৫ স্টার
              </span>
            </div>

            {/* Interactive 5-Star Selector */}
            <div className="flex items-center justify-center gap-2 py-2 bg-slate-900/90 rounded-xl border border-slate-800">
              {[1, 2, 3, 4, 5].map((star) => {
                const active = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1.5 transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        active
                          ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">আপনার নাম (ঐচ্ছিক)</label>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 mb-1">ফিডব্যাকের বিষয়</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="ডিজাইন ও অ্যাপ পরামর্শ">ডিজাইন ও অ্যাপ পরামর্শ</option>
                  <option value="নতুন ফিচার রিকোয়েস্ট">নতুন ফিচার রিকোয়েস্ট</option>
                  <option value="কাস্টম গ্রাফিক্স / ব্র্যান্ডিং অর্ডার">
                    কাস্টম গ্রাফিক্স / ব্র্যান্ডিং অর্ডার
                  </option>
                  <option value="বাগ বা সমস্যা রিপোর্ট">বাগ বা সমস্যা রিপোর্ট</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                আপনার পরামর্শ বা মতামত লিখুন:
              </label>
              <textarea
                rows={3}
                placeholder="আপনার মূল্যবান পরামর্শ বা মতামত এখানে লিখুন..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {submittedNotice && (
              <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 font-medium text-center">
                জাযাকাল্লাহু খাইরান! আপনার রেটিং ও মতামত সংরক্ষিত হয়েছে। চাইলে নিচের বাটনে ক্লিক করে সরাসরি হোয়াটসঅ্যাপেও পাঠাতে পারেন।
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>রেটিং ও ফিডব্যাক সেভ করুন</span>
              </button>

              <a
                href={buildWhatsAppFeedbackUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>হোয়াটসঅ্যাপে পাঠান (০১৮৮৬১০১৮২৪)</span>
              </a>
            </div>
          </form>

          {/* Recent Saved Feedbacks */}
          {savedFeedbacks.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-slate-400">আপনার সংরক্ষিত মতামত সমূহ:</h5>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {savedFeedbacks.map((fb) => (
                  <div
                    key={fb.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{fb.name}</span>
                        <span className="text-[11px] text-amber-400">
                          {'★'.repeat(fb.rating)}
                        </span>
                        <span className="text-[10px] text-slate-500">{fb.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{fb.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
