import { useState } from "react";
import { SudokuBoard } from "./SudokuBoard";

const checkCorrectAnswer = (value) => value < 0;
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
export default function PlayingScreen({ board }) {
  const createPlayBoard = (b) => {
    let map = new Map();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let id = `${i}${j}`;
        if (b[i][j] < 0) {
          map.set(id, new Cell(null, "empty"));
        } else {
          map.set(id, new Cell(b[i][j], "original"));
        }
      }
    }
    return map;
  };
  const [currentPlayBoard, setPlayBoard] = useState(createPlayBoard(board));
  const [gameState, setGameState] = useState('playing')
  function checkAnswer(row, column, value) {
    // TODO Find out how to get parameters as strings
    row = parseInt(row);
    column = parseInt(column);
    value = parseInt(value);
    const boardValue = board[row][column];
    if (value == -boardValue) {
      return "correct";
    }
    // TODO Should become a function later
    let firstRow, lastRow, firstColumn, lastColumn;
    if (row <= 2) {
      firstRow = 0;
      lastRow = 2;
    } else if (row <= 5) {
      firstRow = 3;
      lastRow = 5;
    } else {
      firstRow = 6;
      lastRow = 8;
    }

    if (column <= 2) {
      firstColumn = 0;
      lastColumn = 2;
    } else if (column <= 5) {
      firstColumn = 3;
      lastColumn = 5;
    } else {
      firstColumn = 6;
      lastColumn = 8;
    }
    const zone = [];
    for (let i = firstRow; i <= lastRow; i++) {
      for (let j = firstColumn; j <= lastColumn; j++) {
        zone.push(board[i][j]);
      }
    }
    if (
      board[row].includes(value) ||
      board.map((row) => row[column]).includes(value) ||
      zone.includes(value)
    ) {
      console.log("invalido");
      return "invalid";
    }
    return "valid";
  }

  function receiveInputs(row, column, value) {
    let newPlayBoard = new Map(currentPlayBoard);
    let status = checkAnswer(row, column, value);
    console.log(`valor recebido: ${value}; status : ${status}`);
    newPlayBoard.set(`${row}${column}`, new Cell(value, status));
    setPlayBoard(newPlayBoard);
  }
  return (
    <div>
      <SudokuBoard
        playBoard={currentPlayBoard}
        onChangeHandler={receiveInputs}
      />
    </div>
  );
}
