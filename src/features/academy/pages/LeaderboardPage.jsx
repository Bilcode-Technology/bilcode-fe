import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../api';
import { Trophy, Award } from 'lucide-react';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => {
      setLeaderboard(data);
      setIsLoading(false);
    });
  }, []);

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-400 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-yellow-600 text-white';
    return 'bg-slate-200 text-slate-700';
  };

  if (isLoading) {
    return <div className="text-center py-40">Memuat Papan Peringkat...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <header className="text-center mb-12">
          <Trophy className="w-20 h-20 mx-auto text-yellow-500 mb-4" />
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Papan Peringkat</h1>
          <p className="mt-4 text-xl text-slate-600">Lihat peringkat para siswa paling aktif di Bilcode Academy.</p>
        </header>

        <main className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <ul>
            {leaderboard.map((user, index) => (
              <li key={user.rank} className={`flex items-center p-4 gap-4 ${index < leaderboard.length - 1 ? 'border-b border-slate-100' : ''} ${user.rank <= 3 ? 'bg-blue-50' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(user.rank)}`}>
                  {user.rank}
                </div>
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                <Link to={`/profile/${user.name.toLowerCase().replace(' ', '-')}`} className="font-bold text-slate-800 text-lg hover:text-blue-600 transition-colors">
                  {user.name}
                </Link>
                <div className="ml-auto font-semibold text-slate-700 text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  {user.points.toLocaleString('id-ID')} Poin
                </div>
              </li>
            ))}
          </ul>
        </main>

      </div>
    </div>
  );
};

export default LeaderboardPage;
