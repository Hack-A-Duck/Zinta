import React, {useState, useEffect} from "react";
import GridLayout from "react-grid-layout";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import "../HomeBody.css";;

const LayoutAdmin = () => {
	const [blogLayout, setBlogLayout] = useState([]);

	useEffect(() => {
		fetch("http://localhost:5000/api/get-visible-blogs", {
			method: "GET"
		}).then((res) => {
			return res.json();
		}).then((data) => {
			setBlogLayout(data.map(current => {
				return {
					...current, 
					i: current._id,
				}
			}));
		})
	}, []);

	const saveLayoutHandler = () => {
		fetch("http://localhost:5000/api/save-layout", {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({blogs: blogLayout})
		}).then((res) => {
			return res.json();
		}).then((data) => {
			if(data.status === "400") {
				return window.alert("Some error occured!");
			} else {
				return window.alert("Layout successfully saved!");
			}
		})
	}

	return (
		<div>

			<Button color="success" onClick={saveLayoutHandler}>
				Save Layout
			</Button>

			<GridLayout
				onLayoutChange={(current) => setBlogLayout(current)}
				className="layout"
				layout={blogLayout}
				cols={12}
				rowHeight={30}
				width={window.screen.width}
			>
				{blogLayout.map((current) => {
					// console.log(current);
					return (
						<div className="fullcard__container" key={current.i}>
							<div className="blog__body">
								<div className="blog__left">
									<div className="blog__image">
										<img src={current.image} alt="Blog Image" />
									</div>
								</div>
								<div className="blog__right">
									<div className="">
										{/* <Link to={`/blog/${current.i}`}> */}
											<h3>{current.title}</h3>
										{/* </Link> */}
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</GridLayout>
		</div>
	);
};

export default LayoutAdmin;
