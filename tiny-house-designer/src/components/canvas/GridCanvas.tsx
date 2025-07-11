import React, { useState, MouseEvent } from 'react';

interface GridCanvasProps {
  width?: number;
  height?: number;
  gridSize?: number;
}

const GridCanvas: React.FC<GridCanvasProps> = ({
  width = 800,
  height = 600,
  gridSize = 20,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [itemPosition, setItemPosition] = useState({ x: gridSize * 2, y: gridSize * 2 }); // Initial position snapped to grid

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Check if the click is on the draggable item
    const target = e.target as HTMLElement;
    if (target.id === 'draggable-item') {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const canvasRect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - canvasRect.left;
    let y = e.clientY - canvasRect.top;

    // Snap to grid
    x = Math.round(x / gridSize) * gridSize;
    y = Math.round(y / gridSize) * gridSize;

    // Constrain within canvas boundaries
    x = Math.max(0, Math.min(x, width - gridSize)); // Assuming item is gridSize x gridSize
    y = Math.max(0, Math.min(y, height - gridSize));


    setItemPosition({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    // Optional: Stop dragging if mouse leaves canvas
    // setIsDragging(false);
  };

  return (
    <div
      className="bg-gray-100 relative border border-gray-300 cursor-grab"
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave} // Stop dragging if mouse leaves canvas
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none">
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="rgba(200, 200, 200, 0.5)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Draggable Item */}
      <div
        id="draggable-item"
        className={`absolute bg-blue-500 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} border border-blue-700`}
        style={{
          width: `${gridSize}px`,
          height: `${gridSize}px`,
          left: `${itemPosition.x}px`,
          top: `${itemPosition.y}px`,
          touchAction: 'none', // Recommended for draggable elements
        }}
      >
        {/* You can put content inside the item if needed */}
      </div>
    </div>
  );
};

export default GridCanvas;
