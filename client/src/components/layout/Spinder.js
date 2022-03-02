import React from "react";
import spinder from "./spinner.gif";
function Spinder() {
  return (
    <React.Fragment>
      <img
        src={spinder}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt=""
      />
    </React.Fragment>
  );
}

export default Spinder;
