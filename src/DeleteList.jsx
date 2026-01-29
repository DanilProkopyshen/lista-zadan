import { getAuth } from "firebase/auth"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { IoTrashBin } from "react-icons/io5"
import { db } from "./firebase"

function DeleteList({ listId }) {
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleDeleteTasks = async (docRef) => {
        const tasks = await getDocs(collection(docRef, 'tasks'))
        tasks.forEach(async (task) => {
            await deleteDoc(doc(docRef, 'tasks', task.id))
            console.log(`Deleted subcollection document with ID: ${task.id}`)
        })
    }

    const handleDeleteList = async () => {
        try {
            const auth = getAuth()
            const userId = auth.currentUser.uid
            const listRef = doc(db, "users", userId, "lists", listId)

            await handleDeleteTasks(listRef)
            await deleteDoc(listRef)
            console.log("List deleted with ID:", listId)
        } catch (error) {
            console.error("Error deleting list:", error)
        }
        handleClose()
    }

    return (
        <>
            <Button variant="primary" className="mx-1">
                <IoTrashBin size={30} onClick={handleShow} title="Usuń listę"/>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton></Modal.Header>

                <Modal.Body className="text-center">
                    <h3>Czy na pewno chcesz usunąć tę listę?</h3>
                    <p>Wszystkie zadania w tej liście również zostaną usunięte.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteList}>
                        Usuń listę
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteList