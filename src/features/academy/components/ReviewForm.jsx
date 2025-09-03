import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0 && comment) {
      onSubmit({ rating, comment });
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border mt-8">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Tulis Ulasan Anda</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-700 font-semibold mb-2">Rating Anda</label>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={index}
                  className={`w-8 h-8 cursor-pointer transition-colors ${
                    starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill={starValue <= (hoverRating || rating) ? 'currentColor' : 'none'}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-slate-700 font-semibold mb-2">Komentar Anda</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Bagikan pengalaman Anda tentang kursus ini..."
            required
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!rating || !comment}
        >
          Kirim Ulasan
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;