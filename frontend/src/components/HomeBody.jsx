import React, {useState, useEffect} from "react";
import "./HomeBody.css";
import GridLayout from "react-grid-layout";
import { Link } from "react-router-dom";
import FooterDown from "./FooterDown";

const HomeBody = (props) => {
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
          static: true
				}
			}));
		})
	}, []);

  return (
    <div style={{backgroundColor:"lightgray"}}>
      <GridLayout
        className="layout"
        layout={blogLayout}
        cols={12}
        rowHeight={30}
        width={window.screen.width}
      >
        {blogLayout.map((current) => {
          // console.log(current);
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
									<div style={{display: "flex", justifyContent: "center"}}>
										<Link style={{color:"black"}} to={`/blog/${current.i}`}>
											<h3>{current.title}</h3>
										</Link>
									</div>
								</div>
							</div>
						</div>
          );
        })}
      </GridLayout>
        
      <div style={{paddingTop: "10vh", marginTop: "15vh"}}>
        <FooterDown />
      </div>
    </div>
  );
};

export default HomeBody;
