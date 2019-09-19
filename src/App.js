import React, { useEffect, useRef, useState } from 'react';
import { initializeGrid, redrawGrid } from './utils';
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

const useInterval = (cb, delay) => {
  const savedCb = useRef();

  // remember latest cb
  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => savedCb.current();

    if (delay !== null) {
       let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

function App() {
  const [grid, setGrid] = useState(initializeGrid(COLS, ROWS));

  useInterval(() => {
    setGrid(redrawGrid(grid));
  }, 2000);

  return (
    <div className="App">
      <div className="grid-container" data-testid="grid">
        <Grid grid={grid} />
      </div>
    </div>
  );
}

export default App;
