import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'
import { RiCloseFill } from "react-icons/ri"

function Task({ id, title, desc, completed, listId }) {
    const [taskId, setTaskId] = useState(id)
    const [completionStatus, setCompletionStatus] = useState(completed)

    useEffect(() => {
        const handleCompletionChange = async () => {
            try {
                const auth = getAuth()
                const userId = auth.currentUser.uid
                const docRef = doc(db, "users", userId, "lists", listId, "tasks", taskId)

                await setDoc(docRef, { completed: completionStatus }, { merge: true })
            } catch (error) {
                console.error("Error updating task completion status:", error)
            }
        }
        handleCompletionChange()
    }, [completionStatus])

    const handleDelete = async () => {
        try {
            const auth = getAuth()
            const userId = auth.currentUser.uid
            const taskRef = doc(db, "users", userId, "lists", listId, "tasks", taskId)

            await deleteDoc(taskRef)
            console.log("Task deleted with ID:", taskId)
        } catch (error) {
            console.error("Error deleting task:", error)
        }
    }

return (
    <Card 
        className="mb-2 border-0 shadow-sm"
        style={{ 
        borderLeft: completed ? '4px solid #198754' : '4px solid #0d6efd',
        opacity: completed ? 0.75 : 1,
        }}
    >
        <Card.Body className="py-2 px-3 d-flex align-items-center gap-3">
            <Form.Check 
                type="checkbox"
                checked={completionStatus}
                onChange={() => {setCompletionStatus(!completionStatus)}}
                className="mt-0 mb-0 flex-shrink-0"
            />

            <div className="flex-grow-1">
                <div 
                className="fw-bold"
                style={{ 
                    textDecoration: completed ? 'line-through' : 'none',
                    color: completed ? '#6c757d' : '#212529',
                }}
                >
                {title}
                </div>
                
                {desc && (
                <div 
                    className="small text-muted mt-1"
                    style={{ 
                    textDecoration: completed ? 'line-through' : 'none',
                    wordBreak: 'break-word',
                    whiteSpace: 'normal',
                    opacity: completed ? 0.7 : 1,
                    }}
                >
                    {desc}
                </div>
                )}
            </div>
            <div style={{
                cursor: 'pointer'
            }} onClick={handleDelete} title='Usuń'>
                <RiCloseFill size={35}/>
            </div>
        </Card.Body>
    </Card>
)}
export default Task