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
    <div>

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
            <div className="fullcard__container" key={current.i}>
              <Link to={`/blog/${current.i}`}>
              <div className="blog__body">
                <div className="blog__left">
                  <div className="blog__image">
                    <img src={current.image} alt="Blog" />
                  </div>
                </div>
                <div className="blog__right">
                  <div className="blog__title">
                      <h3>{current.title}</h3>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          );
        })}
      </GridLayout>

      <FooterDown />
    </div>
  );
};

export default HomeBody;
