import React from "react";

const GenericText = props => {
  return (
    <span
      style={{
        fontSize: (props.size ? props.size : 12) + "px",
        fontWeight: props.bold ? "900" : "400",
        marginRight: (props.indent ? 5 : 0) + "px",
        marginBottom: (props.gutters ? props.gutters : 0) + "px"
      }}
    >
      {props.children}
    </span>
  );
};

export default GenericText;
