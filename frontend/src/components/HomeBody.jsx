import React, { useState } from "react";

import Card from "../components/Card";
import { Resizable } from "re-resizable";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
      height: 480,
      width: 500,
    },
    {
      title: "Title 2",
      body: "Body1",
      height: 350,
      width: 400,
    },
    {
      title: "Title 3",
      body: "Body1",
      height: 480,
      width: 500,
    },
    {
      title: "Title 4",
      body: "Body1",
      height: 480,
      width: 500,
    },
  ];

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, href: "blog1" },
    { i: "b", x: 1, y: 0, w: 3, h: 2, href: "blog2" },
    { i: "c", x: 4, y: 0, w: 1, h: 2, href: "blog3" },
  ];

  const initialLayout2 = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, },
    { i: "b", x: 1, y: 0, w: 3, h: 2, },
    { i: "c", x: 4, y: 0, w: 1, h: 2, },
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
      </Resizable>

      <GridLayout
        onLayoutChange={layoutChangeHandler}
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        {layout.map((current) => {
            // console.log(current);
          return (
            
              <div style={{ backgroundColor: "#aaa" }} key={current.i}>
                <Link to={`/blog/${current.i}`}>
                  <div>
                    <p>{current.href}</p>
                  </div>
                </Link>
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

      <div className="home__body">
        {/* {blogInfo.map((current) => {
          return <Card info={current} />;
        })} */}
      </div>

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
