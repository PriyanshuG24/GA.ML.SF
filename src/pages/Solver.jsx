import React, { useState, useEffect } from 'react';
import SudokuGrid from '../components/SudokuGrid';

const Solver = () => {
  const [image, setImage] = useState(null);
  const [originalGrid, setOriginalGrid] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sudokuType, setSudokuType] = useState('9x9');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleTypeChange = (e) => {
    setSudokuType(e.target.value);
    setSolution(null);
    setOriginalGrid(null);
  };

  const handleSubmit = async () => {
    if (!image) return alert('Please upload an image');

    const formData = new FormData();
    formData.append('image', image);

    setLoading(true);
    setSolution(null);
    setOriginalGrid(null);

    const route = sudokuType === '16x16' ? 'solve/16x16' : 'solve/9x9';

    try {
      const response = await fetch(`http://localhost:8000/${route}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      // console.log(data)
      // Store both the original grid and the solution based on the actual response structure
      if (data.unsolved_grid) setOriginalGrid(data.unsolved_grid);
      if (data.solved_grid) setSolution(data.solved_grid);
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => previewUrl && URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="w-auto mx-auto bg-white rounded-lg shadow-lg p-6">
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Sudoku Puzzle</h2>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="puzzle-image">
              Select Image
            </label>
            <input
              type="file"
              id="puzzle-image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="sudoku-type">
              Sudoku Type
            </label>
            <select
              id="sudoku-type"
              value={sudokuType}
              onChange={handleTypeChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="9x9">9x9 (Standard)</option>
              <option value="16x16">16x16 (Large)</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!image || loading}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? 'Solving...' : 'Solve Puzzle'}
          </button>
        </div>
      </section>

      <section className="mb-8 flex space-x-4">
        {/* Left side: Image preview */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <h2 className="text-xl font-semibold mb-4">Image Preview</h2>
          <div className="border border-gray-300 rounded-md p-4 flex justify-center h-full">
            {previewUrl ? (
              <img src={previewUrl} alt="Sudoku Puzzle" className="max-w-full h-auto rounded-md" />
            ) : (
              <p className="text-gray-500">No image uploaded</p>
            )}
          </div>
        </div>

        {/* Right side: Solution */}
        <div className="flex-1 flex flex-col justify-between p-4">
          <h2 className="text-xl font-semibold mb-4">Solution</h2>
          <div className="border border-gray-300 rounded-md p-4 flex justify-center items-center h-full">
            {loading ? (
              <div className="loader">Loading...</div>
            ) : solution ? (
              <SudokuGrid solution={solution} originalGrid={originalGrid} />
            ) : (
              <p className="text-gray-500">Solution will appear here</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solver;