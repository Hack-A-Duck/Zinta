import React, { useState } from "react";
import "./HomeBody.css";
import Card from "../components/Card";
import { Resizable } from "re-resizable";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import GridLayout from "react-grid-layout";
import { Link } from "react-router-dom";
import FooterDown from "./FooterDown";

const HomeBody = (props) => {
  // console.log("homebody", props);

  const blogInfo = [
    {
      title: "Title 1",
      body: "Body1",
      image:
        "https://i.pinimg.com/originals/8a/53/52/8a5352b7d0688d238d8a5028912dfba5.jpg",
    },
    {
      title: "Title 2",
      body:
        "blog2Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius repellat excepturi aliquam atque sit. Vel numquam consequuntur cumque dolores a veritatis enim possimus odit, pariatur culpa ipsam id eligendi nam.",
      image:
        "https://i.pinimg.com/originals/85/d4/c7/85d4c7945a979cf54c6630b316e91b40.jpg",
    },
    {
      title: "Title 3",
      body: "Body3",
      image: "https://i1.sndcdn.com/avatars-000348646274-3etq6i-t500x500.jpg",
    },
    {
      title: "Title 4",
      body: "Body4",
      image:
        "https://i.pinimg.com/originals/8a/53/52/8a5352b7d0688d238d8a5028912dfba5.jpg",
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
      image: blogInfo[0].image,
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
      image: blogInfo[1].image,
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
      image: blogInfo[2].image,
    },
    {
      i: "d",
      x: 0,
      y: 0,
      w: 4,
      h: 6,
      href: "blog4",
      title: blogInfo[3].title,
      body: blogInfo[3].body,
      image: blogInfo[3].image,
    },
  ];

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
        <ArrowForwardIosIcon className="expand__arrow" />
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
                    <img src={current.image} alt="Blog Image" />
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
      </GridLayout>

      <FooterDown />
    </div>
  );
};

export default HomeBody;
