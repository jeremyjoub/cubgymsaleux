import React, { useState, useMemo } from 'react';
import { Calendar, Clock, MapPin, User, Flame, Search, Check, Sparkles, Filter } from 'lucide-react';
import { Course, CourseCategory } from '../types';
import { COURSES } from '../data/clubData';

interface ScheduleSectionProps {
  onSelectCourse: (course: Course) => void;
  userBookedCourseIds: string[];
}

const DAYS = ['Tous', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'] as const;
const CATEGORIES: ('Toutes' | CourseCategory)[] = [
  'Toutes',
  'Renforcement',
  'Cardio & HIIT',
  'Bien-être & Douce',
  'Danses & Rythme'
];

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSelectCourse,
  userBookedCourseIds,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Tous');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchDay = selectedDay === 'Tous' || course.day === selectedDay;
      const matchCategory = selectedCategory === 'Toutes' || course.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchDay && matchCategory && matchSearch;
    });
  }, [selectedDay, selectedCategory, searchQuery]);

  const getIntensityBadge = (intensity: number) => {
    const dots = [1, 2, 3, 4, 5];
    return (
      <div className="flex items-center gap-1.5" title={`Intensité : ${intensity}/5`}>
        <Flame className={`w-3.5 h-3.5 ${intensity >= 4 ? 'text-amber-500' : 'text-emerald-600'}`} />
        <div className="flex gap-0.5">
          {dots.map((d) => (
            <span
              key={d}
              className={`w-1.5 h-3 rounded-xs ${
                d <= intensity
                  ? intensity >= 4 ? 'bg-amber-500' : 'bg-emerald-600'
                  : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const getCategoryColor = (category: CourseCategory) => {
    switch (category) {
      case 'Cardio & HIIT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Renforcement':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Bien-être & Douce':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Danses & Rythme':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <section id="planning" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Saison 2024 / 2025</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Planning interactif des cours
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            Consultez les créneaux réguliers à l'Espace Eugène Viandier et au Gymnase de Saleux.
            Réservez directement votre place ou votre séance d'essai offerte.
          </p>
        </div>

        {/* Filters Controls */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 mb-8 space-y-4 shadow-xs">
          
          {/* Day selection tabs */}
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Jour de la semaine</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DAYS.map((day) => (
                <button
                  key={day}
                  id={`filter-day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedDay === day
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Categories & Search */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-2 border-t border-slate-200/80">
            
            {/* Category chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline-flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Discipline :
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search query */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="search-courses-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un cours, coach..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ×
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Courses Grid / Schedule List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">Aucun cours ne correspond à ces critères</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Essayez de réinitialiser le filtre de jour ou la recherche textuelle.
            </p>
            <button
              onClick={() => {
                setSelectedDay('Tous');
                setSelectedCategory('Toutes');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isUserBooked = userBookedCourseIds.includes(course.id);
              const remainingSpots = Math.max(0, course.spotsTotal - course.spotsTaken - (isUserBooked ? 1 : 0));

              return (
                <div
                  key={course.id}
                  id={`course-card-${course.id}`}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between hover:shadow-lg ${
                    isUserBooked
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-emerald-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    {/* Top Row: Day & Time + Category */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-900 text-white text-xs font-extrabold px-2.5 py-1 rounded-md">
                          {course.day}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {course.timeStart} - {course.timeEnd}
                        </span>
                      </div>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(course.category)}`}>
                        {course.category}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {course.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {course.description}
                    </p>

                    {/* Key Attributes */}
                    <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {course.coach}
                        </span>
                        <span className="text-slate-500 text-[11px]">{course.level}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {course.location}
                        </span>
                        {getIntensityBadge(course.intensity)}
                      </div>
                    </div>

                    {/* Benefits tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {course.benefits.slice(0, 2).map((benefit, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          ✓ {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Spots & CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="text-[11px]">
                      <span className="text-slate-500 font-medium">Places : </span>
                      <span className={`font-bold ${remainingSpots <= 3 ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {remainingSpots} disponibles
                      </span>
                    </div>

                    {isUserBooked ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-xl">
                        <Check className="w-3.5 h-3.5" />
                        Inscrit
                      </span>
                    ) : (
                      <button
                        id={`book-course-btn-${course.id}`}
                        onClick={() => onSelectCourse(course)}
                        className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-200" />
                        <span>Réserver</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
