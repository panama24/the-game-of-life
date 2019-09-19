import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import App, { Cell, Grid } from './App';
import { makeGrid } from './utils';

afterEach(cleanup);

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

  it('should render a grid', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId(/grid/i)).toBeTruthy();
  });
});

describe('Grid', () => {
  it('should render correctly', () => {
    const grid = makeGrid(5, 5);
    const { getAllByTestId } = render(<Grid grid={grid} />);
    expect(getAllByTestId(/item/i)).toHaveLength(25);
  });
});

describe('Cell', () => {
  it('should render correctly', () => {
    const props = { x: 0, y: 3, isAlive: true };
    const { getByTestId } = render(<Cell {...props} />);
    expect(getByTestId(/item/i).innerHTML).toBe('*');
  });

  it('should render correctly', () => {
    const props = { x: 0, y: 3, isAlive: false };
    const { getByTestId } = render(<Cell {...props} />);
    expect(getByTestId(/item/i).innerHTML).toBe('');
  });
});
