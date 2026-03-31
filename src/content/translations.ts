import type { Lang } from '../hooks/LanguageContext';

const strings: Record<string, { en: string; he: string }> = {
  // Top bar
  'app.title': { en: 'Haggadah Shel Pesach', he: 'הגדה של פסח' },

  // Navigation
  'nav.back': { en: 'Back', he: 'חזרה' },
  'nav.next': { en: 'Next', he: 'הבא' },
  'nav.begin': { en: 'Begin', he: 'התחלה' },
  'nav.stepOf': { en: 'of 15', he: 'מתוך 15' },
  'nav.haggadah': { en: 'Haggadah', he: 'הגדה' },

  // Hero
  'hero.subtitle': {
    en: 'The telling of the story of our Exodus from Egypt — an interactive journey through the Passover Seder',
    he: 'סיפור יציאת מצרים — מסע אינטראקטיבי דרך סדר הפסח',
  },
  'hero.begin': { en: 'BEGIN THE SEDER →', he: '← התחילו את הסדר' },

  // Footer
  'footer.chagSameach': { en: 'Chag Sameach', he: 'חג שמח' },
  'footer.happyPassover': { en: 'Happy Passover!', he: 'פסח שמח!' },
  'footer.interactive': { en: 'An interactive Haggadah experience', he: 'חוויית הגדה אינטראקטיבית' },
  'footer.return': { en: '← Return to beginning', he: 'חזרה להתחלה →' },

  // Section text
  'section.readAloud': { en: 'Read Aloud', he: 'הקראה' },
  'section.stop': { en: 'Stop', he: 'עצור' },
  'section.commentary': { en: 'Commentary', he: 'פרשנות' },
  'section.stepPrefix': { en: 'Step', he: 'שלב' },

  // Narration settings
  'settings.speed': { en: 'Speed:', he: ':מהירות' },
  'settings.voice': { en: 'Voice:', he: ':קול' },

  // Kadesh
  'kadesh.tapToPour': { en: 'Tap the cup to pour wine', he: 'לחצו על הכוס למזוג יין' },

  // Urchatz
  'urchatz.washHands': { en: 'Wash Hands', he: 'נטילת ידיים' },
  'urchatz.washing': { en: 'Washing...', he: '...רוחצים' },
  'urchatz.purified': { en: 'Hands purified', he: 'הידיים טוהרו' },
  'urchatz.noBlessing': { en: 'No blessing is recited for this washing', he: 'נטילה זו ללא ברכה' },

  // Karpas
  'karpas.tapToDip': { en: 'Tap to dip the vegetable in salt water', he: 'לחצו לטבול את הירק במי מלח' },
  'karpas.dipping': { en: 'Dipping...', he: '...טובלים' },
  'karpas.tears': { en: 'We taste the tears of our ancestors', he: 'אנו טועמים את דמעות אבותינו' },

  // Yachatz
  'yachatz.tapToBreak': { en: 'Tap to break the matzah', he: 'לחצו לשבור את המצה' },
  'yachatz.smallerPiece': { en: 'Smaller piece', he: 'חלק קטן' },
  'yachatz.afikoman': { en: 'Afikoman', he: 'אפיקומן' },

  // Four Questions
  'fourQ.title': { en: 'Mah Nishtana — The Four Questions', he: 'מה נשתנה — ארבע הקושיות' },
  'fourQ.subtitle': { en: 'Test your knowledge! Answer each question correctly.', he: 'בחנו את הידע שלכם! ענו נכון על כל שאלה.' },
  'fourQ.correct': { en: 'CORRECT!', he: '!נכון' },
  'fourQ.wrong': { en: 'NOT QUITE...', he: '...לא בדיוק' },
  'fourQ.perfect': { en: 'Perfect! A True Wise Child!', he: '!מושלם! חכם אמיתי' },
  'fourQ.wellDone': { en: 'Well Done!', he: '!כל הכבוד' },
  'fourQ.keepLearning': { en: 'Keep Learning!', he: '!המשיכו ללמוד' },
  'fourQ.score': { en: 'You answered {score} out of 4 questions correctly', he: 'ענית נכון על {score} מתוך 4 שאלות' },
  'fourQ.tryAgain': { en: 'TRY AGAIN', he: 'נסו שוב' },

  // Four Sons
  'fourSons.title': { en: 'The Four Sons', he: 'ארבעה בנים' },
  'fourSons.tapToReveal': { en: 'Tap each card to reveal the response', he: 'לחצו על כל כרטיס לחשוף את התשובה' },
  'fourSons.response': { en: 'The Response:', he: ':התשובה' },
  'fourSons.tapToFlip': { en: 'Tap to see the response', he: 'לחצו לראות את התשובה' },
  'fourSons.tapBack': { en: 'Tap to flip back', he: 'לחצו לחזור' },

  // Ten Plagues
  'plagues.tapToRemove': { en: 'Tap each plague to remove a drop of wine from your cup', he: 'לחצו על כל מכה להסיר טיפת יין מהכוס' },
  'plagues.count': { en: '{n}/10 plagues', he: '{n}/10 מכות' },

  // Dayenu
  'dayenu.title': { en: 'Dayenu — It Would Have Been Enough', he: 'דיינו — היה מספיק' },
  'dayenu.subtitle': { en: 'How many levels of goodness has God bestowed upon us!', he: '!כמה מעלות טובות למקום עלינו' },
  'dayenu.singAlong': { en: 'SING ALONG', he: 'שירו יחד' },
  'dayenu.stop': { en: 'STOP', he: 'עצרו' },

  // Maror
  'maror.tapForBitterness': { en: 'Tap for a taste of bitterness', he: 'לחצו לטעום מרירות' },

  // Korech
  'korech.addLayer': { en: 'Add {layer}', he: 'הוסיפו {layer}' },
  'korech.complete': { en: 'Sandwich complete!', he: '!הכריך מוכן' },

  // Tzafun
  'tzafun.time': { en: 'Time:', he: ':זמן' },
  'tzafun.searched': { en: 'Searched:', he: ':חיפשתם' },
  'tzafun.found': { en: 'You Found the Afikoman!', he: '!מצאתם את האפיקומן' },
  'tzafun.playAgain': { en: 'PLAY AGAIN', he: 'שחקו שוב' },
  'tzafun.warmer': { en: '🔥 Getting warmer!', he: '🔥 !מתחממים' },
  'tzafun.warm': { en: '🌡️ Warm...', he: '🌡️ ...חם' },
  'tzafun.cold': { en: '❄️ Cold! Try somewhere else.', he: '❄️ .קר! נסו מקום אחר' },

  // Barech
  'barech.cupOfElijah': { en: 'The Cup of Elijah', he: 'כוס אליהו' },
  'barech.openDoor': { en: 'Tap to open the door for Elijah', he: 'לחצו לפתוח את הדלת לאליהו' },
  'barech.welcome': { en: 'Welcome, Elijah!', he: '!ברוך הבא, אליהו' },

  // Hallel
  'hallel.fourthCup': { en: 'The Fourth Cup of Wine', he: 'כוס רביעית' },

  // Nirtzah
  'nirtzah.nextYear': { en: 'NEXT YEAR IN JERUSALEM!', he: '!לשנה הבאה בירושלים' },
  'nirtzah.chadGadya': { en: 'Chad Gadya — One Little Goat', he: 'חד גדיא' },
  'nirtzah.echadMiYodea': { en: 'Echad Mi Yodea — Who Knows One?', he: 'אחד מי יודע' },
};

let currentLang: Lang = 'en';

export function setTranslationLang(lang: Lang) {
  currentLang = lang;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const entry = strings[key];
  if (!entry) return key;
  let text = entry[currentLang] || entry.en;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, String(v));
    }
  }
  return text;
}
