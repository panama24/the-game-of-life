import React, { useEffect, useState } from 'react';
import { makeGrid } from './utils';
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

function App() {
  const [grid, setGrid] = useState(makeGrid(COLS, ROWS));

  return (
    <div className="App">
      <div className="grid-container" data-testid="grid">
        <Grid grid={grid} />
      </div>
    </div>
  );
}

export default App;
