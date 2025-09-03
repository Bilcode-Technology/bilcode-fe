import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import { Calendar, Clock, MapPin, Search } from 'lucide-react';

const EventCard = ({ event }) => (
  <Link to={`/academy/events/${event.id}`} className="block bg-white rounded-2xl shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-2 group">
    <div className="relative">
      <img src={event.imageUrl} alt={event.title} className="w-full h-56 object-cover rounded-t-2xl" />
      {event.isLive && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">LIVE</div>
      )}
    </div>
    <div className="p-6">
      <p className="text-sm font-semibold text-blue-600 mb-2">{event.type.toUpperCase()}</p>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{event.title}</h3>
      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>
      <div className="text-sm text-slate-500 space-y-2 border-t pt-4">
        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {event.time} ({event.duration})</div>
        <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> {event.type === 'webinar' ? 'Online' : 'Lokasi Acara'}</div>
      </div>
    </div>
  </Link>
);

const EventsPage = () => {
  const { events, isLoading, error, filters, setFilters } = useEvents({
    search: '',
    type: 'all',
    upcoming: true,
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Acara & Workshop</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">Ikuti webinar, workshop, dan sesi live coding kami untuk meningkatkan keahlian Anda.</p>
        </header>

        {/* Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari acara..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              className="px-4 py-3 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Tipe</option>
              <option value="webinar">Webinar</option>
              <option value="workshop">Workshop</option>
              <option value="live-coding">Live Coding</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.upcoming}
                onChange={(e) => setFilters(prev => ({ ...prev, upcoming: e.target.checked }))}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span className="font-semibold text-slate-700">Hanya Acara Mendatang</span>
            </label>
          </div>
        </div>

        {isLoading && <div className="text-center">Memuat acara...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!isLoading && !error && (
          events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-slate-800">Tidak Ada Acara</h3>
              <p className="text-slate-600 mt-2">Tidak ada acara yang sesuai dengan filter Anda saat ini.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default EventsPage;
