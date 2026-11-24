import React, { useEffect, useMemo, useState } from 'react';
import { Clock, RotateCcw, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion, UnitId } from '../types/deco';

interface Props {
  bestScore: number | null;
  autoStartMockSignal: number;
  onCompleteQuiz: (scorePct: number, unitBreakdown: Record<string, number>) => void;
}

type QuizMode = 'setup' | 'active' | 'results';

export const QuizView: React.FC<Props> = ({
  bestScore,
  autoStartMockSignal,
  onCompleteQuiz,
}) => {
  const [mode, setMode] = useState<QuizMode>('setup');
  const [unitChoice, setUnitChoice] = useState<'all' | Exclude<UnitId, 'gaps'>>('all');
  const [questionCount, setQuestionCount] = useState<number>(15);
  const [timedMode, setTimedMode] = useState<boolean>(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(15 * 60);

  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showInstantFeedback, setShowInstantFeedback] = useState<boolean>(true);

  const startSession = (
    unit: 'all' | Exclude<UnitId, 'gaps'> = unitChoice,
    count: number = questionCount,
    customList?: QuizQuestion[]
  ) => {
    const pool = customList
      ? customList
      : QUIZ_QUESTIONS.filter((q) => (unit === 'all' ? true : q.unit === unit));

    // Deterministic shuffle per start
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length));
    setSessionQuestions(shuffled);
    setAnswers({});
    setCurrentIndex(0);
    setSecondsLeft(shuffled.length * 60);
    setMode('active');
  };

  useEffect(() => {
    if (autoStartMockSignal > 0) {
      setUnitChoice('all');
      setQuestionCount(20);
      setTimedMode(true);
      setShowInstantFeedback(false);
      startSession('all', 20);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStartMockSignal]);

  useEffect(() => {
    if (mode !== 'active' || !timedMode) return;
    if (secondsLeft <= 0) {
      finishSession();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timedMode, secondsLeft]);

  const finishSession = () => {
    const unitCorrect: Record<string, { right: number; total: number }> = {};
    let correctCount = 0;
    sessionQuestions.forEach((q) => {
      if (!unitCorrect[q.unit]) unitCorrect[q.unit] = { right: 0, total: 0 };
      unitCorrect[q.unit].total += 1;
      if (answers[q.id] === q.correctIndex) {
        correctCount += 1;
        unitCorrect[q.unit].right += 1;
      }
    });
    const pct =
      sessionQuestions.length > 0 ? Math.round((correctCount / sessionQuestions.length) * 100) : 0;
    const breakdown: Record<string, number> = {};
    Object.entries(unitCorrect).forEach(([u, val]) => {
      breakdown[u] = Math.round((val.right / val.total) * 100);
    });
    onCompleteQuiz(pct, breakdown);
    setMode('results');
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const activeQuestion = sessionQuestions[currentIndex];
  const selectedOption = activeQuestion ? answers[activeQuestion.id] : undefined;

  const incorrectQuestions = useMemo(
    () => sessionQuestions.filter((q) => answers[q.id] !== q.correctIndex),
    [sessionQuestions, answers]
  );

  const unitLabel = (u: string) => {
    switch (u) {
      case 'unit1':
        return 'Unit I';
      case 'unit2':
        return 'Unit II';
      case 'unit3':
        return 'Unit III';
      case 'unit4':
        return 'Unit IV';
      case 'unit5':
        return 'Unit V';
      default:
        return u;
    }
  };

  if (mode === 'setup') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
              Exam Practice Engine · {QUIZ_QUESTIONS.length} Verified Course Questions
            </div>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Configure Unit Practice or Timed Mock Exam
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Questions drawn directly from the official Course File Quiz Bank, Quiz 01, Class Form Assessments, and CIE-2 practice problems.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">1. Select Scope</div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: `Full Syllabus (${QUIZ_QUESTIONS.length})` },
                { id: 'unit1', label: 'Unit I (Structure & Data Rep)' },
                { id: 'unit2', label: 'Unit II (Logic & Sequential)' },
                { id: 'unit3', label: 'Unit III (Arithmetic & RTL)' },
                { id: 'unit4', label: 'Unit IV (I/O & Memory)' },
                { id: 'unit5', label: 'Unit V (RISC & Pipelining)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setUnitChoice(opt.id as typeof unitChoice)}
                  className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    unitChoice === opt.id
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">2. Number of Questions</div>
              <div className="flex gap-2">
                {[10, 15, 25, 40].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setQuestionCount(n)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold tabular-nums cursor-pointer ${
                      questionCount === n
                        ? 'bg-sky-700 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {n} Qs
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">3. Mode &amp; Feedback</div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowInstantFeedback(true)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    showInstantFeedback
                      ? 'bg-sky-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Study (Instant)
                </button>
                <button
                  type="button"
                  onClick={() => setShowInstantFeedback(false)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    !showInstantFeedback
                      ? 'bg-sky-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Exam (End Reveal)
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-5">
            <label className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={timedMode}
                onChange={(e) => setTimedMode(e.target.checked)}
                className="rounded border-slate-300 accent-sky-700"
              />
              Enable Exam Countdown Timer (1 min / question)
            </label>
            <button
              type="button"
              onClick={() => startSession()}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Launch Practice Session
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <h2 className="text-base font-bold text-slate-900">Your Exam Readiness</h2>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 tabular-nums">
            <div className="text-xs font-medium text-slate-500">Best Recorded Mock Score</div>
            <div className="mt-1 text-3xl font-bold text-slate-900">
              {bestScore !== null ? `${bestScore}%` : 'Not attempted'}
            </div>
          </div>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong>Study Mode</strong> shows the official step-by-step explanation immediately after selecting an option.
            </p>
            <p>
              <strong>Exam Mode</strong> simulates CIE/SEE conditions, scoring all responses and breaking down weak units upon submission.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'active' && activeQuestion) {
    const answeredCount = Object.keys(answers).length;
    const isAnswered = selectedOption !== undefined;
    const isCorrect = selectedOption === activeQuestion.correctIndex;

    return (
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Progress & Timer Header */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 flex flex-wrap items-center justify-between gap-4 tabular-nums">
          <div className="text-sm font-semibold text-slate-800">
            Question {currentIndex + 1} of {sessionQuestions.length} · {unitLabel(activeQuestion.unit)} · {activeQuestion.source}
          </div>
          <div className="flex items-center gap-4">
            {timedMode && (
              <div className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-slate-800">
                <Clock className="w-4 h-4 text-sky-700" />
                {formatTimer(secondsLeft)}
              </div>
            )}
            <button
              type="button"
              onClick={finishSession}
              className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              Submit ({answeredCount}/{sessionQuestions.length})
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-7 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {activeQuestion.question}
          </h2>

          <div className="space-y-2.5">
            {activeQuestion.options.map((opt, idx) => {
              const chosen = selectedOption === idx;
              const rightOpt = idx === activeQuestion.correctIndex;
              let btnStyle =
                'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
              if (showInstantFeedback && isAnswered) {
                if (rightOpt) btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                else if (chosen) btnStyle = 'border-red-400 bg-red-50 text-red-900';
              } else if (chosen) {
                btnStyle = 'border-sky-600 bg-sky-50 text-sky-950 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (showInstantFeedback && isAnswered) return;
                    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: idx }));
                  }}
                  className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-colors flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="font-mono font-bold text-slate-500 shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span className="flex-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {showInstantFeedback && isAnswered && (
            <div
              className={`rounded-lg border p-4 text-sm ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                  : 'border-red-300 bg-red-50 text-red-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Correct Answer
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-700" /> Incorrect — Option{' '}
                    {String.fromCharCode(65 + activeQuestion.correctIndex)} is correct
                  </>
                )}
              </div>
              <p className="leading-relaxed">{activeQuestion.explanation}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>

            {currentIndex < sessionQuestions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => i + 1)}
                className="rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
              >
                Next Question
              </button>
            ) : (
              <button
                type="button"
                onClick={finishSession}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer"
              >
                Finish &amp; Grade Exam
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Results Mode
  const correctTotal = sessionQuestions.length - incorrectQuestions.length;
  const pct =
    sessionQuestions.length > 0 ? Math.round((correctTotal / sessionQuestions.length) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 tabular-nums">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
            Session Complete
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-slate-900">
            Score: {correctTotal} / {sessionQuestions.length} ({pct}%)
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            {pct >= 75
              ? '● Strong exam readiness across tested DECO units.'
              : '▲ Review missed concepts below and retry weak units.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {incorrectQuestions.length > 0 && (
            <button
              type="button"
              onClick={() => startSession(unitChoice, incorrectQuestions.length, incorrectQuestions)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-700 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry {incorrectQuestions.length} Missed
            </button>
          )}
          <button
            type="button"
            onClick={() => setMode('setup')}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
          >
            New Practice Setup
          </button>
        </div>
      </section>

      <div className="space-y-3">
        {sessionQuestions.map((q, idx) => {
          const picked = answers[q.id];
          const ok = picked === q.correctIndex;
          return (
            <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-5 space-y-2">
              <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                <span className="text-slate-500">
                  Q{idx + 1} · {unitLabel(q.unit)} · {q.source}
                </span>
                <span className={ok ? 'text-emerald-700' : 'text-red-700'}>
                  {ok ? '● CORRECT' : '✕ INCORRECT'}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900">{q.question}</div>
              <div className="text-xs text-slate-700">
                <span className="font-semibold">Correct Answer:</span>{' '}
                {q.options[q.correctIndex]}
                {!ok && picked !== undefined && (
                  <span className="ml-3 text-red-700">
                    (Your choice: {q.options[picked]})
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-600 bg-slate-50 rounded p-2.5 border border-slate-100">
                {q.explanation}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
