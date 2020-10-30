import React from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";
import fire from "../components/firebase";

const NavbarAdmin = (props) => {
  const handleLogout = async () => {
    localStorage.removeItem("user-session");
    await fire.auth().signOut();
    window.location.href = "/";
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoLayout()}
          >
            <NavLink>Layout</NavLink>
          </NavItem>

          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoBlogs()}
          >
            <NavLink>Manage Blogs</NavLink>
          </NavItem>

          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoFeedback()}
          >
            <NavLink>Feedback</NavLink>
          </NavItem>

          <NavItem style={{ cursor: "pointer" }} onClick={handleLogout}>
            <NavLink>Logout</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarAdmin;
