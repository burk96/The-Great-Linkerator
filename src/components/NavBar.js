import React, { useState } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="NavBar">
      <Navbar color="dark" dark expand="md">
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
            margin: "0.5rem",
          }}
        >
          Linkerator
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            <NavItem>
              <Link to={"/links"} style={{ marginLeft: "1rem" }}>
                Links
              </Link>
            </NavItem>
            <NavItem>
              <Link to={"/tags"} style={{ marginLeft: "1rem" }}>
                Tags
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
