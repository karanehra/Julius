import React from "react";

const GenericText = props => {
  return (
    <span
      style={{
        fontSize: (props.size ? props.size : 12) + "px",
        fontWeight: props.bold ? "900" : "400"
      }}
    >
      {props.children}
    </span>
  );
};

export default GenericText;