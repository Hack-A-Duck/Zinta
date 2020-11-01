import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FooterDown from "../components/FooterDown";
import NavbarTop from "../components/NavbarTop";
import StarRatings from 'react-star-ratings';

import "./Feedback.css";

function Feedback() {
	const [modal, setModal] = useState(false);
	const toggle = () => setModal(!modal);
	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [rating, setRating] = useState(0);
	const [presentation, setPresentation] = useState(false);
	const [content, setContent] = useState(false);
	const [linguistics, setLinguistics] = useState(false);
	const [accuracy, setAccuracy] = useState(false);
	const [none, setNone] = useState(false);

	const [modalBody, setModalBody] = useState("Please fill in all the fields");
	const [modalHead, setModalHead] = useState("Error");

	useEffect(() => {
		return updateModalContent();
	}, [name, email]);

	const updateModalContent = () => {

		if(name.trim().length === 0) {
			setModalHead("Error");
			setModalBody("Please enter your name");
		} 
		else if(email.trim().length === 0) {
			setModalHead("Error");
			setModalBody("Please enter your email");
		} 
		else {
			setModalHead("Thank You!");
			setModalBody("We've received your feedback and your suggestions would be taken into consideration for a better experience!");
		}
	}

	const resetAllStates = () => {
		setName("");
		setEmail("");
		setMessage("");
		setRating(0);
		setPresentation(false);
		setContent(false);
		setLinguistics(false);
		setAccuracy(false);
		setNone(false);
	}

	const submitHandler = () => {

		if(name.trim().length === 0) {
			return toggle();
		}

		if(email.trim().length === 0) {
			return toggle();
		}

		setModalHead("Thank You!");
		setModalBody("We've received your feedback and your suggestions would be taken into consideration for a better experience!");

		const checkboxes = [];

		if(presentation) checkboxes.push("Presentation");
		if(content) checkboxes.push("Content");
		if(linguistics) checkboxes.push("Linguistics");
		if(accuracy) checkboxes.push("Accuracy");
		if(none) checkboxes.push("None");

		const data = {
			name: name,
			email: email,
			message: message | "No Message",
			rating: rating | 0,
			checkbox: checkboxes | []
		};

		fetch("http://localhost:5000/api/create-feedback", {
      		method: "POST",
      		headers: {
				Accept: "application/json",
				"Content-type": "application/json",
			},
      		body: JSON.stringify(data),
    	})
      		.then((res) => res.json())
      		.then((data) => {});

		toggle();
		resetAllStates();
	}

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
						<Label>Name</Label>
						<Input
							type="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Type here..."
						/>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Type here..."
						/>
					</FormGroup>
					<FormGroup>
						<Label>
							Things you find attractive about this blog?
						</Label>
						<div>
							<CustomInput
								type="switch"
								id="presentation"
								label="Presentation"
								value={presentation}
								onChange={(e) => setPresentation(e.target.checked)}
							/>
							<CustomInput
								type="switch"
								id="content"
								value={content}
								onChange={(e) => setContent(e.target.checked)}
								label="Content"
							/>
							<CustomInput
								type="switch"
								id="linguistics"
								value={linguistics}
								onChange={e => setLinguistics(e.target.checked)}
								label="Linguistics"
							/>
							<CustomInput
								type="switch"
								id="accuracy"
								value={accuracy}
								onChange={e => setAccuracy(e.target.checked)}
								label="Accuracy Of Facts"
							/>
							<CustomInput
								type="switch"
								id="none"
								value={none}
								onChange={e => setNone(e.target.checked)}
								label="None"
							/>
						</div>
					</FormGroup>

					<FormGroup>
						<Label>
							What else do you expect from the author?
						</Label>
						<Input value={message} onChange={(e) => setMessage(e.target.value)} type="textarea" />
					</FormGroup>

					<FormGroup style={{display: "flex", flexDirection: "column"}}>
						<Label>Out of 5, please rate the blog </Label>
						
						<StarRatings 
							rating={rating}
							starRatedColor="#FFD700"
							changeRating={(newRating) => {setRating(newRating)}}
							numberOfStars={5}
							starDimension="40px"
							starSpacing="15px"
						/>

					</FormGroup>

					<Button color="success" onClick={submitHandler}>
						Submit
					</Button>

					<Modal isOpen={modal} toggle={toggle}>
						<ModalHeader toggle={toggle} close={closeBtn}>
							{modalHead}
						</ModalHeader>
						<ModalBody>
							{modalBody}
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
