import React, { useState } from 'react';
import { Dumbbell, Calendar, CreditCard, Sparkles, MapPin, Phone, Menu, X } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface HeaderProps {
  onOpenBooking: (courseId?: string) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  bookingCount: number;
  onOpenMyBookings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  activeSection,
  setActiveSection,
  bookingCount,
  onOpenMyBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'planning', label: 'Planning des Cours', icon: Calendar },
    { id: 'activites', label: 'Disciplines', icon: Dumbbell },
    { id: 'tarifs', label: 'Adhésion & Tarifs', icon: CreditCard },
    { id: 'actualites', label: 'Actualités', icon: Sparkles },
    { id: 'contact', label: 'Accès & Contact', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar with club contact */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Saison 2024-2025 ouverte
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {CLUB_INFO.roomPrimary} • Saleux (80480)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`tel:${CLUB_INFO.phone}`} 
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{CLUB_INFO.phone}</span>
            </a>
            {bookingCount > 0 && (
              <button
                id="header-my-bookings-btn"
                onClick={onOpenMyBookings}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-2.5 py-0.5 rounded-full text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Mes réservations</span>
                <span className="bg-emerald-800 text-white text-[10px] w-4 h-4 rounded-full inline-flex items-center justify-center font-bold">
                  {bookingCount}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="header-brand-logo"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-tight">
                CLUB GYM
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                Saleux
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-normal">
              Association sportive • Depuis 1984
            </p>
          </div>
        </div>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-slate-100 text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="header-trial-cta-btn"
            onClick={() => onOpenBooking()}
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Essai gratuit offert</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in fade-in duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              id="mobile-trial-cta-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-center text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              Réserver ma séance d'essai gratuite
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
