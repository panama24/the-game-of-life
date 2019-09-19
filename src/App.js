import React, { useEffect, useState } from 'react';
import { initializeGrid } from './utils';
import './App.css';

const COLS = 30;
const ROWS = 30;

export const Cell = ({ isAlive, x, y }) => {
  return (
    <div className="item" data-testid="item">
      {isAlive ? '*' : ''}
    </div>
  );
};

export const Grid = ({ grid }) => {
  return grid.reverse().map(({ isAlive, x, y }) => (
    <Cell
      isAlive={isAlive}
      key={`${x}-${y}`}
      x={x}
      y={y}
    />
  ));
};

let count = 0;
function App() {
  const [grid, setGrid] = useState(initializeGrid(COLS, ROWS));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTick(count++);
    }, 3000);
  }, []);

  return (
    <div className="App">
      <div className="grid-container" data-testid="grid">
        <Grid grid={grid} />
      </div>
    </div>
  );
}

export default App;
