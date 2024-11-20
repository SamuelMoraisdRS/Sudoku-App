import { boards } from "../data/boards.js";
import { PreviewSudokuBoard } from "./SudokuBoard.js";
import { useState } from "react";


export default function MenuScreen() {

  const [currentBoard, setcurrentBoard] = useState(0);

console.log(boards[currentBoard].board)

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
        <span>
          Dificulty: {boards[currentBoard].dificulty}
        </span>
      </header>
      <main>
        <button onClick={prevBoard}>Previous</button>
        <PreviewSudokuBoard
          board={boards[currentBoard].board}
        />
        <button onClick={nextBoard}>Next</button>
      </main>
    </div>
  );
}