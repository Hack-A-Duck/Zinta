import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function NavbarTop() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link to="/">
          <NavbarBrand>ZINTA</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <Link to="/" style={{textDecoration: "none"}}>
              <NavItem>
                <NavLink>Home</NavLink>
              </NavItem>
            </Link>

            <Link to="/feedback" style={{textDecoration: "none"}}>
              <NavItem>
                <NavLink>Feedback</NavLink>
              </NavItem>
            </Link>

          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarTop;
