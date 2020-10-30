import React, { useEffect } from "react";
import { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";

import BlogsAdmin from "../components/Admin/BlogsAdmin";
import FeedbackAdmin from "../components/Admin/FeedbackAdmin";
import LayoutAdmin from "../components/Admin/LayoutAdmin";

function Admin() {
  useEffect(() => {
    const user = localStorage.getItem("user-session");
    if (!user) {
      window.location.href = "/";
    }
  });

  const _layoutComponent = 0;
  const _blogsComponent = 1;
  const _feedbackComponent = 2;

  const [currentComponent, setCurrentComponent] = useState(_layoutComponent);

  const gotoLayout = () => {
    setCurrentComponent(_layoutComponent);
  };

  const gotoBlogs = () => {
    setCurrentComponent(_blogsComponent);
  };

  const gotoFeedback = () => {
    setCurrentComponent(_feedbackComponent);
  };

  return (
    <div className="admin">
      <NavbarAdmin
        gotoBlogs={gotoBlogs}
        gotoFeedback={gotoFeedback}
        gotoLayout={gotoLayout}
      />

      {currentComponent === _layoutComponent ? <LayoutAdmin /> : null}
      {currentComponent === _blogsComponent ? <BlogsAdmin /> : null}
      {currentComponent === _feedbackComponent ? <FeedbackAdmin /> : null}
    </div>
  );
}

export default Admin;
