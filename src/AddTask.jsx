import { useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap"
import { FaCirclePlus } from "react-icons/fa6"
import { auth, db } from "./firebase"
import { addDoc, collection } from "firebase/firestore"

function AddTask({listId}) {
    const [show, setShow] = useState(false)

    const [taskName, setTaskName] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [important, setImportant] = useState(false)

    const [validated, setValidated] = useState(false)

    const handleClose = () => {
        setShow(false)
        setTaskName("")
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
                name: taskName,
                description: taskDesc,
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
                                maxLength={15}
                                placeholder="lista"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                isInvalid={validated && !taskName.trim()}
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
                                maxLength={45}
                                placeholder="zadanie"
                                value={taskDesc}
                                onChange={(e) => setTaskDesc(e.target.value)}
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