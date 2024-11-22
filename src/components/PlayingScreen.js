import { useState } from "react";
import { useRef } from "react";
import { SudokuBoard } from "./SudokuBoard";
import "./PlayingScreen.css";

class Cell {
  #key;
  #row;
  #column;
  #value;
  #status;
  generateCellKey(row, column) {  // TODO should receive as dependency
    return `${row}${column}`;
  }
  constructor(row, column, value, status) {
    this.#key = this.generateCellKey(row, column);
    this.#value = value;
    this.#status = status;
    this.#column = column;
    this.#row = row;
  }
  get value() {
    return this.#value;
  }
  get status() {
    return this.#status;
  }
  get key() {
    return this.#key;
  }
  get row() {
    return this.#row;
  }
  get column() {
    return this.#column;
  }
}

const isCorrectValue = (value) => value < 0;

function Button({ buttonLabel, onClickHandler }) {
  return (
    <div>
      <button onClick={onClickHandler}> {buttonLabel} </button>
    </div>
  );
}

const createPlayBoard = (boardMatrix) => {
  let map = new Map();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let id = `${i}${j}`;
      if (isCorrectValue(boardMatrix[i][j])) {
        map.set(id, new Cell(i, j, null, "empty"));
      } else {
        map.set(id, new Cell(i, j, boardMatrix[i][j], "original"));
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
  if (value === -boardValue) return "correct"; //TODO we should check in relation to the correctAnswers map object
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

const checkWin = (currentPlayBoard, correctValues) => {
  correctValues.forEach((cell) => {
    if (currentPlayBoard.get(cell.key) === -cell.value) {
      return false;
    }
  });
  return true;
};

const AlertModal = ({ children, onClose }) => {
  return (
    <div className="backdrop">
      <div className="modal">
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

const QuitModal = ({ quitFunction, cancelQuitFunction }) => {
  return (
    <div>
      <h1> Are you sure you want to quit? </h1>
      <button onClick={quitFunction}>Yes</button>
      <button onClick={cancelQuitFunction}>No</button>
    </div>
  )
}

export default function PlayingScreen({ board, numChecks, numSubmits, endGame }) {
  // Game board represented as a Map. gets updated with each play.
  const [currentPlayBoard, setPlayBoard] = useState(() =>
    createPlayBoard(board)
  );
  const [gameState, setGameState] = useState("playing");
  const [numberOfChecks, setNumberOfChecks] = useState(numChecks);
  const [numberOfSubmits, setNumberOfSubmits] = useState(numSubmits);

  // makeshift filter function for Map objects.
  let arr = [];
  currentPlayBoard.forEach((cell, key) => {
    if (cell.status === "empty") {
      arr.push(cell);
    }
  });

  const CORRECT_ANSWERS = useRef(
    arr.map((cell) => {
      return new Cell(
        cell.row,
        cell.column,
        board[cell.row][cell.column],
        "correct"
      );
    })
  );


  function processPlays(row, column, value) {
    let newPlayBoard = new Map(currentPlayBoard);
    let status = checkPlay(board, row, column, value);
    const cell = new Cell(row, column, value, status);
    newPlayBoard.set(cell.key, cell);
    setPlayBoard(newPlayBoard);
  }

  function switchToCheckingState() {
    if (gameState === "checking") {
      setGameState("playing");
    } else if (gameState === "playing") {
      if (numberOfChecks === 0) {
        return;
      }
      setGameState("checking");
      setNumberOfChecks(numberOfChecks - 1);
    }
  }

  function submit() {
    if (checkWin(currentPlayBoard, CORRECT_ANSWERS.current)) {
      setGameState("win");
    }
  }

  function quit() {
    endGame('quitting')
  };
  function cancelQuit() {
    setGameState('playing')
 };

  if (gameState === 'win') {
    return (
      // STUB
      <h1>YOU WON!</h1>
    )
  } else if (gameState === 'quitting') {
    return (
      <AlertModal children={<QuitModal quitFunction={quit} cancelQuitFunction={cancelQuit} />}
        onClose={cancelQuit}
      />
    )
  } else {
    return (
      <div className="playingScreen">
        {/* {gameState === 'quitting' && <AlertModal message="Isso é um alerta!" onClose={} />} */}
        <div>
          <span> Checks left: {numberOfChecks}</span>
        </div>
        <SudokuBoard
          playBoard={currentPlayBoard}
          onChangeHandler={processPlays}
          gameState={gameState}
        />
        <div className="buttonArea">
          <Button
            buttonLabel={"Check"}
            onClickHandler={switchToCheckingState}
          />
          <Button buttonLabel={"submit"} onClickHandler={submit} />
          <Button buttonLabel={"Quit"} onClickHandler={() => setGameState('quitting')} /> {/* TODO erro */}
        </div>
      </div>
    );
  }

}
