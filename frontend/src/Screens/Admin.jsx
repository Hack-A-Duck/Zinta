import React, { useEffect } from "react";
import { Button } from "reactstrap";
import fire from "../components/firebase";
import NavbarAdmin from "../components/NavbarAdmin";

function Admin() {

	useEffect(() => {
		const user = localStorage.getItem("user-session");
		if(!user) {
			window.location.href = "/";
		}
	});

	return (
		<div className="admin">
			<NavbarAdmin />
			<h1>Admin screen</h1>
		</div>
	);
}

export default Admin;
