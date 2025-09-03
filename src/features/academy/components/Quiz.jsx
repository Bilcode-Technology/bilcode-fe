import React, { useState } from 'react';
import { Check, X, RefreshCw } from 'lucide-react';

const Quiz = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (questionIndex, choiceIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: choiceIndex }));
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((q, qIndex) => {
      if (selectedAnswers[qIndex] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">{quizData.title}</h2>
      
      {quizData.questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-8">
          <p className="font-semibold text-lg text-slate-800 mb-4">{qIndex + 1}. {q.question}</p>
          <div className="space-y-3">
            {q.choices.map((choice, cIndex) => {
              const isSelected = selectedAnswers[qIndex] === cIndex;
              const isCorrect = q.correctAnswer === cIndex;
              let choiceClass = 'bg-slate-100 hover:bg-slate-200';

              if (isSubmitted) {
                if (isSelected && isCorrect) choiceClass = 'bg-green-200 border-green-500';
                else if (isSelected && !isCorrect) choiceClass = 'bg-red-200 border-red-500';
                else if (isCorrect) choiceClass = 'bg-green-200';
              }

              return (
                <button 
                  key={cIndex} 
                  onClick={() => handleSelectAnswer(qIndex, cIndex)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex justify-between items-center ${choiceClass} ${isSelected && !isSubmitted ? 'border-blue-500' : 'border-transparent'}`}>
                  <span>{choice}</span>
                  {isSubmitted && isCorrect && <Check className="text-green-700" />}
                  {isSubmitted && isSelected && !isCorrect && <X className="text-red-700" />}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!isSubmitted ? (
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Periksa Jawaban
        </button>
      ) : (
        <div className="text-center p-6 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-bold text-slate-800">Hasil Kuis</h3>
          <p className="text-3xl font-bold my-2 text-blue-600">{score} / {quizData.questions.length}</p>
          <p className="text-slate-600 mb-6">Anda menjawab {score} dari {quizData.questions.length} pertanyaan dengan benar.</p>
          <button 
            onClick={handleReset}
            className="flex items-center justify-center mx-auto bg-slate-200 text-slate-800 font-semibold px-6 py-2 rounded-lg hover:bg-slate-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Coba Lagi
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;