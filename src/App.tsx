import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ScheduleSection } from './components/ScheduleSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { PricingSection } from './components/PricingSection';
import { NewsSection } from './components/NewsSection';
import { ContactAndLocationSection } from './components/ContactAndLocationSection';
import { BookingModal } from './components/BookingModal';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { Booking } from './types';

export const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from local storage on init
  useEffect(() => {
    const saved = localStorage.getItem('cgs_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse bookings');
      }
    }
  }, []);

  // Save bookings to local storage when changed
  useEffect(() => {
    localStorage.setItem('cgs_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleOpenBooking = (courseId?: string) => {
    setSelectedCourseId(courseId);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
  };

  const handleCancelBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenBooking={handleOpenBooking}
        bookingCount={bookings.length}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExplorePlanning={() => {
            setActiveSection('planning');
            document.getElementById('planning')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
        <ActivitiesSection />
        <ScheduleSection
          onSelectCourse={(course) => handleOpenBooking(course.id)}
          userBookedCourseIds={bookings.map((b) => b.courseId)}
        />
        <PricingSection
          onSelectPlan={() => handleOpenBooking()}
        />
        <NewsSection />
        <ContactAndLocationSection />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Club Gym Saleux. Association Loi 1901.</p>
          <div className="flex items-center gap-4">
            <a href="#mentions" className="hover:text-emerald-400 transition-colors">Mentions légales</a>
            <a href="#reglement" className="hover:text-emerald-400 transition-colors">Règlement intérieur</a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialCourseId={selectedCourseId}
        onBookingSuccess={handleBookingSuccess}
      />

      <MyBookingsDrawer
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
};
