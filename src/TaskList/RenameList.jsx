import { getAuth } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { db } from "../firebase"

function RenameList({listId}) {
    const [show, setShow] = useState(false)
    const [newListName, setNewListName] = useState("")
    const [validated, setValidated] = useState(false)

    const handleClose = () => {
        setShow(false)
        setNewListName("")
        setValidated(false)
    }
    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!newListName.trim()) {
            setValidated(true)
            return
        }

        try {
            const auth = getAuth()
            const userId = auth.currentUser.uid
            const listRef = doc(db, "users", userId, "lists", listId)

            await setDoc(listRef, {name: newListName}, {merge: true})

            console.log(`Renamed list with id ${listId} to ${newListName}`)

            handleClose()
        } catch(error) {
            console.log("Error while renaming the list: ", error)
        }
    }

    return (
        <>
            <p onClick={handleShow} className="fw-bold align-middle">
                Zmień nazwę
            </p>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Podaj nową nazwę</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingText"
                            label="Nazwa"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                maxLength={20}
                                placeholder="lista"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                isInvalid={validated && !newListName.trim()}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                Nowa nazwa nie może być pusta
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg">
                                Zmień nazwę
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

export default RenameList