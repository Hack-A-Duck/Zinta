import React, { useState, useEffect } from "react";
import "../components/FooterDown.css";
import fire from "../components/firebase";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Login from "./Login";
import Admin from "../Screens/Admin";
import { Link, Redirect } from "react-router-dom";

function FooterDown() {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);
	const [user, setUser] = useState({});
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const clearInputs = () => {
		setEmail("");
		setPassword("");
	};

	const clearErrors = () => {
		setEmailError("");
		setPasswordError("");
	};

	const handleLogin = () => {
		//   console.log("handle Login", localStorage)
		clearErrors();
		fire
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch((err) => {
				//   console.log(err);
				switch (err.code) {
					case "auth/invalid-email":
					case "auth/user-disabled":
					case "auth/user-not-found":
						setEmailError(err.message);
						break;
					case "auth/wrong-password":
						setPasswordError(err.message);
						break;
				}
			});
	};

	const handleLogOut = () => {
		fire.auth().signOut();
	};

	const authListener = () => {
		fire.auth().onAuthStateChanged((currentUser) => {
			if (currentUser) {
				clearInputs();
				localStorage.setItem("user-session", currentUser);
				window.location.href = "/admin";
			} else {
			}
		});
	};

	useEffect(() => {
		authListener();
	}, []);

	return (
		<>
			<MDBFooter color="indigo" className="font-small pt-0 entire__footer">
				<MDBContainer>
					<MDBRow className="pt-5 mb-3 text-center d-flex justify-content-center footer__headers">
						<MDBCol md="2" className="b-3">
							<h6 className="title font-weight-bold">
								<a href="#!">Help</a>
							</h6>
						</MDBCol>
						<MDBCol md="2" className="b-3">
							<h6 className="title font-weight-bold">
								<Button className="modal__button" onClick={toggle}>
									ZINTA
								</Button>
							</h6>
						</MDBCol>
						<MDBCol md="2" className="b-3">
							<h6 className="title font-weight-bold">
								<a href="#!">Contact</a>
							</h6>
						</MDBCol>
					</MDBRow>
					<hr
						className="rgba-white-light"
						style={{ border: "1px solid rgb(36, 36, 36)" }}
					/>
					<MDBRow className="d-flex text-center justify-content-center mb-md-0 mb-4">
						<MDBCol md="8" sm="12" className="mt-5">
							<p
								style={{
									lineHeight: "1.7rem",
									color: "white",
									marginTop: "-50px",
								}}
							>
								This is ZINTA. A highly customizable blogging website for all
								you scribble aficionados out there. Click, Pull, Drag and Drop,
								Resize, Add images, do whatever you want to your hearts' content
								until it looks like your dream blog. Showcase your presentation
								skills and give wings to your writing proficiency! Good Luck!
							</p>
						</MDBCol>
					</MDBRow>
					<hr className="clearfix d-md-none rgba-white-light" />
				</MDBContainer>
				<div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright: ZINTA ~ MVK
					</MDBContainer>
				</div>
			</MDBFooter>
			{/* MODAL GOES HERE */}
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					LOGIN
				</ModalHeader>
				<ModalBody>
					{user ? (
						<>
							{/* <Admin handleLogOut={handleLogOut} /> */}
							{/* <Redirect to={`/admin/`} /> */}
						</>
					) : (
						<></>
					)}

					<Login
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleLogin={handleLogin}
						emailError={emailError}
						setEmailError={setEmailError}
						passwordError={passwordError}
						setPasswordError={setPasswordError}
					/>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={handleLogin}>
						Login
					</Button>
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
}

export default FooterDown;
