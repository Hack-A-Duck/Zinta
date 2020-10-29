import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ('../node_modules/react-grid-layout/css/styles.css');
import ('../node_modules/react-resizable/css/styles.css');
import ("bootstrap/dist/css/bootstrap.css");

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

/**
 * ! react-router
 * ! /home, /suggest -> end user
 * ! /display, /blogs, /suggestions -> admin
 * ! npm -> react-session
 * ! npm i re-resizable
 * ! npm i react-router
 * ! npm i reactstrap react react-dom
 * ! npm i bootstrap
 */
