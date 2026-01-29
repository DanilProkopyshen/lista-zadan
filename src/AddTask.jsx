import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { FaCirclePlus } from "react-icons/fa6"
import { auth, db } from "./firebase"
import { addDoc, collection } from "firebase/firestore"

function AddTask({listId}) {
    const [show, setShow] = useState(false)

    const [taskName, setTaskTitle] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [important, setImportant] = useState(false)

    const [validated, setValidated] = useState(false)

    const handleClose = () => {
        setShow(false)
        setTaskTitle("")
        setTaskDesc("")
        setImportant(false)
        setValidated(false)
    }

    const handleShow = () => setShow(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!taskName.trim()) {
            setValidated(true)
            return
        }

        try {
            const userId = auth.currentUser.uid

            const tasksCollection = collection(db, "users", userId, "lists", listId, "tasks")
            const newTaskRef = await addDoc(tasksCollection, {
                title: taskName,
                desc: taskDesc,
                important: important,
                completed: false,
            })

            console.log("Task created with ID:", newTaskRef.id)

            handleClose()
        } catch (error) {
            console.error("Error creating task:", error)
        }

    }

    return (
        <>
            <FaCirclePlus size={30} title="Dodaj zadanie" onClick={handleShow}/>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Dodaj nowe zadanie</Modal.Title>
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
                                maxLength={25}
                                placeholder="lista"
                                value={taskName}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                isInvalid={validated && !taskName.trim()}
                                autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                                Nazwa nie może być pusta
                            </Form.Control.Feedback>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingText"
                            label="Opis (opcjonalne)"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                maxLength={50}
                                placeholder="opis"
                                value={taskDesc}
                                onChange={(e) => setTaskDesc(e.target.value)}
                                autoComplete="off"
                            />
                        </FloatingLabel>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg">
                                Dodaj zadanie
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

export default AddTask