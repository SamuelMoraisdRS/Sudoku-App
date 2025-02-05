import "./SudokuBoard.css";

const NUMBER_COLORS = {
  original: "black",
  correct: "blue",
  incorrect: "blue",
  invalid: "orange",
};

const CHECKING_COLORS = {
  original: "black",
  correct: "greenyellow",
  incorrect: "red",
  invalid: "red",
};

function InputNumber({ row, column, cellColor, onChangeHandler, value }) {
  return (
    <input
      type="text"
      value={value}
      style={{ color: cellColor, textAlign: "center" }}
      className="InputNumber"
      onChange={(event) => {
        const newValue = event.target.value;
        onChangeHandler(row, column, newValue);
      }}
    ></input>
  );
}


function Square({ row, column, status, value, onChangeHandler, gameState }) {
  return (
    <div>
      <div className="cell">
        {status === "original" || gameState === "checking" ? (
          <span style={{ color: CHECKING_COLORS[status] }}> {value} </span>
        ) : (
          <InputNumber
            row={row}
            column={column}
            cellColor={
              gameState === "playing"
                ? NUMBER_COLORS[status]
                : CHECKING_COLORS[status]
            }
            onChangeHandler={onChangeHandler}
            value={value}
          />
        )}
      </div>
    </div>
  );
}

export function SudokuBoard({ playBoard, onChangeHandler, gameState }) {
  const squares = [[], [], [], [], [], [], [], [], []];
  let row = 0;
  playBoard.forEach((play, key) => {
    squares[row].push(
      <Square
        key={key}
        value={play.value}
        row={key[0]}
        column={key[1]}
        status={play.status}
        onChangeHandler={onChangeHandler}
        gameState={gameState}
      />
    );
    if (squares[row].length === 9) {
      row++;
    }
  });
  return (
    <div className="board">
      {squares.map((square, index) => (
        <div key={index} className="boardRow">
          {square}
        </div>
      ))}
    </div>
  );
}

export function PreviewSudokuBoard({ board }) {
  const squares = [[], [], [], [], [], [], [], [], []];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j] < 0 ? null : board[i][j]
      squares[i].push(
        <Square key={`${i}${j}`} value={value} row={i} column={j} status={'original'} gameState={'checking'} onChangeHandler={null} />
      )
    }
  }
  return (
    <div className="preview">
      <div className="board">
        {squares.map((square, index) => (
          <div key={index} className="boardRow">
            {square}
          </div>
        ))}
      </div>
    </div>

  )
}