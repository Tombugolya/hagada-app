import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fourQuestionsQuiz } from '../../content/haggadah';
import { t } from '../../content/translations';
import { useLanguage } from '../../hooks/LanguageContext';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import SectionImage from '../../components/SectionImage';

// Shuffle once per question index, not on every render
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function FourQuestions() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const { play } = useSoundEffect();
  const { isHebrew } = useLanguage();

  const question = fourQuestionsQuiz[currentQ];

  // Get the right language versions
  const correctAnswer = isHebrew ? (question?.correctAnswerHe || question?.correctAnswer) : question?.correctAnswer;
  const wrongAnswers = isHebrew ? (question?.wrongAnswersHe || question?.wrongAnswers) : question?.wrongAnswers;
  const explanation = isHebrew ? (question?.explanationHe || question?.explanation) : question?.explanation;
  const questionText = isHebrew ? question?.questionHebrew : question?.question;

  // Shuffle answers ONCE per question + reset, not every render
  const allAnswers = useMemo(() => {
    if (!correctAnswer || !wrongAnswers) return [];
    return shuffleArray([...wrongAnswers, correctAnswer]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQ, resetKey, isHebrew]);

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    const correct = answer === correctAnswer;
    if (correct) {
      play('chime');
      setScore(s => s + 1);
    } else {
      play('pop');
    }
    setShowResult(true);

    setTimeout(() => {
      if (currentQ < fourQuestionsQuiz.length - 1) {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setCompleted(true);
        play('success');
      }
    }, 3000);
  };

  const reset = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setCompleted(false);
    setResetKey(k => k + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <h3 className="font-display text-xl sm:text-2xl text-gold text-center mb-1">{t('fourQ.title')}</h3>
      {!isHebrew && <p className="hebrew-text text-center text-gold-light/80 text-lg sm:text-xl mb-1 sm:mb-2">מַה נִּשְׁתַּנָּה</p>}
      <p className="text-center text-parchment/50 text-xs sm:text-sm mb-4 sm:mb-8">{t('fourQ.subtitle')}</p>
      <SectionImage src="/images/generated/four-questions.png" alt="A child asking the Four Questions" />

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {fourQuestionsQuiz.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i < currentQ ? 'bg-gold' :
              i === currentQ ? 'bg-gold scale-125 ring-2 ring-gold/30' :
              'bg-white/10'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!completed ? (
          <motion.div
            key={`${currentQ}-${resetKey}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            {/* Question */}
            <div className="p-4 sm:p-6 rounded-xl bg-white/5 border border-gold/20 text-center">
              <p className="hebrew-text text-gold-light text-sm sm:text-lg mb-2 sm:mb-3">{question.questionHebrew}</p>
              {!isHebrew && <p className="text-parchment text-base sm:text-xl font-medium">{questionText}</p>}
            </div>

            {/* Answers */}
            <div className="space-y-3">
              {allAnswers.map((answer, i) => {
                let bg = 'bg-white/5 hover:bg-white/10 border-white/10';
                if (selected) {
                  if (answer === correctAnswer) {
                    bg = 'bg-green-900/40 border-green-500/50';
                  } else if (answer === selected) {
                    bg = 'bg-red-900/40 border-red-500/50';
                  } else {
                    bg = 'bg-white/5 border-white/5 opacity-50';
                  }
                }

                return (
                  <motion.button
                    key={answer}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleAnswer(answer)}
                    disabled={!!selected}
                    className={`w-full p-3 sm:p-4 rounded-lg border text-left transition-all cursor-pointer ${bg} ${
                      !selected ? 'hover:border-gold/30' : ''
                    }`}
                  >
                    <span className={`text-parchment text-sm sm:text-base ${isHebrew ? 'font-hebrew' : ''}`}>{answer}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl bg-gold/5 border border-gold/15"
                >
                  <p className="text-gold text-sm font-display tracking-wider mb-1">
                    {selected === correctAnswer ? t('fourQ.correct') : t('fourQ.wrong')}
                  </p>
                  <p className={`text-parchment/80 text-base ${isHebrew ? 'font-hebrew' : ''}`}>{explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-10 rounded-2xl bg-gradient-to-b from-gold/10 to-transparent border border-gold/20"
          >
            <div className="text-5xl mb-4">{score === 4 ? '🌟' : score >= 2 ? '👏' : '📚'}</div>
            <h4 className="font-display text-2xl text-gold mb-2">
              {score === 4 ? t('fourQ.perfect') :
               score >= 2 ? t('fourQ.wellDone') : t('fourQ.keepLearning')}
            </h4>
            <p className="text-parchment/70 text-lg mb-6">
              {t('fourQ.score', { score })}
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors font-display text-sm tracking-wider"
            >
              {t('fourQ.tryAgain')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
