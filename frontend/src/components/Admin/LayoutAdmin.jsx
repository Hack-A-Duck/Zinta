import React, {useState, useEffect} from "react";
import GridLayout from "react-grid-layout";
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
		// console.log("save this info", blogLayout);
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

	const layoutChangeHandler = (currentLayout) => {
		currentLayout.map(current => {
			setBlogLayout(blogLayout.map(blog => {
				if(blog.i !== current.i) {
					return blog;
				} else {
					return {
						...blog,
						h: current.h,
						w: current.w,
						x: current.x,
						y: current.y,
					}
				}
			}))
		})

		// var updatedLayout = blogLayout;
		// for(var i=0; i<currentLayout.length; ++i) {
		// 	for(var j=0; j<updatedLayout.length; ++j) {
		// 		if(currentLayout[i].i === updatedLayout[j].i) {
		// 			var temp = {
		// 				...updatedLayout[i],
		// 				w: currentLayout[i].w,
		// 				h: currentLayout[i].h,
		// 				x: currentLayout[i].x,
		// 				y: currentLayout[i].y,
		// 			}
		// 		}
		// 	}
		// }

		// setBlogLayout(updatedLayout);
	}

	return (
		<div>

			<Button color="success" onClick={saveLayoutHandler}>
				Save Layout
			</Button>

			<GridLayout
				onLayoutChange={layoutChangeHandler}
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
							<div className="blog__body" style={{display: "flex", flexDirection: "column"}}>
								<div className="blog__left">
									<div className="blog__image">
										<img style={{width: "100%", height: "100%"}} src={`http://localhost:5000/api/get-thumbnail/${current.i}`} alt="Blog Image" />
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
