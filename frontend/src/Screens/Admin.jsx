import React, { useEffect } from "react";
import { Button } from "reactstrap";
import fire from "../components/firebase";

function Admin() {

	useEffect(() => {
		const user = localStorage.getItem("user-session");
		if(!user) {
			window.location.href = "/";
		}
	});
	

	const handleLogout = async () => {
		localStorage.removeItem('user-session');
		await fire.auth().signOut();
		window.location.href = "/";
	}

	return (
		<div className="admin">
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
}

export default Admin;
