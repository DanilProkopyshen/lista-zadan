import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { BsPlus } from "react-icons/bs"
import { auth, db } from "./firebase"
import { doc, setDoc, collection, addDoc } from "firebase/firestore"

function AddList() {
    const [show, setShow] = useState(false)
    const [listName, setListName] = useState("")
    const [validated, setValidated] = useState(false)

    const handleClose = () => {
        setShow(false)
        setListName("")
        setValidated(false)
    }
    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!listName.trim()) {
            setValidated(true)
            return
        }

        try {
            const userId = auth.currentUser.uid;

            const userRef = doc(db, "users", userId)
            await setDoc(
                userRef,
                { email: auth.currentUser.email },
                { merge: true }
            )

            const listsCollection = collection(db, "users", userId, "lists")
            const newListRef = await addDoc(listsCollection, {
                name: listName,
            })

            console.log("List created with ID:", newListRef.id)

            handleClose()
        } catch (error) {
            console.error("Error creating list:", error)
        } 
    }

    return (
        <>
            <Button 
                variant="primary" 
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleShow}
            >
                <BsPlus className="me-2" />
                Utwórz listę
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nową listę</Modal.Title>
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
                                maxLength={15}
                                placeholder="lista"
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                isInvalid={validated && !listName.trim()}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                Nazwa nie może być pusta
                            </Form.Control.Feedback>
                        </FloatingLabel>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg">
                                Stwórz listę
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

export default AddList