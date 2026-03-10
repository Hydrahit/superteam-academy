'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, XCircle, Trophy } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  lessonTitle: string;
  onComplete: (score: number, total: number) => void;
}

export default function QuizModal({ isOpen, onClose, questions, lessonTitle, onComplete }: QuizModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIdx];
  const isCorrect = selectedAnswer === current?.correctAnswer;

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === current.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete(score + (isCorrect ? 0 : 0), questions.length);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl mx-4 rounded-2xl border border-white/10 bg-[#0A0A0F] p-8 shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>

          {!finished ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-display font-bold text-white">Quiz: {lessonTitle}</h3>
                <span className="text-sm text-white/40 font-mono">
                  {currentIdx + 1}/{questions.length}
                </span>
              </div>

              <div className="h-1 rounded-full bg-white/10 mb-8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00C896] to-[#9945FF] transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              <p className="text-white text-lg mb-6 leading-relaxed">{current.question}</p>

              <div className="space-y-3 mb-6">
                {current.options.map((option, idx) => {
                  let optionStyle = 'border-white/10 hover:border-white/30 text-white/70 hover:text-white';
                  if (showResult) {
                    if (idx === current.correctAnswer) {
                      optionStyle = 'border-green-500/50 bg-green-500/10 text-green-400';
                    } else if (idx === selectedAnswer && !isCorrect) {
                      optionStyle = 'border-red-500/50 bg-red-500/10 text-red-400';
                    } else {
                      optionStyle = 'border-white/5 text-white/30';
                    }
                  } else if (selectedAnswer === idx) {
                    optionStyle = 'border-[#00C896]/50 bg-[#00C896]/10 text-[#00C896]';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={showResult}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 ${optionStyle}`}
                    >
                      <span className="font-mono text-xs mr-3 opacity-50">{String.fromCharCode(65 + idx)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm text-white/60">{current.explanation}</p>
                </motion.div>
              )}

              {showResult && (
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#9945FF] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-[#00C896]" />
              <h3 className="text-2xl font-display font-bold text-white mb-2">Quiz Complete!</h3>
              <p className="text-4xl font-mono font-bold text-[#00C896] mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-white/50 mb-8">
                {score === questions.length
                  ? 'Perfect score! You nailed it.'
                  : score >= questions.length * 0.7
                  ? 'Great job! You passed.'
                  : 'Keep studying and try again.'}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#9945FF] text-white font-bold hover:opacity-90 transition-opacity"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
