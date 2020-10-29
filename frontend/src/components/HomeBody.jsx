import React, { useState } from "react";
import "./HomeBody.css";
import Card from "../components/Card";
import { Resizable } from "re-resizable";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import GridLayout from "react-grid-layout";
import { Link } from "react-router-dom";

const HomeBody = (props) => {
	// console.log("homebody", props);
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);

	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	const blogInfo = [
		{
			title: "Title 1",
			body: "Body1",
		},
		{
			title: "Title 2",
			body:
				"blog2Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius repellat excepturi aliquam atque sit. Vel numquam consequuntur cumque dolores a veritatis enim possimus odit, pariatur culpa ipsam id eligendi nam.",
		},
		{
			title: "Title 3",
			body: "Body3",
		},
		{
			title: "Title 4",
			body: "Body4",
		},
	];

	const layout = [
		{
			i: "a",
			x: 0,
			y: 0,
			w: 4,
			h: 6,
			href: "blog1",
			title: blogInfo[0].title,
			body: blogInfo[0].body,
		},
		{
			i: "b",
			x: 4,
			y: 0,
			w: 4,
			h: 6,
			href: "blog2",
			title: blogInfo[1].title,
			body: blogInfo[1].body,
		},
		{
			i: "c",
			x: 8,
			y: 0,
			w: 4,
			h: 6,
			href: "blog3",
			title: blogInfo[2].title,
			body: blogInfo[2].body,
		},
	];
	// const initialLayout2 = [
	// 	{ i: "a", x: 0, y: 0, w: 1, h: 2 },
	// 	{ i: "b", x: 1, y: 0, w: 3, h: 2 },
	// 	{ i: "c", x: 4, y: 0, w: 1, h: 2 },
	// ];

	//   const [layout, setLayout] = useState(initialLayout);

	const layoutChangeHandler = (current) => {
		// console.log("layoutChanged", );
		// setLayout(current);
	};
	return (
		<div>
			<Resizable
				defaultSize={{
					width: 700,
					height: 380,
				}}
				className="home__header"
				enable={{
					top: false,
					right: false,
					bottom: false,
					left: false,
					topRight: false,
					bottomRight: true,
					bottomLeft: false,
					topLeft: false,
				}}
			>
				<h1>EDITABLE TEXT FOR THE USER</h1>
				<h3>Example:</h3>
				<h6>Hello I am Blogger</h6>
				<p>I blog about this this stuff etc</p>
				<h4>Also Resizable</h4>
			</Resizable>

			<GridLayout
				onLayoutChange={layoutChangeHandler}
				className="layout"
				layout={layout}
				cols={12}
				rowHeight={30}
				width={1320}
			>
				{layout.map((current) => {
					// console.log(current);
					return (
						<div className="fullcard__container" key={current.i}>
							<div className="blog__body">
								<div className="blog__left">
									<div className="blog__image">
										<img
											src="https://i.pinimg.com/originals/8a/53/52/8a5352b7d0688d238d8a5028912dfba5.jpg"
											alt=""
										/>
									</div>
								</div>
								<div className="blog__right">
									<div className="blog__title">
										<Link to={`/blog/${current.i}`}>
											<h3>{current.title}</h3>
										</Link>
									</div>
									<div className="blog__content">
										<p>{current.body}</p>
									</div>
								</div>
							</div>
							{/* <ArrowForwardIosIcon className="expand__arrow" /> */}

							{/* <p>BLog body</p> */}
						</div>
					);
				})}
				{/* <div style={{ backgroundColor: "#aaa" }} key="a">
          <Link to={`/${initialLayout[0].i}`}>
            <div href="">
                <p>Card1</p>
            </div>
          </Link>
        </div>
        <div style={{ backgroundColor: "#aaa" }} key="b">
          Card2
        </div>
        <div style={{ backgroundColor: "#aaa" }} key="c">
          Card3
        </div> */}
			</GridLayout>

			{/* <div className="home__body">
				{blogInfo.map((current) => {
          return <Card info={current} />;
        })}
			</div> */}

			<footer className="home__footer">
				<Button color="danger" onClick={toggle} style={{ margin: "10px" }}>
					Admin/Login
				</Button>
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
			</footer>
		</div>
	);
};

export default HomeBody;
