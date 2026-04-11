import React from 'react';
import { Player } from '../types';
import { Trophy, Medal, Award, Target } from 'lucide-react';

interface ScoreboardProps {
  players: Player[];
  isVisible: boolean;
  onClose: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, isVisible, onClose }) => {
  // Sort players by shots (ascending - fewer shots = better)
  const sortedPlayers = [...players].sort((a, b) => a.shots - b.shots);
  
  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'from-yellow-400 to-orange-500';
      case 1:
        return 'from-gray-300 to-gray-500';
      case 2:
        return 'from-amber-500 to-amber-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getRankText = (index: number) => {
    switch (index) {
      case 0:
        return '🏆 GANADOR';
      case 1:
        return '🥈 2DO LUGAR';
      case 2:
        return '🥉 3ER LUGAR';
      default:
        return `#${index + 1}`;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md transform transition-all duration-500 scale-100">
        <div className="backdrop-blur-lg bg-black/40 border-2 border-cyan-400/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(34,211,238,0.4)] relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-2">
                🏆 SCOREBOARD
              </h2>
              <p className="text-gray-300 text-sm">
                Menos shots = mejor posición
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/50 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                      : 'bg-black/40 border border-gray-600/30'
                  } animate-fadeIn`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getRankColor(index)}`}>
                      {getRankIcon(index)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          index === 0 ? 'text-yellow-400' : 'text-white'
                        }`}>
                          {player.name}
                        </span>
                        {index === 0 && (
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-full text-xs font-bold text-black animate-pulse">
                            WINNER
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-medium ${
                        index === 0 ? 'text-yellow-300' : 'text-gray-400'
                      }`}>
                        {getRankText(index)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {player.shots}
                    </div>
                    <div className="text-xs text-gray-400">shots</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Winner celebration */}
            {sortedPlayers.length > 0 && (
              <div className="text-center mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl">
                <div className="text-yellow-400 text-lg font-bold mb-1">
                  🎉 ¡{sortedPlayers[0].name} es el ganador! 🎉
                </div>
                <div className="text-gray-300 text-sm">
                  Con solo {sortedPlayers[0].shots} shots
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95"
            >
              CONTINUAR JUGANDO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;