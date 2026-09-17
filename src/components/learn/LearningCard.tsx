import React from 'react';
import Link from 'next/link';
import { LearningTopic } from '@/lib/types';
import { BookOpen, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LearningCardProps {
  topic: LearningTopic;
  index: number;
}

export function LearningCard({ topic, index }: LearningCardProps) {
  return (
    <Link
      href={`/learn/${topic.id}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-slate-900 hover:shadow-indigo-950/30"
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">
            {index + 1}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {topic.category}
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                topic.difficulty === 'Pemula'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : topic.difficulty === 'Menengah'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}
            >
              {topic.difficulty}
            </span>
          </div>
        </div>

        {/* Title & Excerpt */}
        <div>
          <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
            {topic.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
            {topic.whatIsIt}
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {topic.readTime}
        </span>

        <span className="flex items-center gap-1 font-semibold text-indigo-400 group-hover:translate-x-0.5 transition-transform">
          <span>Mulai Belajar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
