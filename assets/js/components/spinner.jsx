import React from "react";
import spinner from "../../static/spinner.svg";

function Spinner() {
  return(
		<img src={spinner} className="centered-spinner" alt="Spinner" />
	);
}

export default Spinner;
