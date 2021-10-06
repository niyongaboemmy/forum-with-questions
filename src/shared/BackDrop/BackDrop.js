import React from "react";

const BackDrop = (props) => {
  return (
    <div
      className="BackDrop-backDrop animated fadeIn"
      style={{ background: props.bg }}
      onClick={() => props.close()}
    ></div>
  );
};

BackDrop.defaultProps = {
  bg: "#00000061",
  close: () => {},
};

export default BackDrop;