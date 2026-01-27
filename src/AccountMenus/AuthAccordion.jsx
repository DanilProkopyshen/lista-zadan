import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'
import Accordion from 'react-bootstrap/Accordion'
import AuthOptions from './AuthOptions'

function AuthAccordion() {
  return (
    <Accordion defaultActiveKey="0" flush id="transparentAccordion">
      <Accordion.Item
        eventKey="0"
        className="bg-transparent border-0"
      >
        <Accordion.Header className="bg-transparent text-white">
          Konto
        </Accordion.Header>

        <Accordion.Body className="bg-transparent text-white">
          <AuthOptions />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default AuthAccordion
