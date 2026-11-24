/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Cpu, RotateCcw } from 'lucide-react';
import { COURSE_UNITS } from './data/syllabus';
import { QUESTION_BANK } from './data/questionBank';
import { StudyProgress, UnitId } from './types/deco';
import { SyllabusView } from './components/SyllabusView';
import { QuestionBankView } from './components/QuestionBankView';
import { LabsView } from './components/LabsView';
import { QuizView } from './components/QuizView';
import { ResourcesView } from './components/ResourcesView';

type ActiveSection = 'syllabus' | 'questions' | 'labs' | 'quiz' | 'resources';

const STORAGE_KEY = 'deco_u24ec304_progress_v1';

const DEFAULT_PROGRESS: StudyProgress = {
  completedTopicIds: [],
  reviewedQuestionIds: [],
  bookmarkedQuestionIds: [],
  quizBestScore: null,
  quizAttempts: 0,
  unitMasteryScores: {},
};

const NAV_ITEMS: { id: ActiveSection; label: string }[] = [
  { id: 'syllabus', label: 'Syllabus & Notes' },
  { id: 'questions', label: 'Question Bank' },
  { id: 'labs', label: 'Hardware Labs' },
  { id: 'quiz', label: 'Practice Exam' },
  { id: 'resources', label: 'Drive Vault' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('syllabus');
  const [questionUnitFilter, setQuestionUnitFilter] = useState<UnitId | 'all'>('all');
  const [labIndex, setLabIndex] = useState<number>(0);
  const [mockSignal, setMockSignal] = useState<number>(0);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);

  const [progress, setProgress] = useState<StudyProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage errors
    }
  }, [progress]);

  const totalTopics = COURSE_UNITS.reduce((sum, u) => sum + u.topics.length, 0);
  const topicPct =
    totalTopics > 0 ? Math.round((progress.completedTopicIds.length / totalTopics) * 100) : 0;

  const toggleTopic = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTopicIds.includes(topicId);
      return {
        ...prev,
        completedTopicIds: exists
          ? prev.completedTopicIds.filter((id) => id !== topicId)
          : [...prev.completedTopicIds, topicId],
      };
    });
  };

  const toggleReviewed = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.reviewedQuestionIds.includes(questionId);
      return {
        ...prev,
        reviewedQuestionIds: exists
          ? prev.reviewedQuestionIds.filter((id) => id !== questionId)
          : [...prev.reviewedQuestionIds, questionId],
      };
    });
  };

  const toggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedQuestionIds.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestionIds: exists
          ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId],
      };
    });
  };

  const handleCompleteQuiz = (scorePct: number, breakdown: Record<string, number>) => {
    setProgress((prev) => ({
      ...prev,
      quizAttempts: prev.quizAttempts + 1,
      quizBestScore:
        prev.quizBestScore === null ? scorePct : Math.max(prev.quizBestScore, scorePct),
      unitMasteryScores: { ...prev.unitMasteryScores, ...breakdown },
    }));
  };

  const handleJumpToQuestions = (unit: UnitId) => {
    setQuestionUnitFilter(unit);
    setActiveSection('questions');
  };

  const handleJumpToLab = (index: number) => {
    setLabIndex(index);
    setActiveSection('labs');
  };

  const handleStartMockExam = () => {
    setActiveSection('quiz');
    setMockSignal((s) => s + 1);
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setConfirmReset(false);
  };

  return (
    <div className="min-h-screen blueprint-grid text-slate-900 flex flex-col">
      {/* 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveSection('syllabus')}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              DECO U24EC304
            </span>
          </button>

          {/* Zone 2: Concise Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'questions') setQuestionUnitFilter('all');
                    setActiveSection(item.id);
                  }}
                  className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action CTA */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={handleStartMockExam}
              className="whitespace-nowrap shrink-0 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 transition-colors cursor-pointer"
            >
              Start Mock Exam
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden border-t border-slate-100 px-4 py-2 flex gap-1.5 overflow-x-auto">
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'questions') setQuestionUnitFilter('all');
                  setActiveSection(item.id);
                }}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                  active ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* Compact Study Progress Bar */}
      <div className="border-b border-slate-200 bg-slate-50/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 tabular-nums">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>
              <strong className="text-slate-900">Syllabus:</strong> {topicPct}% ({progress.completedTopicIds.length}/{totalTopics})
            </span>
            <span>
              <strong className="text-slate-900">Questions Reviewed:</strong> {progress.reviewedQuestionIds.length}/{QUESTION_BANK.length}
            </span>
            <span>
              <strong className="text-slate-900">Saved:</strong> {progress.bookmarkedQuestionIds.length}
            </span>
            <span>
              <strong className="text-slate-900">Best Mock:</strong>{' '}
              {progress.quizBestScore !== null ? `${progress.quizBestScore}%` : '—'}
            </span>
          </div>

          <div>
            {confirmReset ? (
              <div className="inline-flex items-center gap-2">
                <span className="font-semibold text-red-700">Clear saved progress?</span>
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="rounded bg-red-700 px-2 py-0.5 font-semibold text-white hover:bg-red-800 cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded border border-slate-300 bg-white px-2 py-0.5 font-semibold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeSection === 'syllabus' && (
          <SyllabusView
            completedTopicIds={progress.completedTopicIds}
            onToggleTopic={toggleTopic}
            onJumpToQuestions={handleJumpToQuestions}
            onJumpToLab={handleJumpToLab}
          />
        )}

        {activeSection === 'questions' && (
          <QuestionBankView
            key={questionUnitFilter}
            initialUnitFilter={questionUnitFilter}
            reviewedIds={progress.reviewedQuestionIds}
            bookmarkedIds={progress.bookmarkedQuestionIds}
            onToggleReviewed={toggleReviewed}
            onToggleBookmark={toggleBookmark}
          />
        )}

        {activeSection === 'labs' && <LabsView initialLabIndex={labIndex} />}

        {activeSection === 'quiz' && (
          <QuizView
            bestScore={progress.quizBestScore}
            autoStartMockSignal={mockSignal}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {activeSection === 'resources' && <ResourcesView />}
      </main>
    </div>
  );
}
