
import React from 'react';
import { jokiServices } from '../data/jokiServices';

const OrderStep1 = ({ onNext, onSelectService, selectedService }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Pilih Layanan</h2>
      <p className="text-gray-600 text-center mb-8">Pilih jenis layanan yang paling sesuai dengan kebutuhan Anda.</p>
      
      <div className="space-y-4">
        {jokiServices.map(service => (
          <div 
            key={service.id}
            onClick={() => onSelectService(service)}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedService?.id === service.id 
                ? 'border-blue-600 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-blue-400'
            }`}>
            <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
            <p className="text-gray-600 mt-1">{service.description}</p>
            <p className="text-sm font-semibold text-blue-600 mt-2">{service.price_estimation}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button 
          onClick={onNext}
          disabled={!selectedService}
          className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default OrderStep1;
