import React from 'react';
import logo from './logo.svg';
import './App.css';

export const trueOrFalse = () => !!Math.floor(Math.random() * 2);
export const generateRandArray = () => Array(10).fill(null).map(c => trueOrFalse());

export const generateGrid = () => Array(10)
  .fill(generateRandArray())
  .map(arr => generateRandArray());

export const shouldLive = (cellState, neighbors) => {
  if (cellState) {
    const count = neighbors.reduce((acc, curr) => {
      if (curr) {
        acc += 1
      }
      return acc;
    }, 0);

    return count === 2 || count === 3;
  }

  if (!cellState) {
    const count = neighbors.reduce((acc, curr) => {
      if (curr) {
        acc += 1
      }
      return acc;
    }, 0);

    return count === 3;
  }
};

export const perfectCond = (grid, rowIdx, colIdx) => {
  const row = grid[rowIdx];
  const prevRow = grid[rowIdx-1];
  const nextRow = grid[rowIdx+1];

  const cell = row[colIdx];
  const prevCell = row[colIdx-1];
  const nextCell = row[colIdx+1];

  if (row === 0) {
    if (cell === 0) {
      // is top left corner
      const check = [nextCell, nextRow[colIdx], nextRow[colIdx+1]]
    }
    if (cell === row.length-1) {
      // is top right corner
      const check = [prevCell, nextRow[colIdx], nextRow[colIdx-1]]
    }
  }

  if (row === grid.length -1) {
    if (cell === 0) {
      // is bottom left corner
      const check = [nextCell, prevRow[colIdx], prevRow[colIdx+1]]
    }
    if (cell === row.length-1) {
      // is bottom right corner
      const check = [prevCell, prevRow[colIdx], prevRow[colIdx-1]]
    }
  }

  // is a middle cell
  const check = [
    prevRow[colIdx-1],
    prevRow[colIdx],
    prevRow[colIdx+1],
    prevCell,
    nextCell,
    nextRow[colIdx-1],
    nextRow[colIdx],
    nextRow[colIdx+1],
  ];
};

export class Cell {
  isAlive() {
    return true;
  }
}
// export const Grid = () => {
  // const arrays = generateGrid();
  // return (
    // <>
      // {arrays.map((a, i) => {
        // return (
          // <Cell key={i} content={a} />
        // )
      // })}
    // </>
  // );
// };

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
