import React, { useState } from "react";
import Star from "./Star";

interface StartRatingProps {
  maxRating?: number;
}

export default function StartRating({ maxRating = 5 }: StartRatingProps) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {/* Create an array with 5 elements and iterate over it */}
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => setRating(i + 1)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(rating)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
}

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};
