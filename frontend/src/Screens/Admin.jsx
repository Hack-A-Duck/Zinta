import React, { useEffect } from "react";
import { useState } from "react";
import NavbarAdmin from "../components/NavbarAdmin";

import BlogsAdmin from "../components/Admin/BlogsAdmin";
import FeedbackAdmin from "../components/Admin/FeedbackAdmin";
import LayoutAdmin from "../components/Admin/LayoutAdmin";
import CreateBlogAdmin from "../components/Admin/CreateBlogAdmin";
import EditBlogAdmin from "../components/Admin/EditBlogAdmin";

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
  const _createBlogComponent = 3;
  const _editBlogComponent = 4;

  const [currentComponent, setCurrentComponent] = useState(_layoutComponent);
  const [editBlogInfo, setEditBlogInfo] = useState({});

  const gotoLayout = () => {
    setCurrentComponent(_layoutComponent);
  };

  const gotoBlogs = () => {
    setCurrentComponent(_blogsComponent);
  };

  const gotoFeedback = () => {
    setCurrentComponent(_feedbackComponent);
  };

  const gotoCreate = () => {
    setCurrentComponent(_createBlogComponent);
  }

  const gotoEdit = () => {
    setCurrentComponent(_editBlogComponent);
  }

  return (
    <div className="admin">
      <NavbarAdmin
        gotoBlogs={gotoBlogs}
        gotoFeedback={gotoFeedback}
        gotoLayout={gotoLayout}
      />

      {currentComponent === _layoutComponent ? <LayoutAdmin /> : null}
      {currentComponent === _blogsComponent ? <BlogsAdmin gotoCreate={gotoCreate} gotoEdit={gotoEdit} setEditBlogInfo={setEditBlogInfo} /> : null}
      {currentComponent === _feedbackComponent ? <FeedbackAdmin /> : null}
      {currentComponent === _createBlogComponent ? <CreateBlogAdmin gotoBack={gotoFeedback} /> : null}
      {currentComponent === _editBlogComponent ? <EditBlogAdmin gotoBack={gotoBlogs} blogInfo={editBlogInfo} /> : null}
    </div>
  );
}

export default Admin;
