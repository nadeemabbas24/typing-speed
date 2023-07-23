import React from "react";

const ToolTip = ({
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  show,
}) => {
  return (
    <div
      className="tooltip"
      style={{ zIndex: "6", width: "400px", height: "200px", visibility: show }}
    >
      <h3>Correct Characters - {correctChars}</h3>
      <h3>Incorrect Characters - {incorrectChars}</h3>
      <h3>Missed Characters - {missedChars}</h3>
      <h3>Extra Characters - {extraChars}</h3>
    </div>
  );
};

export default ToolTip;
