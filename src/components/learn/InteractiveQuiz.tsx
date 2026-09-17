'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw } from 'lucide-react';

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  topicTitle: string;
}

export function InteractiveQuiz({ questions, topicTitle }: InteractiveQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (showResults[questionId]) return; // already submitted
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleReset = (questionId: string) => {
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
    setShowResults((prev) => {
      const copy = { ...prev };
      delete copy[questionId];
      return copy;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" /> Kuis & Uji Pemahaman: {topicTitle}
        </h3>
        <span className="text-xs text-slate-400">Instan Feedback</span>
      </div>

      <div className="space-y-4">
        {questions.map((q, qIndex) => {
          const isAnswered = showResults[q.id];
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correctIndex;

          return (
            <div
              key={q.id}
              className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                  {qIndex + 1}
                </span>
                <div className="font-semibold text-sm text-slate-100">{q.question}</div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-2 pl-8">
                {q.options.map((option, optIdx) => {
                  let btnStyle =
                    'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60';

                  if (isAnswered) {
                    if (optIdx === q.correctIndex) {
                      btnStyle =
                        'border-emerald-500/60 bg-emerald-950/30 text-emerald-300 font-semibold shadow-sm';
                    } else if (optIdx === selected && !isCorrect) {
                      btnStyle = 'border-rose-500/60 bg-rose-950/30 text-rose-300 font-medium';
                    } else {
                      btnStyle = 'border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60';
                    }
                  } else if (selected === optIdx) {
                    btnStyle = 'border-cyan-500 bg-cyan-950/30 text-cyan-300';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={isAnswered}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswered && optIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {isAnswered && optIdx === selected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Feedback */}
              {isAnswered && (
                <div className="pl-8 pt-2">
                  <div
                    className={`rounded-lg p-3 border text-xs space-y-1.5 ${
                      isCorrect
                        ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300'
                        : 'border-rose-500/30 bg-rose-950/20 text-rose-300'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{isCorrect ? ' Jawaban Kamu Benar!' : ' Kurang Tepat!'}</span>
                      <button
                        onClick={() => handleReset(q.id)}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-slate-900 px-2 py-0.5 rounded border border-slate-700"
                      >
                        <RotateCcw className="w-3 h-3" /> Coba Lagi
                      </button>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
