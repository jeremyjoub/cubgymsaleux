import React, { useState } from 'react';
import { Check, Sparkles, Calculator, FileText, HelpCircle } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/clubData';
import { MembershipPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: MembershipPlan) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  // Calculator state
  const [memberType, setMemberType] = useState<'individual' | 'couple' | 'concession'>('individual');
  const [courseCount, setCourseCount] = useState<'one' | 'two' | 'unlimited'>('unlimited');
  const [hasPassSport, setHasPassSport] = useState<boolean>(false);
  const [splitPayment, setSplitPayment] = useState<boolean>(true);

  // Dynamic cost calculation
  const calculateTotal = () => {
    let base = 195; // default unlimited
    if (courseCount === 'one') base = 130;
    if (courseCount === 'two') base = 160;
    if (courseCount === 'unlimited') base = 195;

    // Concession discount
    if (memberType === 'concession') {
      base = Math.max(90, base - 35);
    } else if (memberType === 'couple') {
      // 2 memberships with 15% discount
      base = Math.round(base * 2 * 0.85);
    }

    // Pass Sport state subsidy (-50€)
    if (hasPassSport) {
      base = Math.max(20, base - 50);
    }

    return base;
  };

  const total = calculateTotal();
  const installmentAmount = splitPayment ? (total / 3).toFixed(2) : total.toFixed(2);

  return (
    <section id="tarifs" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Tarifs Associatifs & Transparents
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Des cotisations accessibles pour toute la famille
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Adhésion annuelle pour l'intégralité de la saison sportive (septembre à juin).
            Licence et assurance sport santé comprises. Facilités de paiement en 3 fois sans frais.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isRec = plan.recommended;
            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 relative ${
                  isRec
                    ? 'bg-slate-900 text-white border-2 border-emerald-500 shadow-xl lg:-translate-y-2'
                    : 'bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs ${
                      isRec
                        ? 'bg-emerald-500 text-slate-950 font-black'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className={`text-lg font-extrabold tracking-tight mb-1 ${isRec ? 'text-white' : 'text-slate-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mb-4 ${isRec ? 'text-slate-400' : 'text-slate-500'}`}>
                    {plan.target}
                  </p>

                  <div className="mb-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black tracking-tight">
                        {plan.priceAnnual === 0 ? 'Gratuit' : `${plan.priceAnnual} €`}
                      </span>
                      {plan.priceAnnual > 0 && (
                        <span className={`text-xs font-semibold ${isRec ? 'text-slate-400' : 'text-slate-500'}`}>
                          / an
                        </span>
                      )}
                    </div>
                    {plan.installments && (
                      <div className={`text-xs font-medium mt-1 ${isRec ? 'text-emerald-400' : 'text-emerald-700'}`}>
                        {plan.installments}
                      </div>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${isRec ? 'text-slate-300' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isRec ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        <span className={isRec ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  id={`select-plan-btn-${plan.id}`}
                  onClick={() => onSelectPlan(plan)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 ${
                    isRec
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{plan.priceAnnual === 0 ? 'Réserver ma séance offerte' : 'Choisir cette formule'}</span>
                </button>

              </div>
            );
          })}
        </div>

        {/* Interactive Simulator Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Simulator controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-emerald-800">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-xl text-slate-900">
                  Simulateur de cotisation personnalisé
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Ajustez votre situation pour estimer précisément votre cotisation annuelle avec prise en compte des aides (Pass'Sport, tarif famille, étalement).
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* Situation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. Votre situation
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="sim-profile-individual"
                      onClick={() => setMemberType('individual')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        memberType === 'individual'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Adulte Solo
                    </button>
                    <button
                      type="button"
                      id="sim-profile-concession"
                      onClick={() => setMemberType('concession')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        memberType === 'concession'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Étudiant / Senior (+65)
                    </button>
                    <button
                      type="button"
                      id="sim-profile-couple"
                      onClick={() => setMemberType('couple')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        memberType === 'couple'
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Duo / Couple (-15%)
                    </button>
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Fréquence des cours souhaitée
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      id="sim-freq-one"
                      onClick={() => setCourseCount('one')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        courseCount === 'one'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      1 cours / semaine
                    </button>
                    <button
                      type="button"
                      id="sim-freq-two"
                      onClick={() => setCourseCount('two')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        courseCount === 'two'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      2 cours / semaine
                    </button>
                    <button
                      type="button"
                      id="sim-freq-unlimited"
                      onClick={() => setCourseCount('unlimited')}
                      className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                        courseCount === 'unlimited'
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Pass Illimité (Tous)
                    </button>
                  </div>
                </div>

                {/* Pass'Sport deduction toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors select-none">
                    <input
                      type="checkbox"
                      id="sim-pass-sport-checkbox"
                      checked={hasPassSport}
                      onChange={(e) => setHasPassSport(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 border-slate-300"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-900">Bénéficiaire du Pass'Sport de l'État (-50 €)</span>
                      <p className="text-slate-500">Pour les jeunes de 6 à 30 ans éligibles (ARS, AEEH, AAH ou bourse).</p>
                    </div>
                  </label>
                </div>

                {/* Split payment toggle */}
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                    <span>Modalité de règlement :</span>
                    <button
                      type="button"
                      onClick={() => setSplitPayment(false)}
                      className={`px-3 py-1 rounded-lg ${!splitPayment ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      Paiement comptant (1x)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitPayment(true)}
                      className={`px-3 py-1 rounded-lg ${splitPayment ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'}`}
                    >
                      En 3 échéances sans frais
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulator Output Result */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Estimation pour votre saison
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-slate-900 tracking-tight">
                  {total} €
                </span>
                <span className="text-xs font-bold text-slate-500">pour l'année complète</span>
              </div>

              {splitPayment && (
                <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl p-3 text-xs mb-4">
                  <span className="font-bold">Soit 3 mensualités de {installmentAmount} €</span>
                  <p className="text-slate-600 mt-0.5">Chèques encaissés en octobre, janvier et avril.</p>
                </div>
              )}

              <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Licence & assurance FFSPT :</span>
                  <span className="font-bold text-slate-800">Comprise</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de dossier ou d'inscription :</span>
                  <span className="font-bold text-emerald-700">0 € (Offert)</span>
                </div>
                {hasPassSport && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Déduction Pass'Sport :</span>
                    <span>- 50,00 €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Moyens de paiement acceptés :</span>
                  <span className="font-medium text-slate-800">Chèque, Espèces, Chèques Vacances ANCV</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="#contact"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs text-center shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Obtenir le dossier d'inscription</span>
                </a>
                <span className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Certificat médical requis uniquement pour les nouveaux majeurs.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
