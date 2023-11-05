import React, { useState, useEffect, useRef } from "react";
import images from "../../../Utils/images";
import Image from "next/image";

const MainComp = () => {
  const imgCollection = images;
  const [imageSet, setImageSet] = useState(imgCollection);
  const [hover,setHover]=useState(null)

  const dragImg = useRef(0);
  const draggedOverImg = useRef(0);

  function handleSort() {
    const imageSetClone = [...imageSet];

    const draggedImg = imageSetClone[dragImg.current];

    imageSetClone.splice(dragImg.current, 1);

    imageSetClone.splice(draggedOverImg.current, 0, draggedImg);

    // for updating the index
    imageSetClone.forEach((img, index) => {
      img.id = index + 1;
    });

    setImageSet(imageSetClone);
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-6 w-full">
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
              {hover === index ? (
                <div className="h-full w-full absolute hover:bg-[rgba(0,0,0,0.5)] transition duration-300 ease-in-out rounded-lg cursor-pointer z-10">
                  <div className="pl-2 pt-1">
                    <input type="checkbox" className="h-3 w-3"/>
                  </div>
                </div>
              ) : null}

              <img src={img.src} alt="img" className={`rounded-lg border-2 `} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainComp;
