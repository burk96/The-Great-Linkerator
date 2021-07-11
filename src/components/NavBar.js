import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="NavBar">
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Linkerator</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            <NavItem>
              <NavLink href="/links">Links</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tags">Tags</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
