import PropTypes from 'prop-types'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import 'bootstrap/dist/css/bootstrap.min.css'

function AppNavbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {!isSidebarOpen && (
          <Button
            variant="outline-light"
            className="me-3"
            onClick={onToggleSidebar}
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar"
          >
            ☰ Menu
          </Button>
        )}

        <Navbar.Brand>Listy zadań</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

AppNavbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default AppNavbar
