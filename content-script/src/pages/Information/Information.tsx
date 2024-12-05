import React, { useCallback, useState } from "react";
import { WarningIcon } from "../../assets";
import ImageViewer from "react-simple-image-viewer";
import "../../style/pages/information.scss";

const Information = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "https://i.ibb.co/WBvBsMD/image.png",
    "https://i.ibb.co/nPkgnHg/image.png",
  ];

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="informationPage">
      <div className="informationPage__head">
        <span className="informationPage__head__icon">
          <WarningIcon />
        </span>
        <h1>Please, pay attention!</h1>
      </div>
      <div className="informationPage__content">
        <p>
          The extension is designed to work exclusively on LinkedIn pages,
          specifically on{" "}
          <span>
            Search Results (https://www.linkedin.com/search/results/people/){" "}
          </span>{" "}
          and <span>Profile Pages (https://www.linkedin.com/in/someone)</span>.
          Please click on the images for further clarification.
        </p>
        <div className="informationPage__images">
          {images.map((image, index) => {
            return (
              <img
                onClick={() => openImageViewer(index)}
                src={image}
                key={index}
              />
            );
          })}
        </div>
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        )}
      </div>
    </div>
  );
};

export default Information;
