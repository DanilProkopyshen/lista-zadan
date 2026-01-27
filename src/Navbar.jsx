import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function AppNavbar({ isSidebarOpen, onToggleSidebar }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        {/* Toggle button – only shown when sidebar is closed */}
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

        <Navbar.Brand href="#">Todo App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

AppNavbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
}

export default AppNavbar
