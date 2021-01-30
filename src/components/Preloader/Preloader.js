import React from "react";
import spinner from "./Spinner-0.8s-231px.svg";
import "./Preloader.css";

const Preloader = props => {
  // debugger;
  return (
    <div className={props.className}>
      <div className="preloader">
        <img src={spinner} alt="preloader"></img>
      </div>
    </div>
  );
};
export default Preloader;
