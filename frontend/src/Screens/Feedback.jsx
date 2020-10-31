import React, { useState } from "react";
import { Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FooterDown from "../components/FooterDown";
import NavbarTop from "../components/NavbarTop";
import "./Feedback.css";
function Feedback() {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	//handleSubmit()
	return (
		<>
			<div>
				<NavbarTop />
			</div>
			<div className="feedback__form">
				<h2>YOUR OPINION MATTERS</h2>
				<Form>
					<FormGroup>
						<Label for="exampleEmail">Name</Label>
						<Input
							type="name"
							name="name"
							id="exampleName"
							placeholder="Type here..."
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<Input
							type="email"
							name="email"
							id="exampleEmail"
							placeholder="Type here..."
						/>
					</FormGroup>
					<FormGroup>
						<Label for="exampleCheckbox">
							Things you find attractive about this blog?
						</Label>
						<div>
							<CustomInput
								type="switch"
								id="exampleCustomSwitch1"
								name="customSwitch"
								label="Presentation"
							/>
							<CustomInput
								type="switch"
								id="exampleCustomSwitch2"
								name="customSwitch"
								label="Content"
							/>
							<CustomInput
								type="switch"
								id="exampleCustomSwitch3"
								label="Linguistics"
								name="customSwitch"
							/>
							<CustomInput
								type="switch"
								id="exampleCustomSwitch4"
								label="Accuracy Of Facts"
								name="customSwitch"
							/>
							<CustomInput
								type="switch"
								id="exampleCustomSwitch5"
								name="customSwitch"
								label="None"
							/>
						</div>
					</FormGroup>

					<FormGroup>
						<Label for="exampleText">
							What else do you expect from the author?
						</Label>
						<Input type="textarea" name="text" id="exampleText" />
					</FormGroup>

					<FormGroup>
						<Label for="exampleSelect">Out of 5, please rate the blog ⭐</Label>
						<Input type="select" name="select" id="exampleSelect">
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
							<option>5</option>
						</Input>
					</FormGroup>

					<Button color="success" onClick={toggle}>
						Submit
					</Button>
					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle} close={closeBtn}>
							THANK YOU!
						</ModalHeader>
						<ModalBody>
							We've received your feedback and your suggestions would be taken
							into consideration for a better experience!
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>
								Close
							</Button>
						</ModalFooter>
					</Modal>
				</Form>
			</div>
			<div style={{ marginTop: "10px" }}>
				<FooterDown />
			</div>
		</>
	);
}

export default Feedback;
