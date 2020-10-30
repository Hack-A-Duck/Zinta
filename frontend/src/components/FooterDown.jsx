import React, { useState } from "react";
import "../components/FooterDown.css";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function FooterDown() {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);
	return (
		<>
			<MDBFooter color="indigo" className="font-small pt-0 entire__footer">
				<MDBContainer>
					<MDBRow className="pt-5 mb-3 text-center d-flex justify-content-center footer__headers">
						<MDBCol md="2" className="b-3">
							<h6 className="title font-weight-bold">
								<a href="#!">About us</a>
							</h6>
						</MDBCol>
						<MDBCol md="2" className="b-3">
							<h6 className="title font-weight-bold">
								<a href="#!">Products</a>
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
								<a href="#!">Help</a>
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
						style={{ margin: "0 15%", border: "1px solid rgb(36, 36, 36)" }}
					/>
					<MDBRow className="d-flex text-center justify-content-center mb-md-0 mb-4">
						<MDBCol md="8" sm="12" className="mt-5">
							<p style={{ lineHeight: "1.7rem", color: "white" }}>
								This is ZINTA. A highly customizable blogging website for all
								you scribble aficionados out there. Click, Pull, Drag and Drop,
								Resize, Add images, do whatever you want to your hearts' content
								until it looks like your dream blog. Showcase your presentation
								skills and give wings to your writing proficiency! Good Luck!
							</p>
						</MDBCol>
					</MDBRow>
					<hr
						className="clearfix d-md-none rgba-white-light"
						style={{ margin: "10% 15% 5%" }}
					/>
					<MDBRow className="pb-3">
						<MDBCol md="12">
							<div className="mb-5 flex-center social__icons">
								<a className="fb-ic">
									<i className="fab fa-facebook-f fa-lg white-text mr-md-4">
										{" "}
									</i>
								</a>
								<a className="tw-ic">
									<i className="fab fa-twitter fa-lg white-text mr-md-4"> </i>
								</a>

								<a className="li-ic">
									<i className="fab fa-linkedin-in fa-lg white-text mr-md-4">
										{" "}
									</i>
								</a>
								<a className="ins-ic">
									<i className="fab fa-instagram fa-lg white-text mr-md-4"> </i>
								</a>
								<a className="pin-ic">
									<i className="fab fa-pinterest fa-lg white-text"> </i>
								</a>
							</div>
						</MDBCol>
					</MDBRow>
				</MDBContainer>
				<div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright: ZINTA ~ MVK
					</MDBContainer>
				</div>
			</MDBFooter>
			<Modal isOpen={modal} toggle={toggle}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					LOGIN
				</ModalHeader>
				<ModalBody>
					<p>A form will go here, login credentials needed</p>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={toggle}>
						Ok!
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
