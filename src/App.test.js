import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App, { generateGrid, Cell, shouldLive, trueOrFalse } from './App';

afterEach(cleanup);

/*
 * Alive cell - if fewer than 2 alive neighbors, dies due to underpopulation)
 * Alive cell - 2 or 3 neighbors, lives due to perfect situation
 * Alive cell - more than 3 alive neighbors, dies due to overpopulation
 * Dead cell - exactly 3 alive neighbors, becomes alive due to reproduction
 */

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('generateGrid', () => {
  it('should be a 10 x 10 grid', () => {
    const grid = generateGrid();
    const rows = grid.length;
    /* [
     * [0,0,0,0,0,0,0,0,0,0]
     * [0,0,0,0,0,0,0,0,0,0]
     * [0,0,0,0,0,0,0,0,0,0]
     * [0,0,0,0,0,0,0,0,0,0]
     * [0,0,0,0,0,0,0,0,0,0]
     * [0,0,0,0,0,0,0,0,0,0]
     * ] */;
    const columns = grid.every(r => r.length === 10);
    expect(rows).toEqual(10);
    expect(columns).toEqual(true);
  });
});

describe('Cell', () => {
  it('should die if has fewer than 2 living neighbors', () => {
    /*
    prev row = i-1, i, i+1
    same row = i-1, i, i+1
    next row = i-1, i, i+1
    */
  });

  it('should remain alive if has 2-3 living neighbors', () => {
  });

  it('should die if has more than 3 living neighbors', () => {
  });

  it('should die if has more than 3 living neighbors', () => {
  });
});

describe('trueOrFalse', () => {
  it('chooses a random boolean', () => {
    const res = [...Array(10)]
      .fill(null)
      .map(el => trueOrFalse());
    const expectation = res.every(el => el);
    expect(expectation).toBe(false);
  });
});

describe('shouldLive', () => {
  describe('when cell is alive', () => {
    it('should return true when there are 2-3 living neighbors', () => {
      const neighbors = [false, true, false, false, false, true, false, false];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(true);
    });

    it('should return false when there are fewer than 2 living neighbors', () => {
      const neighbors = [false, false, false, false, false, true, false, false];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(false);
    });

    it('should return false when there are more than 3 living neighbors', () => {
      const neighbors = [false, true, true, true, true, true, false, false];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(false);
    });
  });

  describe('when cell is dead', () => {
    it('should return true when there exactly 3 living neighbors', () => {
      const neighbors = [false, true, true, true, false, false, false, false];
      const res = shouldLive(false, neighbors);
      expect(res).toBe(true);
    });
  });
});
