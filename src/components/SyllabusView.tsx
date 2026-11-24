import React, { useState } from 'react';
import { CheckCircle2, Circle, BookOpen, Calculator, Layers, ExternalLink, ImageOff } from 'lucide-react';
import { COURSE_META, COURSE_UNITS } from '../data/syllabus';
import { UnitId } from '../types/deco';

interface Props {
  completedTopicIds: string[];
  onToggleTopic: (topicId: string) => void;
  onJumpToQuestions: (unit: UnitId) => void;
  onJumpToLab: (labIndex: number) => void;
}

export const SyllabusView: React.FC<Props> = ({
  completedTopicIds,
  onToggleTopic,
  onJumpToQuestions,
  onJumpToLab,
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<UnitId>('unit1');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeUnit = COURSE_UNITS.find((u) => u.id === selectedUnitId) ?? COURSE_UNITS[0];

  const getUnitProgress = (unitId: UnitId) => {
    const unit = COURSE_UNITS.find((u) => u.id === unitId);
    if (!unit || unit.topics.length === 0) return { done: 0, total: 0, pct: 0 };
    const done = unit.topics.filter((t) => completedTopicIds.includes(t.id)).length;
    return {
      done,
      total: unit.topics.length,
      pct: Math.round((done / unit.topics.length) * 100),
    };
  };

  const suggestedLabForUnit: Record<UnitId, { index: number; label: string }> = {
    unit1: { index: 0, label: 'Open Base & IEEE-754 Lab' },
    unit2: { index: 1, label: 'Open K-Map & Logic Gate Lab' },
    unit3: { index: 2, label: 'Open Division & Booth Lab' },
    unit4: { index: 3, label: 'Open Cache & Pipeline Lab' },
    unit5: { index: 3, label: 'Open Pipeline Hazard Simulator' },
    gaps: { index: 1, label: 'Open Logic Gate & K-Map Lab' },
  };

  const activeStats = getUnitProgress(activeUnit.id);

  return (
    <div className="space-y-6">
      {/* Course Blueprint Header Strip */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-slate-500">
              {COURSE_META.institution} · {COURSE_META.department}
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {COURSE_META.title} ({COURSE_META.code})
            </h1>
            <div className="mt-1.5 text-sm text-slate-600 tabular-nums">
              Faculty: {COURSE_META.faculty} · {COURSE_META.academicYear} · Credits: {COURSE_META.credits} · CIE {COURSE_META.cieMarks} + SEE {COURSE_META.seeMarks} = {COURSE_META.totalMarks} Marks · {COURSE_META.examDuration}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6 text-left tabular-nums">
            <div>
              <div className="text-xs font-medium text-slate-500">Topics Mastered</div>
              <div className="mt-0.5 text-xl font-bold text-slate-900">
                {completedTopicIds.length} / {COURSE_UNITS.reduce((acc, u) => acc + u.topics.length, 0)}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">Official Units</div>
              <div className="mt-0.5 text-xl font-bold text-slate-900">5 + Gaps</div>
            </div>
            <div>
              <div className="text-xs font-medium text-slate-500">CIE / SEE Split</div>
              <div className="mt-0.5 text-xl font-bold text-sky-700">40 / 60</div>
            </div>
          </div>
        </div>

        {/* Interactive Unit Filter Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          {COURSE_UNITS.map((unit) => {
            const stats = getUnitProgress(unit.id);
            const isSelected = unit.id === selectedUnitId;
            return (
              <button
                key={unit.id}
                type="button"
                onClick={() => setSelectedUnitId(unit.id)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer tabular-nums ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {unit.shortLabel} · {stats.done}/{stats.total}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Unit Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Topic Checklist & Revision Notes */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  {activeUnit.shortLabel} · {activeUnit.co} · {activeUnit.btl} · {activeUnit.examWeight}
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900">
                  {activeUnit.title}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {activeUnit.coDescription}
                </p>
              </div>
              <div className="shrink-0 text-left sm:text-right tabular-nums">
                <div className="text-xs font-medium text-slate-500">Unit Readiness</div>
                <div className="text-2xl font-bold text-emerald-700">{activeStats.pct}%</div>
              </div>
            </div>

            {/* Topic Checklist */}
            <div className="mt-5 divide-y divide-slate-100">
              {activeUnit.topics.map((topic) => {
                const isDone = completedTopicIds.includes(topic.id);
                return (
                  <div key={topic.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => onToggleTopic(topic.id)}
                      aria-label={`Mark ${topic.title} as ${isDone ? 'incomplete' : 'complete'}`}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3
                          className={`text-base font-semibold ${
                            isDone ? 'text-slate-500 line-through' : 'text-slate-900'
                          }`}
                        >
                          {topic.title}
                        </h3>
                        <span className="text-xs font-mono text-slate-500 tabular-nums">
                          {topic.lectures ? `${topic.lectures} · ` : ''}
                          {topic.btl}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                        {topic.keyTakeaway}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onJumpToQuestions(activeUnit.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Practice {activeUnit.shortLabel} Questions
              </button>
              <button
                type="button"
                onClick={() => onJumpToLab(suggestedLabForUnit[activeUnit.id].index)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                {suggestedLabForUnit[activeUnit.id].label}
              </button>
            </div>
          </div>

          {/* Course Visual Diagrams (if available on this unit) */}
          {activeUnit.diagrams && activeUnit.diagrams.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Official Course Reference Diagrams ({activeUnit.shortLabel})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeUnit.diagrams.map((diag) => (
                  <div key={diag.src} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    {failedImages[diag.src] ? (
                      <div className="flex flex-col items-center justify-center h-44 text-slate-400 text-xs gap-2">
                        <ImageOff className="w-6 h-6" />
                        <span>Diagram preview unavailable</span>
                      </div>
                    ) : (
                      <img
                        src={diag.src}
                        alt={diag.alt}
                        referrerPolicy="no-referrer"
                        onError={() => setFailedImages((prev) => ({ ...prev, [diag.src]: true }))}
                        className="w-full h-44 object-contain rounded bg-white border border-slate-100"
                      />
                    )}
                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-slate-700">{diag.caption}</span>
                      <a
                        href={diag.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 text-sky-700 hover:text-sky-900"
                        title="Open full image"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Key Formulas & Exam Checklist */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
              <Layers className="w-4 h-4 text-sky-700" />
              High-Yield Formulas &amp; Rules
            </div>
            <div className="space-y-4">
              {activeUnit.formulas.map((f) => (
                <div key={f.label} className="pb-3.5 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="text-xs font-semibold text-slate-700">{f.label}</div>
                  <div className="mt-1.5 rounded bg-slate-900 px-3 py-2 font-mono text-xs text-sky-200 overflow-x-auto">
                    {f.expression}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 leading-relaxed">{f.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Must-Solve Before Exam
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {activeUnit.revisionChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="mt-0.5 font-mono text-xs font-semibold text-sky-700 tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
