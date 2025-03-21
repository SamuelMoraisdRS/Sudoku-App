import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { boards } from './data/boards';
import PlayingScreen from './components/PlayingScreen';
import MenuScreen from './components/MenuScreen';

const DEFAULT_SETTINGS = { boardId: 0, numberOfChecks: 3, numberOfSubmits: 3 }

function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');

  const [gameSettings, setGameSettings] = useState(DEFAULT_SETTINGS);

  function updateSetting(key, value) {
    setGameSettings({...gameSettings, [key] : value});
  }

  function startGame() {
    setCurrentScreen('playing');
  }

  function endsGame(ending) {
    setCurrentScreen('menu');
  }
  return (
    <div id="App">
      <header>
        <h1>Sudoku</h1>
      </header>
      <main>
        {currentScreen === 'menu' && <MenuScreen boards={boards} startGame={startGame} updateSetting={updateSetting} currentBoardId={gameSettings.boardId} />}
        {currentScreen === 'playing' && <PlayingScreen board={boards[gameSettings.boardId].board}
          endGame={endsGame}
          settings={gameSettings}
          updateSetting={updateSetting} />}
      </main>
      <footer>
        <span><h4>Samuel Morais</h4></span>
      </footer>
      </div>
  );
}

export default App;
