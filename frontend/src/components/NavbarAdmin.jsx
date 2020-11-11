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
			<Navbar style={{backgroundColor:"#8572f0"}} dark expand="md">
        <Nav className="mr-auto" navbar>
          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoLayout()}
          >
            <NavLink><strong>Layout</strong></NavLink>
          </NavItem>

          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoBlogs()}
          >
            <NavLink><strong>Manage Blogs</strong></NavLink>
          </NavItem>

          <NavItem
            style={{ cursor: "pointer" }}
            onClick={() => props.gotoFeedback()}
          >
            <NavLink><strong>Feedback</strong></NavLink>
          </NavItem>

          <NavItem style={{ cursor: "pointer" }} onClick={handleLogout}>
            <NavLink><strong>Logout</strong></NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarAdmin;
