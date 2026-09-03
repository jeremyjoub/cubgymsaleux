import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { COURSES } from '../data/clubData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: string;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
  onBookingSuccess,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId || COURSES[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isTrial, setIsTrial] = useState(true);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialCourseId) {
      setSelectedCourseId(initialCourseId);
    }
  }, [initialCourseId]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCourse = COURSES.find((c) => c.id === selectedCourseId) || COURSES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Veuillez renseigner votre nom, email et numéro de téléphone.');
      return;
    }

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      courseId: currentCourse.id,
      courseTitle: currentCourse.title,
      date: `${currentCourse.day} à ${currentCourse.timeStart}`,
      participantName: name.trim(),
      participantEmail: email.trim(),
      participantPhone: phone.trim(),
      isTrial,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
    };

    onBookingSuccess(newBooking);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="booking-modal-container"
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
      >
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            aria-label="Fermer la modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isTrial ? 'Séance d\'essai 100% offerte' : 'Réservation de créneau'}</span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-white">
            {submitted ? 'Réservation confirmée !' : 'Réserver votre créneau'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {submitted
              ? 'Nous avons bien enregistré votre participation au Club Gym Saleux.'
              : 'Venez découvrir nos séances conviviales à la salle Eugène Viandier.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Merci {name} !
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Un récapitulatif a été enregistré pour votre séance.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2">
                <div className="font-bold text-slate-900 text-sm">{currentCourse.title}</div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tous les {currentCourse.day}s • {currentCourse.timeStart} - {currentCourse.timeEnd}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentCourse.location} ({currentCourse.room})</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl p-3 text-xs text-left">
                <span className="font-bold">À prévoir pour votre séance :</span>
                <ul className="list-disc pl-4 mt-1 text-slate-700 space-y-0.5">
                  <li>Baskets de sport propres (réservées à la salle)</li>
                  <li>Une serviette et une gourde d'eau</li>
                  <li>Tenue souple et confortable</li>
                </ul>
              </div>

              <button
                id="close-success-btn"
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
              >
                Fermer et revenir au planning
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="bg-red-50 text-red-800 border border-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Course Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sélectionner le cours
                </label>
                <select
                  id="modal-select-course"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.day} {c.timeStart} - {c.title} ({c.coach})
                    </option>
                  ))}
                </select>
              </div>

              {/* Course summary badge */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800">{currentCourse.location}</span>
                  <div className="text-slate-500">{currentCourse.room} • Coach : {currentCourse.coach}</div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {currentCourse.category}
                </span>
              </div>

              {/* Trial toggle */}
              <div className="flex gap-2">
                <button
                  type="button"
                  id="modal-type-trial"
                  onClick={() => setIsTrial(true)}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    isTrial
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Premier essai offert (0€)
                </button>
                <button
                  type="button"
                  id="modal-type-member"
                  onClick={() => setIsTrial(false)}
                  className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                    !isTrial
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Adhérent saison
                </button>
              </div>

              {/* Name field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nom et Prénom *
                </label>
                <input
                  id="modal-input-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Marie Lefebvre"
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {/* Contact fields in 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email *
                  </label>
                  <input
                    id="modal-input-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marie@exemple.fr"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Téléphone *
                  </label>
                  <input
                    id="modal-input-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Notes or health comments */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Remarques ou antécédents (facultatif)
                </label>
                <textarea
                  id="modal-input-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex : Problème de genou ou reprise d'activité après arrêt..."
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden resize-none"
                />
              </div>

              <button
                type="submit"
                id="submit-booking-btn"
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-200" />
                <span>Confirmer ma réservation {isTrial && '(Gratuit)'}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Vos informations restent strictement confidentielles au sein du bureau de l'association.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
