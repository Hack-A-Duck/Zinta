import React from "react";
import { Button } from "reactstrap";

function Admin({ handleLogOut }) {
	return (
		<div className="admin">
			<Button onClick={handleLogOut}>Logout</Button>
		</div>
	);
}

export default Admin;
