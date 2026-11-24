import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  Circle,
} from 'lucide-react';
import { QUESTION_BANK } from '../data/questionBank';
import { QuestionCategory, QuestionItem, UnitId } from '../types/deco';
import { ArchitectureDiagram } from './ArchitectureDiagram';

interface Props {
  initialUnitFilter?: UnitId | 'all';
  reviewedIds: string[];
  bookmarkedIds: string[];
  onToggleReviewed: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

const UNIT_TABS: { id: UnitId | 'all'; label: string }[] = [
  { id: 'all', label: 'All Units' },
  { id: 'unit1', label: 'Unit I' },
  { id: 'unit2', label: 'Unit II' },
  { id: 'unit3', label: 'Unit III' },
  { id: 'unit4', label: 'Unit IV' },
  { id: 'unit5', label: 'Unit V' },
  { id: 'gaps', label: 'Beyond Syllabus' },
];

const CATEGORY_TABS: { id: QuestionCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Formats' },
  { id: 'CIE2_SOLVED', label: 'CIE-2 Worked' },
  { id: 'SAQ', label: 'Short Answer (2M)' },
  { id: 'LAQ', label: 'Long Answer (12M)' },
  { id: 'ASSIGNMENT', label: 'Assignments' },
  { id: 'SURPRISE_TEST', label: 'Surprise Tests' },
  { id: 'PYQ', label: 'University PYQs' },
];

export const QuestionBankView: React.FC<Props> = ({
  initialUnitFilter = 'all',
  reviewedIds,
  bookmarkedIds,
  onToggleReviewed,
  onToggleBookmark,
}) => {
  const [unitFilter, setUnitFilter] = useState<UnitId | 'all'>(initialUnitFilter);
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyUnreviewed, setOnlyUnreviewed] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return QUESTION_BANK.filter((item) => {
      if (unitFilter !== 'all' && item.unit !== unitFilter) return false;
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
      if (onlyBookmarked && !bookmarkedIds.includes(item.id)) return false;
      if (onlyUnreviewed && reviewedIds.includes(item.id)) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answerSummary.toLowerCase().includes(q) ||
        item.sourceLabel.toLowerCase().includes(q) ||
        item.keyPoints.some((kp) => kp.toLowerCase().includes(q))
      );
    });
  }, [unitFilter, categoryFilter, searchQuery, onlyBookmarked, onlyUnreviewed, bookmarkedIds, reviewedIds]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllVisible = () => {
    const next: Record<string, boolean> = {};
    filteredQuestions.forEach((q) => {
      next[q.id] = true;
    });
    setExpandedIds((prev) => ({ ...prev, ...next }));
  };

  const collapseAllVisible = () => {
    setExpandedIds({});
  };

  const renderUnitLabel = (unit: UnitId) => {
    switch (unit) {
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
      case 'gaps':
        return 'Beyond Syllabus';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Official Question Bank &amp; Worked Solutions
            </h1>
            <p className="mt-1 text-sm text-slate-600 tabular-nums">
              CIE-2 Solved Bank · Assignment 1 &amp; 2 · Surprise Tests · University PYQs (R20/R18/R17/R15) · {reviewedIds.length}/{QUESTION_BANK.length} Reviewed
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={expandAllVisible}
              className="whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Expand All Answers
            </button>
            <button
              type="button"
              onClick={collapseAllVisible}
              className="whitespace-nowrap shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Search & Quick Filters */}
        <div className="flex flex-col lg:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions, algorithms, registers, K-map, DMA, cache..."
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOnlyBookmarked((v) => !v)}
              className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                onlyBookmarked
                  ? 'bg-amber-600 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Bookmarked ({bookmarkedIds.length})
            </button>
            <button
              type="button"
              onClick={() => setOnlyUnreviewed((v) => !v)}
              className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                onlyUnreviewed
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Unreviewed Only
            </button>
          </div>
        </div>

        {/* Unit & Category Tabs */}
        <div className="space-y-2.5 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {UNIT_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setUnitFilter(tab.id)}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  unitFilter === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCategoryFilter(tab.id)}
                className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-sky-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
            <p className="text-sm font-medium text-slate-600">
              No matching questions found for the current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setUnitFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
                setOnlyBookmarked(false);
                setOnlyUnreviewed(false);
              }}
              className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((item: QuestionItem) => {
            const isExpanded = !!expandedIds[item.id];
            const isReviewed = reviewedIds.includes(item.id);
            const isBookmarked = bookmarkedIds.includes(item.id);

            return (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-slate-500 tabular-nums">
                      {renderUnitLabel(item.unit)} · {item.co} · {item.btl} · {item.marks} Marks · {item.sourceLabel}
                    </div>
                    <h2 className="mt-1.5 text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(item.id)}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        isBookmarked
                          ? 'border-amber-300 bg-amber-50 text-amber-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      {isBookmarked ? 'Saved' : 'Save'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleReviewed(item.id)}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        isReviewed
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {isReviewed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Circle className="w-3.5 h-3.5" />
                      )}
                      {isReviewed ? 'Reviewed' : 'Mark Done'}
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          Hide Answer <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          Model Answer <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-slate-200 space-y-4">
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">
                      {item.answerSummary}
                    </p>

                    <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                      {item.keyPoints.map((pt, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {pt}
                        </li>
                      ))}
                    </ul>

                    {item.workedExample && (
                      <div className="rounded-lg border border-sky-200 bg-sky-50/60 p-3.5 text-sm text-slate-800 font-mono">
                        <span className="font-sans font-semibold text-sky-900 mr-2">Worked Example:</span>
                        {item.workedExample}
                      </div>
                    )}

                    {item.rtlOrSteps && (
                      <div className="rounded-lg bg-slate-900 p-3.5 font-mono text-xs text-sky-200 space-y-1">
                        {item.rtlOrSteps.map((step, i) => (
                          <div key={i}>{step}</div>
                        ))}
                      </div>
                    )}

                    {item.table && (
                      <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse tabular-nums">
                          <thead>
                            <tr className="bg-slate-100 text-slate-800 border-b border-slate-200">
                              {item.table.headers.map((h) => (
                                <th key={h} className="px-3.5 py-2 font-semibold">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {item.table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="bg-white">
                                {row.map((cell, cIdx) => (
                                  <td
                                    key={cIdx}
                                    className={`px-3.5 py-2 ${
                                      cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {item.diagramType && <ArchitectureDiagram type={item.diagramType} />}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
