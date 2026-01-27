import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import AuthAccordion from './AccountMenus/AuthAccordion'

function Sidebar({ isOpen, onClose }) {
  return (
    <div
      id="sidebar"
      style={{
        width: isOpen ? '280px' : '0px',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
      className="bg-dark text-white d-flex flex-column"
    >
      <div className="p-3 d-flex flex-column flex-grow-1">
        <h4 className="mb-4">Opcje</h4>

        <Nav className="flex-column">
          <Nav.Link href="#" className="text-white px-0">
            Wszystkie Zadania
          </Nav.Link>
          <Nav.Link href="#" className="text-white px-0">
            Ważne
          </Nav.Link>

          <div className="mt-2">
            <AuthAccordion />
          </div>
        </Nav>

        <Button
          variant="outline-light"
          className="w-100 mt-auto"
          onClick={onClose}
        >
          Ukryj
        </Button>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Sidebar