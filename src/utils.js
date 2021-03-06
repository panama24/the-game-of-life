const trueOrFalse = () => !!Math.floor(Math.random() * 2);

const getCount = (array) => array.reduce((acc, { isAlive }) => {
  if (isAlive) {
    acc += 1
  }
  return acc;
}, 0);

const cell = (x, y, isAlive) => ({ x, y, isAlive });

const initializeGrid = (cols, rows) => {
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

const getNeighbors = (grid, cell) => {
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

const getShouldLive = (cell, neighbors) => {
  const count = getCount(neighbors);
  return cell.isAlive
    ? (count === 2 || count === 3)
    : count === 3;
};

const redrawGrid = (prev) => {
  return prev.map(prevCell => {
    const neighbors = getNeighbors(prev, prevCell);
    const isAlive = getShouldLive(prevCell, neighbors);
    prevCell.isAlive = isAlive;
    return prevCell;
  });
};

export {
  cell,
  getCount,
  getNeighbors,
  getShouldLive,
  initializeGrid,
  redrawGrid,
  trueOrFalse,
};
