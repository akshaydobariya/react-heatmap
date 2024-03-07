import React, { useRef, useEffect, useState } from "react";
import { fabric } from "fabric";
import demoImage from "./MicrosoftTeams-image (1).png"; // Import the original image file
import newImageSrc from "./MicrosoftTeams-image.png"; // Import the new image file

const App = () => {
  const canvasRef = useRef(null);
  const canvas = useRef(null); // Define canvas ref
  const objectsOnCanvas = useRef([]); // Define objects array ref
  const [shapeDimensions, setShapeDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [imageAdded, setImageAdded] = useState(false); // State to track if the image has been added

  useEffect(() => {
    canvas.current = new fabric.Canvas(canvasRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Load the image onto the canvas first
    fabric.Image.fromURL(demoImage, function (img) {
      // Create a rectangle
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 100,
        height: 100,
        borderColor: "black",
        cornerColor: "black",
        cornerSize: 6,
        transparentCorners: false,
        lockRotation: true, // Lock rotation
        lockScalingFlip: true, // Lock scaling flip
      });
      canvas.current.add(rect);
      objectsOnCanvas.current.push(rect); // Add object to the array

      setShapeDimensions({ width: rect.width, height: rect.height });

      rect.on("modified", function () {
        // Query the latest dimensions of the shape when it's modified
        const { width, height } = rect.getBoundingRect();
        setShapeDimensions({ width, height });
      });

      canvas.current.renderAll(); // Ensure canvas is rendered after all elements are added
    });

    return () => {
      canvas.current.dispose();
    };
  }, []);

  useEffect(() => {
    console.log("Updated shape dimensions:", shapeDimensions);
  }, [shapeDimensions]); // Log shapeDimensions whenever it changes

  const handleApply = () => {
    if (!imageAdded) {
      addImage(); // Add image only if it's not already added
      setImageAdded(true); // Update state to indicate image is added
      canvas.current.remove(objectsOnCanvas.current[0]);
    }
  };

  const addImage = () => {
    const { width: shapeWidth, height: shapeHeight } = shapeDimensions;
    const rect = objectsOnCanvas.current[0];

    new fabric.Image.fromURL(newImageSrc, function (img) {
      img.set({
        left: rect.left,
        top: rect.top,
        scaleX: shapeWidth / img.width, // Scale image width to match shape's width
        scaleY: shapeHeight / img.height, // Scale image height to match shape's height
        selectable: false,
        evented: false,
      });

      // You can adjust the image width and height as needed
      // For example, to double the image's size, you can multiply scaleX and scaleY by 2
      // img.scaleX *= 2;
      // img.scaleY *= 2;

      canvas.current.add(img);
      canvas.current.renderAll();

      // Remove the shape (rectangle) from the canvas after the image is added
      canvas.current.remove(rect);
    });
  };

  return (
    <>
      <img
        src={demoImage}
        alt="demo"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }} // Set the zIndex to ensure the original image is below the new image
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}
      ></canvas>
      <button
        onClick={handleApply}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3, // Ensure the button is on top of other elements
        }}
      >
        Apply
      </button>
    </>
  );
};

export default App;
