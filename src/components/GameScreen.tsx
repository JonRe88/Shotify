import React, { useState, useEffect } from 'react';
import { Player, Question, GameMode } from '../types';
import { questions } from '../data/questions';
import QuestionCard from './QuestionCard';
import PlayerList from './PlayerList';
import Scoreboard from './Scoreboard';
import { Shuffle, RotateCcw, Dices, Trophy } from 'lucide-react';

interface GameScreenProps {
  players: Player[];
  gameMode: GameMode;
  onBack: () => void;
  onUpdatePlayers: (players: Player[]) => void;
  isEntering?: boolean;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, gameMode: initialGameMode, onBack, onUpdatePlayers, isEntering = false }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>(initialGameMode);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const [showCard, setShowCard] = useState(false);
  const [gamePlayers, setGamePlayers] = useState(players);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const currentPlayer = gamePlayers[currentPlayerIndex];

  useEffect(() => {
    onUpdatePlayers(gamePlayers);
  }, [gamePlayers, onUpdatePlayers]);

  const getRandomQuestion = (): Question => {
    let availableQuestions = questions;
    
    if (gameMode === 'yo_nunca') {
      availableQuestions = questions.filter(q => q.category === 'yo_nunca');
    } else {
      availableQuestions = questions.filter(q => q.category !== 'yo_nunca');
    }

    const unusedQuestions = availableQuestions.filter(q => !usedQuestions.has(q.id));
    
    if (unusedQuestions.length === 0) {
      setUsedQuestions(new Set());
      return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    }
    
    return unusedQuestions[Math.floor(Math.random() * unusedQuestions.length)];
  };

  const nextQuestion = () => {
    setShowCard(false);
    
    setTimeout(() => {
      const newQuestion = getRandomQuestion();
      setCurrentQuestion(newQuestion);
      setUsedQuestions(prev => new Set([...prev, newQuestion.id]));
      setShowCard(true);
      
      // Avanzar al siguiente jugador
      setCurrentPlayerIndex((prev) => (prev + 1) % gamePlayers.length);
    }, 300);
  };

  const addShot = (playerId: string) => {
    setGamePlayers(prev => 
      prev.map(p => 
        p.id === playerId 
          ? { ...p, shots: p.shots + 1 }
          : p
      )
    );
  };

  const addShotToAll = () => {
    setGamePlayers(prev => 
      prev.map(p => ({ ...p, shots: p.shots + 1 }))
    );
  };

  const resetGame = () => {
    setGamePlayers(prev => prev.map(p => ({ ...p, shots: 0 })));
    setUsedQuestions(new Set());
    setCurrentQuestion(null);
    setShowCard(false);
    setCurrentPlayerIndex(0);
  };

  useEffect(() => {
    if (!currentQuestion) {
      nextQuestion();
    }
  }, []);

  return (
    <div className={`min-h-screen p-4 transition-all duration-1000 ${
      isEntering ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300"
          >
            ← Volver
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowScoreboard(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(251,191,36,0.5)] flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              RANKING
            </button>
            
            <button
              onClick={() => setGameMode(gameMode === 'questions' ? 'yo_nunca' : 'questions')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                gameMode === 'yo_nunca'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
              }`}
            >
              {gameMode === 'yo_nunca' ? '⚡ YO NUNCA' : '🎯 PREGUNTAS'}
            </button>
            
            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Card */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-center mb-2">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Es turno de: {currentPlayer.name}
                </span>
              </h2>
              <div className="text-center">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full text-sm font-bold text-black">
                  Shots: {currentPlayer.shots} 🍺
                </span>
              </div>
            </div>

            {currentQuestion && (
              <div className="mb-6">
                <QuestionCard question={currentQuestion} isVisible={showCard} />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {currentQuestion?.category === 'yo_nunca' ? (
                <>
                  <button
                    onClick={addShotToAll}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
                  >
                    🍻 TODOS TOMAN
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] flex items-center gap-2"
                  >
                    <Shuffle className="w-5 h-5" />
                    SIGUIENTE
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      addShot(currentPlayer.id);
                      nextQuestion();
                    }}
                    className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]"
                  >
                    🍻 TOMAR SHOT
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] flex items-center gap-2"
                  >
                    <Dices className="w-5 h-5" />
                    SIGUIENTE
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Players List */}
          <div className="lg:col-span-1">
            <PlayerList players={gamePlayers} currentPlayer={currentPlayer} />
          </div>
        </div>
      </div>
      
      {/* Scoreboard Modal */}
      <Scoreboard 
        players={gamePlayers}
        isVisible={showScoreboard}
        onClose={() => setShowScoreboard(false)}
      />
    </div>
  );
};

export default GameScreen;