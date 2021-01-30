import React from "react";
import "./ErrorMessage.css"

const ErrorMessage = props => {
  return (
    <div className="error">
      <div>Ошибка: {props.message}</div>
    </div>
  );
};
export default ErrorMessage;
