import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/LanguageContext';
import SectionImage from '../components/SectionImage';

interface ChecklistItem {
  id: string;
  en: string;
  he: string;
  emoji: string;
}

interface ChecklistCategory {
  titleEn: string;
  titleHe: string;
  emoji: string;
  items: ChecklistItem[];
}

const categories: ChecklistCategory[] = [
  {
    titleEn: 'Seder Plate', titleHe: 'קערת הסדר', emoji: '🍽️',
    items: [
      { id: 'zeroa', en: 'Shank bone (Zeroa)', he: 'זרוע (עצם)', emoji: '🦴' },
      { id: 'beitzah', en: 'Roasted egg (Beitzah)', he: 'ביצה קלויה', emoji: '🥚' },
      { id: 'maror', en: 'Bitter herbs — horseradish (Maror)', he: 'מרור — חזרת', emoji: '🥬' },
      { id: 'charoset', en: 'Charoset (apples, nuts, wine, cinnamon)', he: 'חרוסת (תפוחים, אגוזים, יין, קינמון)', emoji: '🟫' },
      { id: 'karpas', en: 'Vegetable for dipping — parsley or celery (Karpas)', he: 'כרפס — פטרוזיליה או סלרי', emoji: '🌿' },
      { id: 'chazeret', en: 'Romaine lettuce (Chazeret)', he: 'חזרת (חסה)', emoji: '🥗' },
    ],
  },
  {
    titleEn: 'Matzah & Wine', titleHe: 'מצה ויין', emoji: '🫓',
    items: [
      { id: 'matzah', en: 'Matzah (at least 3 whole matzot)', he: 'מצות (לפחות 3 שלמות)', emoji: '🫓' },
      { id: 'wine', en: 'Wine or grape juice (4 cups per person)', he: 'יין או מיץ ענבים (4 כוסות לאדם)', emoji: '🍷' },
      { id: 'elijah-cup', en: 'Cup of Elijah (a large goblet)', he: 'כוס אליהו (גביע גדול)', emoji: '🏆' },
      { id: 'miriam-cup', en: 'Cup of Miriam — optional (filled with water)', he: 'כוס מרים — אופציונלי (מלאה מים)', emoji: '💧' },
    ],
  },
  {
    titleEn: 'Salt Water & Extras', titleHe: 'מי מלח ותוספות', emoji: '🧂',
    items: [
      { id: 'salt-water', en: 'Salt water (bowl for dipping)', he: 'מי מלח (קערה לטבילה)', emoji: '🥣' },
      { id: 'hard-eggs', en: 'Hard-boiled eggs (to start the meal)', he: 'ביצים קשות (לתחילת הארוחה)', emoji: '🥚' },
      { id: 'afikoman-cloth', en: 'Cloth or bag to wrap the Afikoman', he: 'מפית או שקית לאפיקומן', emoji: '🧶' },
      { id: 'afikoman-gift', en: 'Afikoman prize for the children', he: 'פרס אפיקומן לילדים', emoji: '🎁' },
    ],
  },
  {
    titleEn: 'Table Setup', titleHe: 'עריכת השולחן', emoji: '🕯️',
    items: [
      { id: 'candles', en: 'Shabbat/holiday candles', he: 'נרות שבת/חג', emoji: '🕯️' },
      { id: 'tablecloth', en: 'White tablecloth', he: 'מפה לבנה', emoji: '🏳️' },
      { id: 'pillows', en: 'Pillows for reclining', he: 'כריות להסבה', emoji: '🛋️' },
      { id: 'haggadot', en: 'Haggadot for all guests', he: 'הגדות לכל המסובים', emoji: '📖' },
      { id: 'kiddush-cups', en: 'Kiddush cups / wine glasses', he: 'כוסות קידוש', emoji: '🥂' },
      { id: 'seder-plate-dish', en: 'Seder plate', he: 'צלחת הסדר', emoji: '🍽️' },
      { id: 'washing-cup', en: 'Washing cup and bowl (Netilat Yadayim)', he: 'כלי נטילת ידיים וקערה', emoji: '🫗' },
    ],
  },
  {
    titleEn: 'The Meal', titleHe: 'הארוחה', emoji: '🍲',
    items: [
      { id: 'main-dish', en: 'Main dish (chicken, brisket, fish, etc.)', he: 'מנה עיקרית (עוף, בשר, דג וכו׳)', emoji: '🍗' },
      { id: 'side-dishes', en: 'Side dishes (potato kugel, salads, etc.)', he: 'תוספות (קוגל תפוחי אדמה, סלטים וכו׳)', emoji: '🥗' },
      { id: 'soup', en: 'Soup with matzah balls — optional', he: 'מרק עם קניידלך — אופציונלי', emoji: '🍲' },
      { id: 'dessert', en: 'Kosher for Passover dessert', he: 'קינוח כשר לפסח', emoji: '🍰' },
    ],
  },
  {
    titleEn: 'Don\'t Forget!', titleHe: '!אל תשכחו', emoji: '⚠️',
    items: [
      { id: 'chametz-search', en: 'Search for chametz (Bedikat Chametz)', he: 'בדיקת חמץ', emoji: '🔦' },
      { id: 'chametz-burn', en: 'Burn/dispose of chametz (Biur Chametz)', he: 'ביעור חמץ', emoji: '🔥' },
      { id: 'kitchen-clean', en: 'Clean kitchen of all chametz', he: 'ניקוי המטבח מחמץ', emoji: '🧹' },
      { id: 'sell-chametz', en: 'Sell chametz through your rabbi', he: 'מכירת חמץ דרך הרב', emoji: '📜' },
    ],
  },
];

const STORAGE_KEY = 'haggadah-checklist';

export default function Checklist() {
  const { isHebrew } = useLanguage();
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = checked.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const clearAll = () => setChecked(new Set());

  return (
    <div className="max-w-2xl mx-auto pt-8 pb-24 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-4xl mb-2">📋</div>
        <h2 className="font-display text-2xl md:text-3xl text-gold mb-1">
          {isHebrew ? 'רשימת הכנות לפסח' : 'Pesach Preparation Checklist'}
        </h2>
        <p className="text-parchment/50 text-sm">
          {isHebrew ? 'סמנו את כל הפריטים שהכנתם' : 'Check off everything you\'ve prepared'}
        </p>

        {/* Progress */}
        <div className="mt-4 max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-parchment/40 mb-1">
            <span>{checkedCount}/{totalItems}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden" style={{ direction: 'ltr' }}>
            <motion.div
              className="h-full bg-gold/70 rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', damping: 20 }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gold text-sm mt-2"
            >
              {isHebrew ? '!הכל מוכן! חג שמח' : 'All set! Chag Sameach!'}  ✨
            </motion.p>
          )}
        </div>

        {checkedCount > 0 && (
          <button
            onClick={clearAll}
            className="mt-3 text-xs text-parchment/30 hover:text-parchment/60 transition-colors"
          >
            {isHebrew ? 'נקה הכל' : 'Clear all'}
          </button>
        )}
      </motion.div>

      <SectionImage src="/images/generated/seder-plate.png" alt="Seder plate" />

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((cat, ci) => {
          const catChecked = cat.items.filter(item => checked.has(item.id)).length;
          const allDone = catChecked === cat.items.length;

          return (
            <motion.div
              key={cat.titleEn}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.05 }}
              className={`rounded-xl border p-4 transition-colors ${
                allDone ? 'bg-gold/5 border-gold/20' : 'bg-white/3 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 mb-3" style={{ direction: isHebrew ? 'rtl' : 'ltr' }}>
                <span className="text-xl">{cat.emoji}</span>
                <h3 className={`font-display text-lg text-gold ${allDone ? 'line-through opacity-60' : ''}`}>
                  {isHebrew ? cat.titleHe : cat.titleEn}
                </h3>
                <span className="text-parchment/30 text-xs ms-auto">{catChecked}/{cat.items.length}</span>
              </div>

              <div className="space-y-1">
                {cat.items.map(item => {
                  const isChecked = checked.has(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggle(item.id)}
                      style={{ direction: isHebrew ? 'rtl' : 'ltr' }}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                        isChecked
                          ? 'bg-gold/10 text-parchment/50'
                          : 'hover:bg-white/5 active:bg-white/8 text-parchment/80'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${
                        isChecked ? 'bg-gold border-gold' : 'border-parchment/30'
                      }`}>
                        {isChecked && <span className="text-midnight text-xs">✓</span>}
                      </div>
                      <span className="text-lg">{item.emoji}</span>
                      <span className={`text-sm flex-1 text-start ${isChecked ? 'line-through' : ''} ${isHebrew ? 'font-hebrew' : ''}`}>
                        {isHebrew ? item.he : item.en}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
