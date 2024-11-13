import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [gameState, setGameState] = useState('menu');

  const startGame = () => setGameState('playing');
  const goToMenu = () => setGameState('menu');
  const checkPlay = () => setGameState('checking');

  if (gameState == 'menu') {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Sudoku</h1>
        <p>
          Select Board
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    );
  } else if (gameState == 'playing') {
    // return();
  } else {
    // return();
  }

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
