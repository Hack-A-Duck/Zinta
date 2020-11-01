import React from "react";

function Login({
	email,
	password,
	setEmail,
	setPassword,
	handleLogin,
	emailError,
	passwordError,
}) {
	return (
		<div style={{display: "flex", flexDirection: "column"}}>
			<label>Email</label>
			<input
				type="email"
				autoFocus
				required
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<p className="error__message">{emailError}</p>
			<label htmlFor="">Password</label>
			<input
				type="password"
				required
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<p className="error__message">{passwordError}</p>
		</div>
	);
}

export default Login;
