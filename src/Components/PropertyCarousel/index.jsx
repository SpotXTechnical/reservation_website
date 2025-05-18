import React, { useState, useEffect, useCallback } from "react";

const PropertyCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Handle slide transition
  const goToNext = useCallback(() => {
    if (!isTransitioning && images?.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, images]);

  const goToPrevious = useCallback(() => {
    if (!isTransitioning && images?.length > 0) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  }, [isTransitioning, images]);

  // Go to a specific slide
  const goToSlide = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext();
    }
    if (touchStart - touchEnd < -75) {
      goToPrevious();
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-64 tw-bg-gray-100 tw-rounded-lg">
        <p className="tw-text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="tw-w-full tw-max-w-full tw-overflow-hidden tw-relative tw-bg-black">
      {/* Main Carousel Area */}
      <div
        className="tw-relative tw-w-full tw-h-[70vh] md:tw-h-[60vh]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Current Slide */}
        <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
          {images[currentIndex]?.type === "image" ? (
            <img
              src={images[currentIndex]?.url}
              alt={`Slide ${currentIndex + 1}`}
              className="tw-max-h-full tw-max-w-full tw-object-contain tw-transition-opacity tw-duration-300"
            />
          ) : (
            <video
              src={images[currentIndex]?.url}
              controls
              className="tw-max-h-full tw-w-full tw-object-contain"
            />
          )}
        </div>

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              className="tw-absolute tw-left-4 tw-top-1/2 tw--translate-y-1/2 tw-z-10 tw-flex tw-items-center tw-justify-center tw-h-12 tw-w-12 tw-bg-black/40 tw-rounded-full tw-border tw-border-white/20 hover:tw-bg-black/60 tw-transition-colors tw-duration-300"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tw-h-6 tw-w-6 tw-text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              className="tw-absolute tw-right-4 tw-top-1/2 tw--translate-y-1/2 tw-z-10 tw-flex tw-items-center tw-justify-center tw-h-12 tw-w-12 tw-bg-black/40 tw-rounded-full tw-border tw-border-white/20 hover:tw-bg-black/60 tw-transition-colors tw-duration-300"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="tw-h-6 tw-w-6 tw-text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {/* Slide Counter */}
        <div className="tw-absolute tw-bottom-4 tw-left-1/2 tw--translate-x-1/2 tw-bg-black/60 tw-backdrop-blur-sm tw-px-4 tw-py-2 tw-rounded-full tw-text-white tw-text-sm tw-font-medium">
          <span className="tw-text-[#44bcb7]">{currentIndex + 1}</span>
          <span className="tw-mx-1">/</span>
          <span>{images.length}</span>
        </div>
      </div>

      {/* Thumbnails Navigation */}
      {images.length > 1 && (
        <div className="tw-flex tw-overflow-x-auto tw-gap-2 tw-p-2 tw-bg-black/80 tw-scrollbar-thin tw-scrollbar-thumb-gray-700 tw-scrollbar-track-gray-900">
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className={`tw-flex-shrink-0 tw-w-16 tw-h-16 md:tw-w-20 md:tw-h-20 tw-cursor-pointer tw-border-2 tw-transition-all ${
                index === currentIndex
                  ? "tw-border-[#44bcb7] tw-opacity-100"
                  : "tw-border-transparent tw-opacity-60 hover:tw-opacity-100"
              }`}
              onClick={() => goToSlide(index)}
            >
              {image.type === "image" ? (
                <img
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="tw-w-full tw-h-full tw-object-cover"
                />
              ) : (
                <div className="tw-w-full tw-h-full tw-bg-gray-800 tw-flex tw-items-center tw-justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="tw-h-6 tw-w-6 tw-text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyCarousel;
