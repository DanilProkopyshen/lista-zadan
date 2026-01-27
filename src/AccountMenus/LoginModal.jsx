import { useState } from "react"
import { signInWithEmailAndPassword, getAuth } from "firebase/auth"

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Alert from "react-bootstrap/Alert"
import { toast } from "react-toastify"


function LoginModal() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleClose = () => {setShow(false); setEmail(""); setPassword(""); setError(""); }
  const handleShow = () => setShow(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Podaj email i hasło")
      return
    }

    setLoading(true)
    const auth = getAuth()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log("Logged in:", user.uid)
      handleClose()
      toast.success("Logowanie powiodło się!")
    } catch (err) {
      console.error("Login error:", err.message)
      setError(err.message || "Błąd logowania")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="primary mb-3" onClick={handleShow}>
        Zaloguj się
      </Button>

      <Modal
        show={show}
        onHide={() => { handleClose(); handleReset(); }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Logowanie</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <FloatingLabel
              controlId="floatingEmail"
              label="Email"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Hasło"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                {loading ? "Logowanie..." : "Zaloguj się"}
              </Button>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { handleClose(); handleReset(); }}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LoginModal
