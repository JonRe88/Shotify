import React from 'react';
import { Question } from '../types';
import { Zap, Heart, Siren as Fire, Sparkles } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  isVisible: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, isVisible }) => {
  const getCategoryIcon = () => {
    switch (question.category) {
      case 'general':
        return <Sparkles className="w-6 h-6" />;
      case 'vergonzosa':
        return <Heart className="w-6 h-6" />;
      case 'picante':
        return <Fire className="w-6 h-6" />;
      case 'yo_nunca':
        return <Zap className="w-6 h-6" />;
      case 'extra':
        return <Sparkles className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const getCategoryColor = () => {
    switch (question.category) {
      case 'general':
        return 'from-green-400 to-emerald-600';
      case 'vergonzosa':
        return 'from-yellow-400 to-orange-600';
      case 'picante':
        return 'from-red-400 to-pink-600';
      case 'yo_nunca':
        return 'from-purple-400 to-indigo-600';
      case 'extra':
        return 'from-cyan-400 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryName = () => {
    switch (question.category) {
      case 'general':
        return 'DIVERTIDA';
      case 'vergonzosa':
        return 'VERGONZOSA';
      case 'picante':
        return 'PICANTE';
      case 'yo_nunca':
        return 'YO NUNCA';
      case 'extra':
        return 'RETO';
      default:
        return 'PREGUNTA';
    }
  };

  return (
    <div className={`transform transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
      <div className="backdrop-blur-lg bg-black/40 border-4 border-transparent rounded-3xl p-8 relative overflow-hidden group hover:scale-105 transition-all duration-500">
        {/* Animated border gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor()} rounded-3xl opacity-50 blur-sm group-hover:opacity-80 transition-opacity duration-300`}></div>
        <div className="absolute inset-[2px] bg-black/80 rounded-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-6">
            <div className={`bg-gradient-to-r ${getCategoryColor()} p-3 rounded-full`}>
              {getCategoryIcon()}
            </div>
          </div>

          <div className="text-center mb-6">
            <div className={`inline-block bg-gradient-to-r ${getCategoryColor()} px-4 py-1 rounded-full text-xs font-bold text-white mb-4`}>
              {getCategoryName()}
            </div>
            
            <h3 className="text-white text-xl md:text-2xl font-bold leading-relaxed">
              {question.isChallenge && !question.text.startsWith('Yo nunca') ? (
                <span>
                  🎯 <span className="text-yellow-400">RETO:</span><br />
                  {question.text}
                  <br />
                  <span className="text-sm text-gray-300 italic">
                    (o toma shot)
                  </span>
                </span>
              ) : (
                question.text
              )}
            </h3>
          </div>

          {question.category === 'yo_nunca' && (
            <div className="text-center">
              <p className="text-cyan-400 text-sm font-medium animate-pulse">
                🍻 Todos los que lo hayan hecho, ¡toman shot!
              </p>
            </div>
          )}
        </div>

        {/* Floating particles effect */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-30 animation-delay-150"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-yellow-400 rounded-full animate-pulse opacity-40"></div>
      </div>
    </div>
  );
};

export default QuestionCard;