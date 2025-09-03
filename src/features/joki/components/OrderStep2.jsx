
import React from 'react';
import { UploadCloud } from 'lucide-react';

const OrderStep2 = ({ onNext, onBack, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Detail Proyek</h2>
      <p className="text-gray-600 text-center mb-8">Jelaskan kebutuhan proyek Anda sedetail mungkin.</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Proyek</label>
          <textarea 
            id="projectDescription"
            name="projectDescription"
            rows="6"
            value={formData.projectDescription || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: Saya butuh website company profile untuk perusahaan saya dengan 5 halaman (Home, About, Services, Portfolio, Contact). Desain sudah ada di Figma..."></textarea>
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">Tenggat Waktu (Deadline)</label>
          <input 
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline || ''}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unggah File Referensi (Opsional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Unggah file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                </label>
                <p className="pl-1">atau seret dan lepas</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF, ZIP hingga 10MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button onClick={onBack} className="bg-gray-200 text-gray-800 font-bold py-3 px-12 rounded-lg hover:bg-gray-300 transition-colors">
          Kembali
        </button>
        <button onClick={onNext} className="bg-blue-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-blue-700 transition-colors">
          Lanjutkan
        </button>
      </div>
    </div>
  );
};

export default OrderStep2;
