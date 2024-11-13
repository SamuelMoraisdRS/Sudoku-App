import "./SudokuBoard.css";

const NUMBER_COLORS = {
  original: "black",
  valid: "blue",
  correct: "green",
  incorrect: "red",
  invalid: "orange",
};

function InputNumber({ row, column, cellColor, onChangeHandler, value }) {
  return (
    <input
      type="text"
      placeholder={value}
      style={{ color: cellColor }}
      className="InputNumber"
      onChange={(event) => {
        const newValue = event.target.value;
        onChangeHandler(row, column, newValue);
      }}
    ></input>
  );
}

function Square({ row, column, status, value, onChangeHandler }) {
  return (
    <div>
      <div className="cell">
        {status === "original" ? (
          <span> {value} </span>
        ) : (
          <InputNumber
            row={row}
            column={column}
            cellColor={NUMBER_COLORS[status]}
            onChangeHandler={onChangeHandler}
            value={value}
          />
        )}
      </div>
    </div>
  );
}

export function SudokuBoard({ playBoard, onChangeHandler }) {
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
