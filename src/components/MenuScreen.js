// import { boards } from "../data/boards.js";
import { PreviewSudokuBoard } from "./SudokuBoard.js";
import { useState } from "react";
import "./MenuScreen.css"

const DEFAULT_SETTINGS = {boardId : 0, numberOfChecks : 3, numberOfSubmits : 3}

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

export default function MenuScreen({ boards, startGame, updateSettings }) {

  const [currentSettings, setCurrentSettings] = useState(DEFAULT_SETTINGS)

  const [currentBoard, setcurrentBoard] = useState(0);

  function nextBoard() {
    if (currentSettings.boardId === boards.length - 1) {
      setCurrentSettings({...currentSettings, boardId : 0});
    } else {
      setCurrentSettings({ ...currentSettings, boardId: currentBoard + 1 });
    }
  }

  function prevBoard() {
    if (currentSettings.boardId === 0) {
      setCurrentSettings({ ...currentSettings, boardId: boards.length - 1});
    } else {
      setCurrentSettings({ ...currentSettings, boardId: currentBoard - 1 });
    }
  }

  function updateNumOfChecks(number) {
    setCurrentSettings({...currentSettings, numberOfChecks : number})
  }

  function updateNumOfSubmits(number) {
    setCurrentSettings({ ...currentSettings, numberOfSubmits: number })
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
          updateSettings(currentSettings);
          startGame();
        }}> Select Puzzle </button>
      </main>
    </div>
  );
}