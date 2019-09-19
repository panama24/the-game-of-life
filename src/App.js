import React from 'react';
import logo from './logo.svg';
import './App.css';

export const trueOrFalse = () => !!Math.floor(Math.random() * 2);
export const generateRandArray = () => Array(10).fill(null).map(c => trueOrFalse());

export const generateGrid = () => Array(10)
  .fill(generateRandArray())
  .map(arr => generateRandArray());

export const getCount = (array) => array.reduce((acc, { isAlive }) => {
  if (isAlive) {
    acc += 1
  }
  return acc;
}, 0);

export const cell = (x, y, isAlive) => ({ x, y, isAlive });

export const makeGrid = (cols, rows) => {
  let cells = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const cellX = i;
      const cellY = j;
      const isAlive = trueOrFalse();
      cells.push(cell(cellX, cellY, isAlive));
    }
  }

  return cells;
}
export const shouldLive = (cell, neighbors) => {
  const count = getCount(neighbors);
  return cell.isAlive
    ? (count === 2 || count === 3)
    : count === 3;
};

export class Cell {
  isAlive() {
    return true;
  }
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
