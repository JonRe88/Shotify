import React, { useState } from 'react';
import { Player, GameMode } from '../types';
import { UserPlus, Play, Trash2, Zap, Target } from 'lucide-react';

interface StartScreenProps {
  onStartGame: (players: Player[], gameMode: GameMode) => void;
  isTransitioning?: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame, isTransitioning = false }) => {
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);

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

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
    setShowPlayerSetup(true);
  };

  const backToModeSelection = () => {
    setShowPlayerSetup(false);
    setSelectedMode(null);
    setPlayers([]);
    setPlayerName('');
  };

  const startGame = () => {
    if (selectedMode && players.length >= 2) {
      onStartGame(players, selectedMode);
    }
  };

  if (!showPlayerSetup) {
    // Mode Selection Screen
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
        isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
      }`}>
        <div className="w-full max-w-md text-center">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-7xl font-black mb-4 neon-text bg-gradient-to-r from-cyan-400 via-green-300 to-cyan-400 bg-clip-text text-transparent animate-pulse tracking-wide">
              SHOTIFY
            </h1>
            <p className="text-lg font-medium text-gray-300 mb-2">
              Party game de shots
            </p>
            <p className="text-sm text-yellow-400 font-semibold">
              (juega con moderación)
            </p>
          </div>

          {/* Mode Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 neon-text">
              ESCOGER MODALIDAD DE JUEGO
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={() => selectMode('yo_nunca')}
                className="w-full max-w-[260px] mx-auto block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 border border-purple-400/30 backdrop-blur-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6" />
                  YO NUNCA, NUNCA
                </div>
              </button>
              
              <button
                onClick={() => selectMode('questions')}
                className="w-full max-w-[260px] mx-auto block bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105 active:scale-95 border border-cyan-400/30 backdrop-blur-lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <Target className="w-6 h-6" />
                  VERDAD O SHOT
                </div>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="backdrop-blur-lg bg-black/30 border border-cyan-400/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            <h3 className="text-cyan-400 font-bold mb-3">¿Cómo jugar?</h3>
            <div className="text-left text-sm text-gray-300 space-y-2">
              <p><span className="text-purple-400 font-semibold">YO NUNCA:</span> Todos los que lo hayan hecho toman shot</p>
              <p><span className="text-cyan-400 font-semibold">VERDAD O SHOT:</span> Responde la verdad o toma shot</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Player Setup Screen
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-1000 ${
      isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
    }`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <button
            onClick={backToModeSelection}
            className="mb-4 text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Cambiar modalidad
          </button>
          
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-pulse">
            🎲 {selectedMode === 'yo_nunca' ? 'YO NUNCA' : 'VERDAD O SHOT'}
          </h1>
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
              className="flex-1 bg-black/50 border border-purple-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_50px_rgba(34,211,238,0.5)] transition-all duration-300"
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
                  style={{ animationDelay: `${index * 100}ms` }}
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
                ¡{players.length} jugadores listos para {selectedMode === 'yo_nunca' ? 'YO NUNCA' : 'VERDAD O SHOT'}!
              </p>
            )}
            
            <button
              onClick={startGame}
              disabled={players.length < 2}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-gray-600 disabled:to-gray-700 px-6 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] disabled:hover:shadow-none flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
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