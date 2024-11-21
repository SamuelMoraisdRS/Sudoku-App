import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { boards } from './data/boards';
import PlayingScreen from './components/PlayingScreen';
import MenuScreen from './components/MenuScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const [gameSettings, setGameSettings] = useState({ boardId: 0, numberOfChecks: 3, numberOfSubmits: 3 });


  function updateSettings(newSettings) {
    setGameSettings(newSettings);
  }
  function startGame() {
    setCurrentScreen('playing');
  }
  /**
   *
   * @param {string} outcome How the game ended (the player won, quit or ran out of submits)
   */
  function endsGame(outcome) {
    setCurrentScreen('ending'); // TODO we'll decide on how to do this later
  }
  return (
    <div className="App">
      {currentScreen === 'menu' && <MenuScreen boards={boards} startGame={startGame} updateSettings={updateSettings} />}
      {currentScreen === 'playing' && <PlayingScreen board={boards[gameSettings.boardId].board}
                                                     endGame={endsGame}
                                                     numChecks={gameSettings.numberOfChecks}
                                                     numSubmits={gameSettings.numberOfSubmits} />}
      {/* {currentScreen === 'ending' && <GameOver score={score} restartGame={restartGame} />} */}
    </div>
  );


}

export default App;
