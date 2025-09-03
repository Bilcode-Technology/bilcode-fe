import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-slate-50 p-6 rounded-2xl text-center">
        <p className="text-slate-600">Belum ada ulasan untuk kursus ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map(review => (
        <div key={review.id} className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-lg">
            {review.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-slate-800">{review.name}</h4>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-slate-600">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;