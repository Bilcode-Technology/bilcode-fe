import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEventById } from '../api';
import { Calendar, Clock, MapPin, ArrowLeft, User } from 'lucide-react';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const fetchedEvent = await getEventById(eventId);
        setEvent(fetchedEvent);
      } catch (err) {
        setError('Gagal memuat detail acara.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (isLoading) {
    return <div className="text-center py-40">Memuat...</div>;
  }

  if (error || !event) {
    return (
      <div className="text-center py-40">
        <h1 className="text-2xl font-bold text-red-500">{error || 'Acara tidak ditemukan.'}</h1>
        <Link to="/academy/events" className="mt-4 inline-block text-blue-600 hover:underline">Kembali ke Daftar Acara</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/academy/events" className="flex items-center text-blue-600 hover:underline mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Semua Acara
        </Link>
        
        <img src={event.imageUrl} alt={event.title} className="w-full h-96 object-cover rounded-3xl shadow-lg mb-8" />

        <header className="mb-8">
          <p className="text-lg font-semibold text-blue-600 mb-2">{event.type.toUpperCase()}</p>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">{event.title}</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-bold text-slate-800">Tanggal</p>
              <p className="text-slate-600">{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-bold text-slate-800">Waktu</p>
              <p className="text-slate-600">{event.time} ({event.duration})</p>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl flex items-center gap-4">
            <User className="w-8 h-8 text-blue-600" />
            <div>
              <p className="font-bold text-slate-800">Pembicara</p>
              <p className="text-slate-600">{event.speaker}</p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 mb-12">
          <p>{event.description}</p>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-blue-300 transform hover:-translate-y-1 transition-all duration-300">
            {event.registrationFee > 0 ? `Daftar (Rp ${event.registrationFee.toLocaleString('id-ID')})` : 'Daftar Gratis'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;
