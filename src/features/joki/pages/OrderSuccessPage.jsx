
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccessPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-lg mx-auto">
        <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Pesanan Terkirim!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Terima kasih telah melakukan pemesanan. Tim kami akan segera meninjau detail proyek Anda dan akan menghubungi Anda melalui email atau WhatsApp dalam 1x24 jam.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">
            Kembali ke Beranda
          </Link>
          <Link to="/dashboard" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors">
            Lihat Dasbor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
