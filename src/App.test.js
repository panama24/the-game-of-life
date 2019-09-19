import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App, { cell, getCount, getNeighbors, makeGrid, shouldLive, trueOrFalse } from './App';

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

describe('cell', () => {
  it('should have properties x, y and isAlive', () => {
    const { x, y, isAlive } = cell(0, 0, true);
    expect(x).toEqual(0);
    expect(y).toEqual(0);
    expect(isAlive).toEqual(true);
  });
});

describe('makeGrid', () => {
  it('should generate grid of specified dimensions', () => {
    const cols = 5;
    const rows = 5;
    const grid = makeGrid(cols, rows);
    /*
     * [
     * {x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}, {x:4, y:4},
     * {x:0, y:3}, {x:1, y:3}, {x:2, y:3}, {x:3, y:3}, {x:4, y:3},
     * {x:0, y:2}, {x:1, y:2}, {x:2, y:2}, {x:3, y:2}, {x:4, y:2},
     * {x:0, y:1}, {x:1, y:1}, {x:2, y:1}, {x:3, y:1}, {x:4, y:1},
     * {x:0, y:0}, {x:1, y:0}, {x:2, y:0}, {x:3, y:0}, {x:4, y:0},
     * ]
     */
    expect(grid.length).toEqual(cols * rows);
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

describe('getCount', () => {
  it('should count instances of true', () => {
    const array = [
      {x:0, y:0, isAlive: true},
      {x:1, y:0, isAlive: true},
      {x:2, y:0, isAlive: false},
      {x:3, y:0, isAlive: false},
      {x:4, y:0, isAlive: true},
    ];
    const expectation = getCount(array);
    expect(expectation).toBe(3);
  });
});

describe('shouldLive', () => {
  describe('when cell is alive', () => {
    it('should return true when there are 2-3 living neighbors', () => {
      const neighbors = [
        {x:0, y:0, isAlive: true},
        {x:1, y:0, isAlive: true},
        {x:2, y:0, isAlive: false},
        {x:3, y:0, isAlive: false},
        {x:4, y:0, isAlive: true},
      ];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(true);
    });

    it('should return false when there are fewer than 2 living neighbors', () => {
      const neighbors = [
        {x:0, y:0, isAlive: false},
        {x:1, y:0, isAlive: false},
        {x:2, y:0, isAlive: false},
        {x:3, y:0, isAlive: false},
        {x:4, y:0, isAlive: true},
      ];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(false);
    });

    it('should return false when there are more than 3 living neighbors', () => {
      const neighbors = [
        {x:0, y:0, isAlive: true},
        {x:1, y:0, isAlive: true},
        {x:2, y:0, isAlive: true},
        {x:3, y:0, isAlive: false},
        {x:4, y:0, isAlive: true},
      ];
      const res = shouldLive(true, neighbors);
      expect(res).toBe(false);
    });
  });

  describe('when cell is dead', () => {
    it('should return true when there exactly 3 living neighbors', () => {
      const neighbors = [
        {x:0, y:0, isAlive: false},
        {x:1, y:0, isAlive: true},
        {x:2, y:0, isAlive: true},
        {x:3, y:0, isAlive: false},
        {x:4, y:0, isAlive: true},
      ];
      const res = shouldLive(false, neighbors);
      expect(res).toBe(true);
    });
  });
});

describe('getNeighbors', () => {
  describe('when cell is a middle cell', () => {
    it('should return 8 neighboring cells', () => {
      const cell = {x:2, y:2, isAlive: true};
      const grid = makeGrid(5, 5);
      const res = getNeighbors(grid, cell);

      expect(res.length).toEqual(8);
    });
  });

  describe('when cell is a corner cell', () => {
    it('should return 3 neighboring cells', () => {
      const cell = {x:0, y:0, isAlive: true};
      const grid = makeGrid(5, 5);
      const res = getNeighbors(grid, cell);

      expect(res.length).toEqual(3);
    });
  });

  describe('when cell is on the perimeter, but not a corner', () => {
    it('should return 5 neighboring cells', () => {
      const cell = {x:1, y:0, isAlive: true};
      const grid = makeGrid(5, 5);
      const res = getNeighbors(grid, cell);

      expect(res.length).toEqual(5);
    });
  });
});
