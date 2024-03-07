import React from "react";
import "./App.css";

const dummy = {
  heatmap: [
    {
      level: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
    },
  ],
};

const App = () => {
  const getColor = (value, max) => {
    const ratio = value / max;
    if (ratio < 0.5) {
      const blueRatio = ratio * 2;
      return `rgba(0, 0, 255, ${blueRatio})`;
    } else {
      const redRatio = (ratio - 0.5) * 2;
      return `rgba(255, 0, 0, ${redRatio})`;
    }
  };

  return (
    <div className="heatmap-container">
      {dummy.heatmap?.[0].level.map((item, i) => (
        <div
          key={i}
          className="heatmap-rectangle"
          style={{
            backgroundColor: getColor(item, 1000),
          }}
        />
      ))}
    </div>
  );
};

export default App;
