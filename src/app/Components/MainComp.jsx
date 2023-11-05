import React, { useState, useEffect, useRef } from "react";
import images from "../../../Utils/images";
import Image from "next/image";

const MainComp = () => {
  const imgCollection = images;
  const [imageSet, setImageSet] = useState(imgCollection);
  const [hover, setHover] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const dragImg = useRef(0);
  const draggedOverImg = useRef(0);

  function handleSort() {
    const imageSetClone = [...imageSet];
    const draggedImg = imageSetClone[dragImg.current];
    imageSetClone.splice(dragImg.current, 1);
    imageSetClone.splice(draggedOverImg.current, 0, draggedImg);

    // For updating the index
    imageSetClone.forEach((img, index) => {
      img.id = index + 1;
    });

    setImageSet(imageSetClone);
  }

  const handleImageSelect = (index) => {
    if (selectedImages.includes(index)) {
      // Deselect the image
      setSelectedImages(selectedImages.filter((i) => i !== index));
    } else {
      // Select the image
      setSelectedImages([...selectedImages, index]);
    }
  };

  const handleRemoveSelectedImages = () => {
    const imageSetClone = [...imageSet];

    selectedImages
      .sort((a, b) => b - a) // Sort in reverse order to avoid index shifting
      .forEach((index) => {
        imageSetClone.splice(index, 1);
      });
    setSelectedImages([]);
    // Update the index for the remaining images
    imageSetClone.forEach((img, index) => {
      img.id = index + 1;
    });
    setImageSet(imageSetClone);
  };

  return (
    <>
      <div>
        <div className="my-3">
          {selectedImages.length === 0 ? (
            <h1 className="lg:text-xl text-sm font-bold">Gallery</h1>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="lg:h-4 lg:w-4"
                  checked={selectedImages.length && true}
                />
                <span className="ml-2 font-semibold lg:text-base text-sm">
                  {selectedImages.length} File Selected
                </span>
              </div>
              <div
                onClick={handleRemoveSelectedImages}
                disabled={selectedImages.length === 0}
                className="text-red-500 rounded cursor-pointer  font-semibold lg:text-base text-sm"
              >
                {selectedImages.length === 1 ? "Delete file" : "Delete Files"}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 lg:gap-6 gap-2 w-full">
        {imageSet.map((img, index) => (
          <div
            key={index}
            className={`${
              index === 0 && "col-span-2 row-span-2 "
            }  w-full h-full`}
          >
            <div
              className="relative "
              draggable
              onDragStart={() => (dragImg.current = index)}
              onDragEnter={() => (draggedOverImg.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(null)}
            >
              {hover === index || selectedImages.includes(index) ? (
                <div
                  className={`h-full w-full absolute ${
                    selectedImages.includes(index) &&
                    "bg-[rgba(188,182,182,0.5)]"
                  } ${
                    hover === index && "bg-[rgba(0,0,0,0.5)]"
                  }  transition duration-300 ease-in-out rounded-lg cursor-pointer z-10`}
                >
                  <div className="lg:pl-4 lg:pt-3 pl-1 ">
                    <input
                      type="checkbox"
                      className="lg:h-4 lg:w-4"
                      checked={selectedImages.includes(index)}
                      onChange={() => handleImageSelect(index)}
                    />
                  </div>
                </div>
              ) : null}

              <img src={img.src} alt="img" className={`rounded-lg border-2`} />
            </div>
          </div>
        ))}
        <div className="flex items-center justify-center border-dashed border-2 rounded lg:text-base text-xs text-center">
          Add Images
        </div>
      </div>
    </>
  );
};

export default MainComp;
