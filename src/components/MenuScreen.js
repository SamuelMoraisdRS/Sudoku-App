// import { boards } from "../data/boards.js";
import { PreviewSudokuBoard } from "./SudokuBoard.js";
import "./MenuScreen.css"


function SettingsSelector({caption, updateSetting}) {
  return (
    <div>
      <input name="number-input" type="number" min={0} max={10} onChange={(event) => updateSetting(event.target.value)}></input>
      <label htmlFor="number-imput">
        {caption}
      </label>
    </div>
  )
}

export default function MenuScreen({ boards, startGame, updateSetting, currentBoardId }) {

  function nextBoard() {
    const nextBoard = currentBoardId === boards.length - 1 ? 0 : ++currentBoardId;
    updateSetting("boardId", nextBoard);
  }

  function prevBoard() {
    const prevBoard = currentBoardId === 0 ? boards.length - 1 : --currentBoardId;
    updateSetting("boardId", prevBoard);
  }

  function updateNumOfChecks(number) {
    updateSetting("numberOfChecks", number)
  }

  function updateNumOfSubmits(number) {
    updateSetting("numberOfSubmits", number)
  }

  return (
    <div className="MenuScreen">
      <header className="Menu-header">
        <h1>Sudoku</h1>
      </header>
      <main>
        <SettingsSelector caption={"Number of Checks"} updateSetting={updateNumOfChecks}></SettingsSelector>
        <SettingsSelector caption={"Number of Submits"} updateSetting={updateNumOfSubmits}></SettingsSelector>
        <span>
          Dificulty: {boards[currentBoardId].dificulty}
        </span>
        <span className="boardSelection">
          <button onClick={prevBoard}>Previous</button>
          <PreviewSudokuBoard
            board={boards[currentBoardId].board}
          />
          <button onClick={nextBoard}>Next</button>
        </span>
        <button onClick={() => {
          // updateSettings(currentSettings);
          startGame();
        }}> Select Puzzle </button>
      </main>
    </div>
  );
}