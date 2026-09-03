import React from 'react';
import { Calendar, Sparkles, CheckCircle2, Shield, Users, Trophy } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface HeroProps {
  onOpenBooking: () => void;
  onExplorePlanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExplorePlanning }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Subtle decorative background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Votre santé, votre énergie, à Saleux</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Bougez et gardez la forme au{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
                Club Gym Saleux
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
              Rejoignez notre association sportive conviviale au cœur de Saleux.
              Du renforcement musculaire au Pilates, en passant par le Cardio HIIT, la Zumba et le Yoga, trouvez le cours adapté à votre rythme et vos objectifs.
            </p>

            {/* Value checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Coachs diplômés d'État & pédagogues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Salle Eugène Viandier & Gymnase</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>9 créneaux hebdomadaires dès 110€/an</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1ère séance d'essai offerte sans engagement</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                id="hero-book-trial-btn"
                onClick={onOpenBooking}
                className="bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold px-6 py-4 rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 text-base"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Réserver une séance d'essai gratuite</span>
              </button>

              <button
                id="hero-view-planning-btn"
                onClick={onExplorePlanning}
                className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white font-semibold px-6 py-4 rounded-xl transition-all hover:border-slate-600 flex items-center justify-center gap-2 text-base"
              >
                <Calendar className="w-5 h-5 text-slate-300" />
                <span>Voir le planning de la semaine</span>
              </button>
            </div>
          </div>

          {/* Right Card / Key Highlights */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-5 mb-6">
                <div>
                  <h3 className="font-extrabold text-lg text-white">Vie du Club & Rentrée</h3>
                  <p className="text-xs text-slate-400">Association Loi 1901 • Saleux (Somme)</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                  Affilié Sport pour Tous
                </span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Création</span>
                  </div>
                  <div className="text-2xl font-black text-white">{CLUB_INFO.foundedYear}</div>
                  <div className="text-xs text-slate-400 mt-0.5">40 ans de sport local</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-teal-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Cours</span>
                  </div>
                  <div className="text-2xl font-black text-white">9 / semaine</div>
                  <div className="text-xs text-slate-400 mt-0.5">Du lundi au samedi</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Adhérents</span>
                  </div>
                  <div className="text-2xl font-black text-white">+180</div>
                  <div className="text-xs text-slate-400 mt-0.5">De 16 à 85 ans</div>
                </div>

                <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-teal-400 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Cadre</span>
                  </div>
                  <div className="text-2xl font-black text-white">Certifié</div>
                  <div className="text-xs text-slate-400 mt-0.5">Assurance & licences</div>
                </div>
              </div>

              {/* Next session teaser */}
              <div className="bg-emerald-950/60 border border-emerald-600/30 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-bold mb-1">
                  <span className="uppercase tracking-wider">Lieu principal des séances</span>
                  <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200">Saleux</span>
                </div>
                <div className="font-bold text-white text-base">Espace Eugène Viandier</div>
                <p className="text-xs text-slate-300 mt-1">
                  Équipements récents, vestiaires, douches et parking gratuit à disposition des membres.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
