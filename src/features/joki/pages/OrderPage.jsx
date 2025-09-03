
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OrderStep1 from '../components/OrderStep1';
import OrderStep2 from '../components/OrderStep2';
import OrderStep3 from '../components/OrderStep3';

const StepIndicator = ({ currentStep }) => {
  const steps = ['Pilih Layanan', 'Detail Proyek', 'Konfirmasi'];
  return (
    <div className="flex justify-center items-center mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {index + 1}
            </div>
            <p className={`mt-2 text-sm font-semibold ${index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step}</p>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-auto border-t-2 mx-4 ${index + 1 < currentStep ? 'border-blue-600' : 'border-gray-200'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const OrderPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handleBack = () => setCurrentStep(prev => prev - 1);
  
  const handleSelectService = (service) => {
    setFormData(prev => ({ ...prev, selectedService: service }));
  };

  const handleSubmit = () => {
    // Here you would typically send the data to a backend
    console.log('Order Submitted:', formData);
    navigate('/joki/order-success');
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <StepIndicator currentStep={currentStep} />
        
        <div className="mt-10">
          {currentStep === 1 && <OrderStep1 onNext={handleNext} onSelectService={handleSelectService} selectedService={formData.selectedService} />}
          {currentStep === 2 && <OrderStep2 onNext={handleNext} onBack={handleBack} formData={formData} setFormData={setFormData} />}
          {currentStep === 3 && <OrderStep3 onBack={handleBack} onSubmit={handleSubmit} formData={formData} />}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
