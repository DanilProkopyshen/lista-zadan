import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { BsPlus } from "react-icons/bs"

function AddList() {
    const [show, setShow] = useState(false)
    const [listName, setListName] = useState("")
    const [validated, setValidated] = useState(false) // NEW

    const handleClose = () => {
        setShow(false)
        setListName("")
        setValidated(false)
    }
    const handleShow = () => setShow(true)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!listName.trim()) {
            // if empty or whitespace only
            setValidated(true)
            return
        }

        // valid submission
        console.log("Creating list:", listName)

        

        handleClose()
    }

    return (
        <>
            <Button 
                variant="primary" 
                className="w-100 d-flex align-items-center justify-content-center"
                onClick={handleShow}
            >
                <BsPlus className="me-2" />
                Add Item
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
                                placeholder="lista"
                                value={listName}
                                onChange={(e) => setListName(e.target.value)}
                                isInvalid={validated && !listName.trim()} // show invalid style
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