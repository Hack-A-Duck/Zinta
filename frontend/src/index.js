import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'remixicon/fonts/remixicon.css';
import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/quill/dist/quill.min.js";

ReactDOM.render(
	<div>
		<App />
	</div>,
	document.getElementById("root")
);
