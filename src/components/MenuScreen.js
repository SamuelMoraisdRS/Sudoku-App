import { PreviewSudokuBoard } from "./SudokuBoard.js";
import "./MenuScreen.css"
import "./SudokuBoard.css"

function SettingsSelector({ caption, updateSetting }) {
  return (
    <div>
      <input name="number-input" placeholder={caption} type="number" min={0} max={10} onChange={(event) => updateSetting(event.target.value)}
        style={{ "width": "80px" }}></input>
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
    <div id="menuScreen">
        <div id="settings">
          <SettingsSelector caption={"Checks"} updateSetting={updateNumOfChecks}></SettingsSelector>
          <SettingsSelector caption={"Submits"} updateSetting={updateNumOfSubmits}></SettingsSelector>
        </div>
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
          startGame();
        }}> Select Puzzle </button>
    </div>
  );
}