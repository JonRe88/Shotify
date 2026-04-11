import React from 'react';
import { Player } from '../types';
import { Crown, User } from 'lucide-react';

interface PlayerListProps {
  players: Player[];
  currentPlayer: Player | null;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayer }) => {
  const totalShots = players.reduce((sum, player) => sum + player.shots, 0);
  
  return (
    <div className="backdrop-blur-lg bg-black/30 border border-cyan-400/30 rounded-2xl p-4 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
      <h3 className="text-white font-bold text-lg mb-4 text-center flex items-center justify-center gap-2">
        <Crown className="w-5 h-5 text-yellow-400" />
        JUGADORES
      </h3>
      
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
              currentPlayer?.id === player.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                : 'bg-black/40 border border-gray-600/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                currentPlayer?.id === player.id
                  ? 'bg-gradient-to-r from-cyan-400 to-purple-400'
                  : 'bg-gray-600'
              }`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold ${
                currentPlayer?.id === player.id ? 'text-cyan-400' : 'text-white'
              }`}>
                {player.name}
              </span>
              {currentPlayer?.id === player.id && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-full text-xs font-bold text-black animate-pulse">
                  TU TURNO
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">🍺</span>
              <span className="text-white font-bold">{player.shots}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="text-center">
          <span className="text-gray-400 text-sm">Total shots: </span>
          <span className="text-yellow-400 font-bold text-lg">{totalShots} 🍻</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerList;