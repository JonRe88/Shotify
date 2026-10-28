import React, { useState } from 'react';
import { Player } from '../types';
import { UserPlus, Play, Trash2 } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (players: Player[]) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = () => {
    if (playerName.trim() && players.length < 8) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: playerName.trim(),
        shots: 0
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const removePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            🎲 VERDAD
          </h1>
          <h2 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            O SHOT
          </h2>
          <p className="text-gray-300 mt-4">Añade jugadores para comenzar</p>
        </div>

        <div className="backdrop-blur-lg bg-black/30 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nombre del jugador..."
              className="flex-1 bg-black/50 border border-purple-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
              maxLength={15}
            />
            <button
              onClick={addPlayer}
              disabled={!playerName.trim() || players.length >= 8}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 px-4 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] disabled:hover:shadow-none"
            >
              <UserPlus className="w-5 h-5" />
            </button>
          </div>

          {players.length > 0 && (
            <div className="space-y-3 mb-6">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between bg-black/40 border border-gray-700 rounded-xl px-4 py-3 animate-fadeIn"
                >
                  <span className="text-white font-medium">
                    {index + 1}. {player.name}
                  </span>
                  <button
                    onClick={() => removePlayer(player.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="text-center">
            {players.length < 2 ? (
              <p className="text-gray-400 text-sm mb-4">
                Necesitas al menos 2 jugadores
              </p>
            ) : (
              <p className="text-green-400 text-sm mb-4">
                ¡{players.length} jugadores listos!
              </p>
            )}
            
            <button
              onClick={() => onStartGame(players)}
              disabled={players.length < 2}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 px-6 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:hover:shadow-none flex items-center justify-center gap-3"
            >
              <Play className="w-6 h-6" />
              ¡COMENZAR JUEGO!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;