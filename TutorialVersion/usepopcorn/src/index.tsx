import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./components/StarRating/StarRating";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

function Test() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div className=''>
      <StarRating color='blue' onSetRating={setMovieRating} />
      <p>This movies was rated {movieRating} stars</p>
    </div>
  );
}
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating />
    <StarRating
      color={"red"}
      messages={["terrible", "bad", "okay", "good", "awesome"]}
      defaultRating={4}
    />
    <Test />
  </React.StrictMode>
);
