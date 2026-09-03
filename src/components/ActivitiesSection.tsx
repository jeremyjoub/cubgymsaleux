import React from 'react';
import { Heart, Activity, Music, ShieldCheck, Sun, Dumbbell } from 'lucide-react';

export const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      id: 'pilates',
      title: 'Pilates Postural',
      subtitle: 'Harmonie, posture et renforcement profond',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-700',
      tag: 'Bien-être & Dos',
      description: 'Méthode douce et exigeante qui renforce les muscles profonds du tronc (abdominaux, plancher pelvien, lombaires) tout en réalignant la colonne vertébrale.',
      points: [
        'Respiration costale et conscience corporelle',
        'Amélioration notable des douleurs de dos',
        'Silhouette affinée et maintien élégant'
      ],
      gear: 'Tapis de sol épais, vêtements extensibles sans zip gênant.'
    },
    {
      id: 'hiit',
      title: 'Cardio HIIT & Tabata',
      subtitle: 'Explosivité, dépense énergétique et endurance',
      icon: Activity,
      color: 'from-amber-500 to-orange-600',
      tag: 'Haute Intensité',
      description: 'Alternance de courtes phases d\'effort maximal avec de brefs temps de récupération. Un entraînement moderne et efficace pour stimuler le métabolisme.',
      points: [
        'Consommation calorique prolongée post-séance',
        'Gain rapide en puissance et capacité cardio',
        'Stimulation de l\'ensemble des chaînes musculaires'
      ],
      gear: 'Baskets de sport d\'intérieur propres avec bon amorti, serviette obligatoire.'
    },
    {
      id: 'zumba',
      title: 'Zumba Fitness',
      subtitle: 'Ambiance festive, chorégraphies latines et dynamisme',
      icon: Music,
      color: 'from-fuchsia-500 to-pink-600',
      tag: 'Rythme & Plaisir',
      description: 'Une séance festive où le fitness rencontre les danses latines (salsa, reggaeton, merengue, cumbia). On brûle les calories dans la bonne humeur générale.',
      points: [
        'Amélioration du souffle sans monotonie',
        'Libération des endorphines et anti-stress',
        'Accessible quel que soit votre niveau de danse'
      ],
      gear: 'Chaussures de danse fitness ou baskets souples, bouteille d\'eau indispensable.'
    },
    {
      id: 'caf',
      title: 'Cuisses Abdos Fessiers (CAF)',
      subtitle: 'Sculpture ciblée, gainage et tonification',
      icon: Dumbbell,
      color: 'from-blue-600 to-indigo-700',
      tag: 'Tonification',
      description: 'Le grand classique du renforcement musculaire, combinant mouvements au sol et debout avec petits élastiques de résistance et poids légers.',
      points: [
        'Raffermissement ciblé des jambes et fessiers',
        'Travail complet de la sangle abdominale',
        'Exercices sécurisés pour les articulations'
      ],
      gear: 'Tapis personnel ou de salle, serviette, élastiques fournis.'
    },
    {
      id: 'yoga',
      title: 'Hatha Yoga & Relaxation',
      subtitle: 'Souplesse, lâcher-prise et paix intérieure',
      icon: Sun,
      color: 'from-teal-500 to-cyan-700',
      tag: 'Sérénité',
      description: 'Enchaînement de postures tenues (asanas), exercices respiratoires et clôture par une relaxation guidée pour détendre les tissus et apaiser le système nerveux.',
      points: [
        'Assouplissement profond des articulations',
        'Gestion du stress et de la fatigue nerveuse',
        'Amélioration de la qualité du sommeil'
      ],
      gear: 'Tenue confortable et chaude pour la relaxation, plaid personnel recommandé.'
    },
    {
      id: 'douce',
      title: 'Gym Douce & Sport Santé',
      subtitle: 'Mobilité, équilibre et autonomie motrice',
      icon: Heart,
      color: 'from-rose-500 to-red-600',
      tag: 'Tous âges & Seniors',
      description: 'Séance adaptée pour entretenir ses articulations, travailler l\'équilibre et stimuler la coordination dans un cadre chaleureux et sans compétition.',
      points: [
        'Préservation de la mobilité au quotidien',
        'Prévention des chutes et travail proprioceptif',
        'Lien social et moments d\'échange bienveillants'
      ],
      gear: 'Tenue confortable de loisir, baskets légères et bonne humeur.'
    }
  ];

  return (
    <section id="activites" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Nos Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Des cours pensés pour chaque étape de votre forme
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Au Club Gym Saleux, l'accent est mis sur la régularité, le respect du corps et le plaisir de s'entraîner ensemble sans esprit de compétition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.id}
                id={`activity-${act.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${act.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full">
                      {act.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {act.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5 mb-2.5">
                    {act.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {act.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Bienfaits clés :
                    </p>
                    {act.points.map((pt, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold shrink-0">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Matériel conseillé : </span>
                  {act.gear}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
