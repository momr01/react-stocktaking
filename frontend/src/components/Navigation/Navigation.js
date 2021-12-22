import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import routes from "../../helpers/routes";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";

import "./Navigation.scss";

export default function Navigation() {
  const { logout } = useAuth();
  const logCorrect = useAuth();

  return (
    <>
      <Navbar
        className="navigation"
        collapseOnSelect
        expand="lg"
        variant="dark"
        bg="dark"
      >
        <Container>
          <Navbar.Brand as={NavLink} to={routes.home}>
            Inicio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          {logCorrect.user && (
            
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                  as={Nav}
                  className="navigation__logout"
                  onClick={() => logout()}
                >
                  Cerrar Sesión
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
}
