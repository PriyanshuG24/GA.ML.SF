import React from 'react';

const SudokuGrid = ({ solution, originalGrid }) => {
    // console.log(solution,originalGrid)
  if (!solution) return null;
  
  const size = solution.length;
  
  const getBorderStyle = (row, col, size) => {
    let borderClass = '';
    // For 9x9 grid, add borders for 3x3 subgrids
    if (size === 9) {
      if (col % 3 === 2 && col !== size - 1) {
        borderClass += ' border-r-2 border-gray-400';
      }
      if (row % 3 === 2 && row !== size - 1) {
        borderClass += ' border-b-2 border-gray-400';
      }
    }
    // For 16x16 grid, adjust the subgrid size to 4x4
    if (size === 16) {
      if (col % 4 === 3 && col !== size - 1) {
        borderClass += ' border-r-2 border-gray-400';
      }
      if (row % 4 === 3 && row !== size - 1) {
        borderClass += ' border-b-2 border-gray-400';
      }
    }
    return borderClass;
  };

  return (
    <div className="max-w-md max-h-md overflow-auto mx-auto border border-gray-400 rounded-md">
      <div
        className="grid gap-px bg-gray-300 p-1"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {solution.flat().map((value, index) => {
          const col = index % size;
          const row = Math.floor(index / size);
          
          const borderClass = getBorderStyle(row, col, size);
          
          // Simple check: if original grid has 0 at this position, it's a solved cell
          // Otherwise, it's a pre-filled cell
          const isPrefilled = originalGrid[row][col] !== 0;
          // console.log(originalGrid[row][col])
          return (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm font-medium min-w-[30px] ${borderClass} ${
                isPrefilled ? 'bg-gray-200 font-bold' : 'bg-white'
              }`}
            >
              {value || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SudokuGrid;