import React, { useState } from 'react';
import { FileText, Image as ImageIcon, ExternalLink, Search } from 'lucide-react';
import { RESOURCE_FILES } from '../data/syllabus';
import { ResourceFile } from '../types/deco';

const CATEGORIES: ('All' | ResourceFile['category'])[] = [
  'All',
  'Question Banks & Solutions',
  'Assignments & Surprise Tests',
  'Unit Lecture Notes',
  'Syllabus & Course File',
  'Reference Diagrams',
];

export const ResourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ResourceFile['category']>('All');
  const [query, setQuery] = useState('');

  const filtered = RESOURCE_FILES.filter((file) => {
    if (selectedCategory !== 'All' && file.category !== selectedCategory) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      file.title.toLowerCase().includes(q) ||
      file.description.toLowerCase().includes(q) ||
      file.filename.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Drive Course File &amp; PDF Archive
            </h1>
            <p className="mt-1 text-sm text-slate-600 tabular-nums">
              Direct access to all {RESOURCE_FILES.length} original faculty PDFs, worked solutions, previous papers, and reference diagrams.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter course documents..."
              className="w-full rounded-lg border border-slate-300 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-slate-200 pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((file) => (
          <div
            key={file.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-semibold text-sky-700">
                  {file.category} · {file.fileType}
                </div>
                {file.fileType === 'JPG' ? (
                  <ImageIcon className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
              <h2 className="mt-2 text-base font-bold text-slate-900 leading-snug">
                {file.title}
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {file.description}
              </p>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="truncate font-mono text-[11px] text-slate-400">
                {file.filename}
              </span>
              <a
                href={file.path}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Open File
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
