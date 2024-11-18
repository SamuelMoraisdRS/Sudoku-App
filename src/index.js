import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './components/MenuScreen';
import reportWebVitals from './reportWebVitals';
import PlayingScreen from './components/PlayingScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PlayingScreen
      board={[
        [1, -3, 4, 6, 7, 8, 5, 9, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [5, -9, 8, 3, 4, 2, 1, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, -8, 5, 3, 9, 7, 1],
        [7, 1, 3, 4, 2, 9, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 9, 1, 4, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, -7, 1, 9],
      ]
      }
      numChecks={3}
      numSubmits={3}
    />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
