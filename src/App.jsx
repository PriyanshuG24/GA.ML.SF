import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Solver from './pages/Solver';

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Sudoku Solver</h1>
            <nav className="mt-2">
              <Link to="/" className="text-white hover:underline mr-4">Home</Link>
              <Link to="/solver" className="text-white hover:underline">Solver</Link>
            </nav>
          </div>
        </header>

        <main className="container mx-auto p-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solver" element={<Solver />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>© 2025 Sudoku Solver. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
