import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // State for carousel navigation
  const [currentRow, setCurrentRow] = useState(1);
  const [currentCol, setCurrentCol] = useState(1);

  // State for the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // 2D array of placeholder image URLs from Picsum
  const imageGrid = [
    [
      'https://picsum.photos/seed/picsum1/800/600',
      'https://picsum.photos/seed/picsum2/800/600',
      'https://picsum.photos/seed/picsum3/800/600',
    ],
    [
      'https://picsum.photos/seed/picsum4/800/600',
      'https://picsum.photos/seed/picsum5/800/600',
      'https://picsum.photos/seed/picsum6/800/600',
    ],
    [
      'https://picsum.photos/seed/picsum7/800/600',
      'https://picsum.photos/seed/picsum8/800/600',
      'https://picsum.photos/seed/picsum9/800/600',
    ],
  ];

  // Navigation functions
  const moveUp = () =>
    setCurrentRow((prev) => Math.max(prev - 1, 0));
  const moveDown = () =>
    setCurrentRow((prev) => Math.min(prev + 1, imageGrid.length - 1));
  const moveLeft = () =>
    setCurrentCol((prev) => Math.max(prev - 1, 0));
  const moveRight = () =>
    setCurrentCol((prev) => Math.min(prev + 1, imageGrid[0].length - 1));

  // Handle keyboard navigation and actions
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          moveUp();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveDown();
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveRight();
          break;
        case 'Enter':
          openImageModal();
          break;
        case 'Escape':
          closeImageModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, currentCol]);

  // Preload images for smoother transitions
  useEffect(() => {
    imageGrid.flat().forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Function to open image modal
  const openImageModal = () => {
    const imageSrc = imageGrid[currentRow][currentCol];
    setSelectedImage(imageSrc);
    setIsImageModalOpen(true);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="name">William Timney</div>
        <button
          className="modal-button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Open information modal"
        >
          Info
        </button>
      </header>

      {/* Info Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsModalOpen(false)}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="modal-title">About</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vel sapien ligula. Nullam venenatis, nunc in faucibus
              dignissim, nisl nisl aliquet nunc, et pretium nunc sapien id
              dui.
            </p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="image-modal-overlay"
          onClick={closeImageModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="image-modal"
        >
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full Size"
              className="full-image"
            />
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="carousel-container">
        <div className="carousel-grid">
          {imageGrid.map((row, rowIndex) =>
            row.map((image, colIndex) => (
              <img
                key={`${rowIndex}-${colIndex}`}
                src={image}
                alt={`Image ${rowIndex * imageGrid[0].length + colIndex + 1}`}
                className={
                  rowIndex === currentRow && colIndex === currentCol
                    ? 'carousel-image selected'
                    : 'carousel-image'
                }
                style={{
                  transform:
                    rowIndex === currentRow && colIndex === currentCol
                      ? 'scale(1.2)'
                      : 'scale(1)',
                }}
                onClick={() => {
                  setCurrentRow(rowIndex);
                  setCurrentCol(colIndex);
                  openImageModal();
                }}
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentRow(rowIndex);
                    setCurrentCol(colIndex);
                    openImageModal();
                  }
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button onClick={moveUp} aria-label="Move Up">
          ↑
        </button>
        <button onClick={moveDown} aria-label="Move Down">
          ↓
        </button>
        <button onClick={moveLeft} aria-label="Move Left">
          ←
        </button>
        <button onClick={moveRight} aria-label="Move Right">
          →
        </button>
        <button onClick={openImageModal} aria-label="Enter Key">
          ⏎
        </button>
        <button onClick={closeImageModal} aria-label="Escape Key">
          ⎋
        </button>
      </div>
    </div>
  );
}

export default App;
