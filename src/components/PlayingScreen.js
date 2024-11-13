import { useState } from "react";
import { SudokuBoard } from "./SudokuBoard";

// TODO Implement ID as a private attribute for Cell
// TODO rename Cell
class Cell {
  #value;
  #status;
  constructor(value, status) {
    this.#value = value;
    this.#status = status;
  }
  get value() {
    return this.#value;
  }
  get status() {
    return this.#status;
  }
}

const checkCorrectAnswer = (value) => value < 0;

function CheckingButton({ checkingPlaysFunction }) {
  return (
    <div>
      <button onClick={checkingPlaysFunction}>Check</button>
    </div>
  );
}

const createPlayBoard = (boardObject) => {
  let map = new Map();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let id = `${i}${j}`;
      if (boardObject[i][j] < 0) {
        map.set(id, new Cell(null, "empty"));
      } else {
        map.set(id, new Cell(boardObject[i][j], "original"));
      }
    }
  }
  return map;
};

function checkPlay(board, row, column, value) {
  row = parseInt(row);
  column = parseInt(column);
  value = parseInt(value);
  const boardValue = board[row][column];
  if (value === -boardValue) return "correct";
  const getZoneBounds = (index) => {
    if (index <= 2) return [0, 2];
    if (index <= 5) return [3, 5];
    return [6, 8];
  };
  const rowBounds = getZoneBounds(row);
  const columnBounds = getZoneBounds(column);
  // The board is split into three 3x3 grids. This array reprents its values
  const zone = [];
  for (let i = rowBounds[0]; i <= rowBounds[1]; i++) {
    for (let j = columnBounds[0]; j <= columnBounds[1]; j++) {
      zone.push(board[i][j]);
    }
  }
  if (
    board[row].includes(value) || // row values
    board.map((row) => row[column]).includes(value) || //column values
    zone.includes(value) // zone values
  ) {
    return "invalid";
  }
  return "valid";
}

export default function PlayingScreen({ board }) {
  // Game board represented as a Map. gets updated with each play.
  const [currentPlayBoard, setPlayBoard] = useState(createPlayBoard(board));
  const [gameState, setGameState] = useState("playing");

  function switchToCheckingState() {
    setGameState("checking");
  }

  function processPlays(row, column, value) {
    let newPlayBoard = new Map(currentPlayBoard);
    let status = checkPlay(board, row, column, value);
    newPlayBoard.set(`${row}${column}`, new Cell(value, status));
    setPlayBoard(newPlayBoard);
  }

  return (
    <div className="playingScreen">
      <SudokuBoard playBoard={currentPlayBoard} onChangeHandler={processPlays}
                   gameState={gameState} />
      <CheckingButton checkingPlaysFunction={switchToCheckingState} />
    </div>
  );
}
