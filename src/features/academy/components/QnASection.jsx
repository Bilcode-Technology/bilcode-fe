import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const QnASection = ({ qnaData }) => {
  const { user } = useAuth(); // Menggunakan user dari AuthContext
  const [questions, setQuestions] = useState(qnaData);
  const [newQuestion, setNewQuestion] = useState('');

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === '' || !user) return;

    const question = {
      id: questions.length + 1,
      author: user.name, // Menggunakan nama dari user context
      avatar: user.avatar, // Menggunakan avatar dari user context
      question: newQuestion,
      timestamp: 'Baru saja',
      answers: [],
    };

    setQuestions([question, ...questions]);
    setNewQuestion('');
  };

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6">Tanya Jawab</h3>
      
      {user && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <form onSubmit={handleQuestionSubmit}>
            <div className="flex items-start space-x-4">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <textarea
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Punya pertanyaan tentang materi ini?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                  disabled={!newQuestion.trim()}
                >
                  Kirim Pertanyaan
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* List of questions */}
      <div className="space-y-8">
        {questions.map((q) => (
          <div key={q.id} className="flex items-start space-x-4">
            <img src={q.avatar} alt={q.author} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="bg-white p-4 rounded-lg border">
                <p className="font-semibold">{q.author} <span className="text-sm font-normal text-gray-500 ml-2">{q.timestamp}</span></p>
                <p className="mt-2 text-gray-800">{q.question}</p>
              </div>
              {/* Answers */}
              <div className="mt-4 space-y-4 pl-8">
                {q.answers.map((a) => (
                  <div key={a.id} className="flex items-start space-x-4">
                    <img src={a.avatar} alt={a.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                       <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-semibold">{a.author} {a.isInstructor && <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded-full ml-2">INSTRUKTUR</span>} <span className="text-sm font-normal text-gray-500 ml-2">{a.timestamp}</span></p>
                        <p className="mt-2 text-gray-700">{a.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnASection;