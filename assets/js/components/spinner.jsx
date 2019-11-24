import React from "react";
import spinner from "../../static/spinner.gif";

function Spinner() {
  return(
		<img src={spinner} className="centered-spinner" alt="Spinner" />
	);
}

export default Spinner;
