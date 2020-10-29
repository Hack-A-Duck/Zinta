import React, { useState } from "react";
import NavbarTop from "../components/NavbarTop";
import HomeBody from "../components/HomeBody";
import SingleBLog from "../components/SingleBlog";

function Home() {
  const _HomeBody = 0;
  const _SingleBlog = 1;

  const [blogInfo, setBlogInfo] = useState({});
  const [visibleComponent, setVisibleComponent] = useState(_HomeBody);

  const goToHome = () => {
    setVisibleComponent(_HomeBody);
  };

  const showBlog = () => {
    setVisibleComponent(_SingleBlog);
  };

  return (
    <div>
      <NavbarTop />

      {visibleComponent === _HomeBody ? (
        <HomeBody 
          showBlog={showBlog} 
          setBlogInfo={setBlogInfo} 
        />
      ) : null}
      {visibleComponent === _SingleBlog ? (
        <SingleBLog 
          goToHome={goToHome} 
          blogInfo={blogInfo} 
        />
      ) : null}
    </div>
  );
}

export default Home;

//* user login -> react-session
