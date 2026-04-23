import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

function Layout({ games, addGame, joinedIds, toggleJoin }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            PickupPal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/post">
                Post a game
              </Nav.Link>
              <Nav.Link as={NavLink} to="/mine">
                My games
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="flex-grow-1">
        <Outlet context={{ games, addGame, joinedIds, toggleJoin }} />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
