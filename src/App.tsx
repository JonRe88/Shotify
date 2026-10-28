import React, { useState } from 'react';
import { Player, GamePhase } from './types';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);

  const startGame = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
    setGamePhase('playing');
  };

  const backToSetup = () => {
    setGamePhase('setup');
  };

  const updatePlayers = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
        <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl animate-pulse animation-delay-700"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-cyan-400 rounded-full animate-float opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {gamePhase === 'setup' ? (
          <StartScreen onStartGame={startGame} />
        ) : (
          <GameScreen 
            players={players} 
            onBack={backToSetup}
            onUpdatePlayers={updatePlayers}
          />
        )}
      </div>
    </div>
  );
}

export default App;