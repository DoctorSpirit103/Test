import React, { useState } from 'react';
import './App.css';
import GridCanvas from './components/canvas/GridCanvas';

function App() {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(600);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold my-8 text-gray-700">Tiny House Designer</h1>

      <div className="mb-6 p-4 border border-gray-300 rounded-lg shadow bg-white">
        <h2 className="text-xl font-semibold mb-3 text-gray-600">Canvas Dimensions</h2>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="canvasWidth" className="block text-sm font-medium text-gray-700 mb-1">
              Width (px):
            </label>
            <input
              type="number"
              id="canvasWidth"
              value={canvasWidth}
              onChange={(e) => setCanvasWidth(parseInt(e.target.value, 10) || 0)}
              className="w-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="canvasHeight" className="block text-sm font-medium text-gray-700 mb-1">
              Height (px):
            </label>
            <input
              type="number"
              id="canvasHeight"
              value={canvasHeight}
              onChange={(e) => setCanvasHeight(parseInt(e.target.value, 10) || 0)}
              className="w-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <GridCanvas width={canvasWidth} height={canvasHeight} />
    </div>
  );
}

export default App;
