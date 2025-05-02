import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="text-center">
    <h2 className="text-3xl font-semibold mb-4">Welcome to Sudoku Solver</h2>
    <p className="text-lg mb-6">Upload a Sudoku puzzle image and get the solution instantly!</p>
    <Link to="/solver" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
      Start Solving
    </Link>
  </div>
);

export default Home;
