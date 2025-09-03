import React, { useState, useEffect } from 'react';
import { getPricingPlans } from '../api';
import { CheckCircle, XCircle } from 'lucide-react';

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const pricingData = await getPricingPlans();
        setPlans(pricingData);
      } catch (err) {
        setError('Gagal memuat paket harga.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (isLoading) {
    return <div className="text-center py-40">Memuat Paket Harga...</div>;
  }

  if (error) {
    return <div className="text-center py-40 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen py-20 pt-40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Pilih Paket yang Tepat untuk Anda
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Mulai perjalanan belajar Anda dengan paket yang sesuai dengan kebutuhan dan tujuan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((tier) => (
            <div
              key={tier.id}
              className={`bg-white rounded-3xl shadow-xl p-8 flex flex-col border-2 ${tier.popular ? 'border-blue-600 scale-105' : 'border-gray-200'}`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  Paling Populer
                </div>
              )}
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{tier.name}</h2>
              <p className="text-slate-600 mb-6 h-20">{tier.description}</p>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">
                {tier.price !== null ? `Rp ${tier.price.toLocaleString('id-ID')}` : 'Custom'}
                {tier.price !== null && <span className="text-xl font-medium text-slate-500">/{tier.period.replace('per ', '')}</span>}
              </div>
              <ul className="flex-grow space-y-3 my-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-slate-700">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {tier.limitations?.map((limitation, idx) => (
                   <li key={idx} className="flex items-start text-slate-500">
                    <XCircle className="text-red-400 w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-4 mt-auto rounded-xl font-semibold text-lg transition-all duration-300 ${tier.buttonVariant === 'outline' ? 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'} ${tier.popular ? 'shadow-lg' : ''}`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
