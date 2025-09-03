
import React from 'react';

const OrderStep3 = ({ onBack, onSubmit, formData }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Tinjau Pesanan Anda</h2>
      <p className="text-gray-600 text-center mb-8">Pastikan semua informasi di bawah ini sudah benar sebelum mengirim.</p>

      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Layanan yang Dipilih</h3>
          <p className="text-lg font-semibold text-gray-900">{formData.selectedService?.name}</p>
        </div>
        <div className="border-t border-gray-200"></div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Deskripsi Proyek</h3>
          <p className="text-base text-gray-800 whitespace-pre-wrap">{formData.projectDescription}</p>
        </div>
        <div className="border-t border-gray-200"></div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Tenggat Waktu</h3>
          <p className="text-base text-gray-800">{formData.deadline ? new Date(formData.deadline).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-3 px-12 rounded-lg hover:bg-gray-300 transition-colors">
          Kembali
        </button>
        <button onClick={onSubmit} className="bg-green-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-green-700 transition-colors">
          Kirim Pesanan
        </button>
      </div>
    </div>
  );
};

export default OrderStep3;
