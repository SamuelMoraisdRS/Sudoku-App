// import { boards } from "../data/boards.js";
import { PreviewSudokuBoard } from "./SudokuBoard.js";
import { useState } from "react";
import "./MenuScreen.css"


export default function MenuScreen({ boards, startGame, updateSettings }) {

  const [currentBoard, setcurrentBoard] = useState(0);

  function nextBoard() {
    if (currentBoard === boards.length - 1) {
      setcurrentBoard(0);
    } else {
      setcurrentBoard(currentBoard + 1);
    }
  }

  function prevBoard() {
    if (currentBoard === 0) {
      setcurrentBoard(boards.length - 1);
    } else {
      setcurrentBoard(currentBoard - 1);
    }
  }

  return (
    <div className="MenuScreen">
      <header className="Menu-header">
        <h1>Sudoku</h1>
      </header>
      <main>
        <span>
          Dificulty: {boards[currentBoard].dificulty}
        </span>
        <span className="boardSelection">
          <button onClick={prevBoard}>Previous</button>
          <PreviewSudokuBoard
            board={boards[currentBoard].board}
          />
          <button onClick={nextBoard}>Next</button>
        </span>
        <button onClick={() => {
          // TODO: Replace the mock attributes below
          const newSettings = { boardId : boards[currentBoard].id, numberOfChecks : 2, numberOfSubmits : 2}
          updateSettings(newSettings);
          startGame();
        }}> Select Puzzle </button>
      </main>
    </div>
  );
}