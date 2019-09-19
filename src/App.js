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

/* [
 * {x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}, {x:4, y:4},
 * {x:0, y:3}, {x:1, y:3}, {x:2, y:3}, {x:3, y:3}, {x:4, y:3},
 * {x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2},
 * {x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1},
 * {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0},
 * ] */
const getCoords = (x, y) => [
  { x, y: y+1 },
  { x, y: y-1 },
  { x: x+1, y: y+1 },
  { x: x+1, y },
  { x: x+1, y: y-1 },
  { x: x-1, y: y+1 },
  { x: x-1, y },
  { x: x-1, y: y-1 },
];

export const getNeighbors = (grid, cell) => {
  const coords = getCoords(cell.x, cell.y);

  let neighbors = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (grid[i]['x'] === coords[j]['x'] && grid[i]['y'] === coords[j]['y']) {
        neighbors.push(grid[i])
      }
    }
  }
  return neighbors;
}

export const shouldLive = (cell, neighbors) => {
  const count = getCount(neighbors);
  return cell.isAlive
    ? (count === 2 || count === 3)
    : count === 3;
};

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
