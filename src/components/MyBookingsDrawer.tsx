import React from 'react';
import { X, Calendar, MapPin, Trash2, Clock, CheckCircle } from 'lucide-react';
import { Booking } from '../types';
import { COURSES } from '../data/clubData';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div 
        id="my-bookings-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black tracking-tight">Mes Séances Réservées</h3>
              <span className="bg-emerald-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full">
                {bookings.length}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Historique des créneaux enregistrés sur ce navigateur
            </p>
          </div>
          <button
            id="close-drawer-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-bold text-slate-800 text-base">Aucune séance réservée</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Parcourez notre planning et réservez votre créneau ou votre séance d'essai offerte.
              </p>
            </div>
          ) : (
            bookings.map((booking) => {
              const course = COURSES.find((c) => c.id === booking.courseId);
              return (
                <div
                  key={booking.id}
                  id={`booking-item-${booking.id}`}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-4 relative group hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        booking.isTrial
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {booking.isTrial ? 'Séance découverte 0€' : 'Créneau réservé'}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base mt-1.5">
                        {booking.courseTitle}
                      </h4>
                    </div>

                    <button
                      id={`cancel-booking-btn-${booking.id}`}
                      onClick={() => onCancelBooking(booking.id)}
                      title="Annuler cette réservation"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{booking.date}</span>
                    </div>

                    {course && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{course.location} • {course.room}</span>
                      </div>
                    )}

                    <div className="text-[11px] text-slate-500 pt-1">
                      Participant : <span className="font-medium text-slate-700">{booking.participantName}</span>
                    </div>
                  </div>

                  <div className="mt-3 bg-emerald-50/60 text-emerald-800 text-[11px] rounded-lg p-2 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                    <span>Présentez-vous 10 min avant le début du cours.</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
