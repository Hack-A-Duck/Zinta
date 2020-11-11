import React, {useState, useEffect} from "react";
import GridLayout from "react-grid-layout";
import { Button } from "reactstrap";
import "../HomeBody.css";;

const LayoutAdmin = () => {
	const [blogLayout, setBlogLayout] = useState([]);

	useEffect(() => {
		fetch("/api/get-visible-blogs", {
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
		const body = blogLayout.map(current => {
			return {
				w: current.w,
				h: current.h,
				x: current.x,
				y: current.y,
				i: current.i,
			}
		});
		
		fetch("/api/save-layout", {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({blogs: body})
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
		var updatedLayout = blogLayout;
		var update = [];
		for(var i=0; i<currentLayout.length; ++i) {
			for(var j=0; j<updatedLayout.length; ++j) {
				if(currentLayout[i].i === updatedLayout[j].i) {
					var temp = {
						...updatedLayout[j],
						w: currentLayout[i].w,
						h: currentLayout[i].h,
						x: currentLayout[i].x,
						y: currentLayout[i].y,
					}
					update.push(temp);
				}
			}
		}

		setBlogLayout(update);
	}

	return (
		<div style={{backgroundColor:"lightgray"}}>

			<Button style={{marginLeft:"10px", marginTop:"10px"}} color="success" onClick={saveLayoutHandler}>
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
					return (
						<div style={{backgroundColor:"white", borderRadius:"5px", border:"3px solid #b9b2e2"}} className="fullcard__container" key={current.i}>
							<div className="blog__body" style={{maxWidth: `${current.w}0vw`, maxHeight: `${current.h}0vh`, display: "flex", flexDirection: "column"}}>
								<div className="blog__left">
									<div className="blog__image" style={{display: "flex", justifyContent: "center"}}>
										<img style={{width: "100%", maxHeight: "75%"}} src={`/api/get-thumbnail/${current.i}`} alt="Blog Image" />
									</div>
								</div>
								<br/>
								<div className="blog__right">
									<div style={{display: "flex", justifyContent: "center", color:"black"}}>
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
