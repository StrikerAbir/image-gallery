
import React, { useState, useEffect, useRef } from "react";
import images from "../../../Utils/images";

const MainComp = () => {
    const imgCollection =images
     const [imageSet, setImageSet] = useState(imgCollection);

     const dragImg = useRef (0) ;
     const draggedOverImg = useRef (0) ;


     function handleSort() {
       // Create a copy of the imageSet array
       const imageSetClone = [...imageSet];

       // Get the img being dragged
       const draggedimg = imageSetClone[dragImg.current];

       // Remove the img from the original position
       imageSetClone.splice(dragImg.current, 1);

       // Insert the img at the new position
       imageSetClone.splice(draggedOverImg.current, 0, draggedimg);

       // Update the index of each img in the sorted array
       imageSetClone.forEach((img, index) => {
         img.id = index + 1;
       });

       // Set the updated array
       setImageSet(imageSetClone);
     }

    return (
      <main className="flex min-h-screen flex-col items-center space-y-4">
        <h1 className="text-xl font-bold mt-4">List</h1>
        {imageSet.map((img, index) => (
          <div
          key={index}
            className="relative flex space-x-3 border rounded p-2 bg-gray-100"
            draggable
            onDragStart={() => (dragImg.current = index)}
            onDragEnter={() => (draggedOverImg.current = index)}
            onDragEnd={handleSort}
            onDragOver={(e) => e.preventDefault()}
          >
            <p>{img.src}</p>
          </div>
        ))}
      </main>
    );
};

export default MainComp;