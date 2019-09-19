import React from 'react';
import { makeGrid } from './utils';
import './App.css';

const COLS = 30;
const ROWS = 30;

function App() {
  const grid = makeGrid(COLS, ROWS)

  return (
    <div className="App">
      <div className="grid-container">
        {
          grid.reverse().map(({ isAlive, x, y }) => {
            return (
              <div className="item">{isAlive ? '*' : null}</div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
