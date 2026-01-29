import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { toast } from 'react-toastify'

import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Alert from "react-bootstrap/Alert"

function RegisterModal() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const handleClose = () => {setShow(false); setEmail(""); setPassword(""); setConfirmPassword(""); setError(""); }
  const handleShow = () => setShow(true)

  const validatePassword = (pwd) => {
    const hasLength = pwd.length >= 8
    const hasUpper = /[A-Z]/.test(pwd)
    const hasLower = /[a-z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    return hasLength && hasUpper && hasLower && hasNumber
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  const isEmailValid = validateEmail(email)
  const isPasswordValid = validatePassword(password)
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0

  const isFormValid = isEmailValid && isPasswordValid && passwordsMatch

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!isFormValid) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log("User registered with UID:", user.uid)
      handleClose()
      toast.success("Rejestracja powiodła się!")
    } catch (err) {
      console.error("Registration error:", err.code, err.message)
      setError(err.message || "Registration failed. Please try again.")
    }
  }

  const handleReset = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setError("")
  }

  return (
    <>
      <Button variant="secondary mb-3" onClick={handleShow}>
        Zarejestruj się
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Podaj dane do utworzenia konta</Modal.Title>
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
                isInvalid={email && !isEmailValid}
                isValid={email && isEmailValid}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                Wprowadź poprawny adres email
              </Form.Control.Feedback>
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
                isInvalid={password && !isPasswordValid}
                isValid={password && isPasswordValid}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                Hasło musi zawierać co najmniej 8 znaków, wielką literę, małą literę i cyfrę
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingConfirmPassword"
              label="Potwierdź hasło"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Potwierdź hasło"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={confirmPassword && !passwordsMatch}
                isValid={confirmPassword && passwordsMatch}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                Hasła nie są identyczne
              </Form.Control.Feedback>
            </FloatingLabel>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid}
                size="lg"
              >
                Zarejestruj się
              </Button>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default RegisterModal