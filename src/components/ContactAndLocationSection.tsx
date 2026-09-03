import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle2, Car, Shield, Info } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

export const ContactAndLocationSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Renseignement inscription');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <section id="contact" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Nous trouver & Nous écrire
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
            Accès & Contact Club Gym Saleux
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Une question sur un créneau, votre éligibilité Pass'Sport ou l'accès aux salles ?
            L'équipe bénévole du bureau vous répond avec plaisir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Coordinates & Practical Info */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Venue */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2.5 text-emerald-800 font-extrabold text-lg mb-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                <span>Espace Eugène Viandier (Lieu principal)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rue Jean Jaurès / Espace Viandier<br />
                80480 Saleux (Somme, Hauts-de-France)
              </p>
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-500 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-slate-400" />
                  <span>Grand parking gratuit attenant à la salle</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Vestiaires individuels, casiers et accès PMR</span>
                </div>
              </div>
            </div>

            {/* Secondary Venue & Head Office */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
              <div>
                <div className="font-extrabold text-slate-900 mb-1">
                  Gymnase Municipal de Saleux
                </div>
                <p className="text-slate-600">
                  Pour les séances de Zumba et Gym Tonique du samedi.<br />
                  80480 Saleux
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80">
                <div className="font-extrabold text-slate-900 mb-1">
                  Siège Administratif de l'Association
                </div>
                <p className="text-slate-600">
                  Mairie de Saleux - Place de la République<br />
                  80480 Saleux
                </p>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <a 
                href={`tel:${CLUB_INFO.phone}`}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold">Téléphone</div>
                  <div className="font-bold text-slate-900">{CLUB_INFO.phone}</div>
                </div>
              </a>

              <a 
                href={`mailto:${CLUB_INFO.email}`}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-semibold">Email</div>
                  <div className="font-bold text-slate-900 truncate max-w-[130px]">{CLUB_INFO.email}</div>
                </div>
              </a>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
              <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Permanences d'inscription :</strong> Venez nous rencontrer 15 minutes avant le début de chaque cours à la salle Eugène Viandier.
              </span>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">
              Envoyer un message au bureau du club
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Remplissez ce formulaire pour toute demande de renseignement ou document.
            </p>

            {sent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-emerald-950">Message transmis avec succès !</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Merci {name}, notre équipe de bénévoles reviendra vers vous à l'adresse <strong>{email}</strong> sous 24h à 48h.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setMessage('');
                  }}
                  className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Votre nom et prénom *
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jean Dupont"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Votre adresse email *
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jean.dupont@orange.fr"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Objet de votre demande
                  </label>
                  <select
                    id="contact-subject-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Renseignement inscription">Renseignement inscription / Adhésion</option>
                    <option value="Séance découverte">Séance découverte offerte</option>
                    <option value="Tarifs et Pass Sport">Question sur les tarifs ou Pass'Sport</option>
                    <option value="Certificat médical">Question certificat médical / questionnaire de santé</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Votre message *
                  </label>
                  <textarea
                    id="contact-message-input"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Bonjour, je souhaiterais savoir s'il reste des places pour le cours de Pilates du lundi..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit-btn"
                  className="bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer mon message au bureau</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
