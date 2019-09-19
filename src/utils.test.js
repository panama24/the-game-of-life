import {
  cell,
  getCount,
  getNeighbors,
  initializeGrid,
  shouldLive,
  trueOrFalse,
} from './utils';

/* RULES:
 * Alive cell - if fewer than 2 alive neighbors, dies due to underpopulation)
 * Alive cell - 2 or 3 neighbors, lives due to perfect situation
 * Alive cell - more than 3 alive neighbors, dies due to overpopulation
 * Dead cell - exactly 3 alive neighbors, becomes alive due to reproduction
 */

describe('cell', () => {
  it('should have properties x, y and isAlive', () => {
    const { x, y, isAlive } = cell(0, 0, true);
    expect(x).toEqual(0);
    expect(y).toEqual(0);
    expect(isAlive).toEqual(true);
  });
});

describe('initializeGrid', () => {
  it('should generate grid of specified dimensions', () => {
    const cols = 5;
    const rows = 5;
    const grid = initializeGrid(cols, rows);
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
      const grid = initializeGrid(5, 5);
      const res = getNeighbors(grid, cell);
      expect(res.length).toEqual(8);
    });
  });

  describe('when cell is a corner cell', () => {
    it('should return 3 neighboring cells', () => {
      const cell = {x:0, y:0, isAlive: true};
      const grid = initializeGrid(5, 5);
      const res = getNeighbors(grid, cell);
      expect(res.length).toEqual(3);
    });
  });

  describe('when cell is on the perimeter, but not a corner', () => {
    it('should return 5 neighboring cells', () => {
      const cell = {x:1, y:0, isAlive: true};
      const grid = initializeGrid(5, 5);
      const res = getNeighbors(grid, cell);
      expect(res.length).toEqual(5);
    });
  });
});

