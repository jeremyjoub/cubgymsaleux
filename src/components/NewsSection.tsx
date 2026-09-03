import React from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { NEWS_ITEMS } from '../data/clubData';

export const NewsSection: React.FC = () => {
  return (
    <section id="actualites" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
              Vie de l'association
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Actualités & Événements à Saleux
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Stages thématiques du week-end, permanences d'inscriptions et temps conviviaux.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((item) => (
            <article
              key={item.id}
              id={`news-card-${item.id}`}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </span>
                {item.isImportant && (
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                    Important
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
