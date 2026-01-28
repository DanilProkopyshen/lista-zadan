import { useEffect, useState } from "react"
import { Card, ListGroup, Container, Badge, Button } from "react-bootstrap"
import Task from "./Task"
import AddTask from "../AddTask"
import { auth, db } from "../firebase"
import { collection, onSnapshot, query } from "firebase/firestore"

function List({listId, listName}) {
    const [taskList, setTasks] = useState([])

    useEffect(() => {

        const userId = auth.currentUser.uid;
        const q = query(collection(db, "users", userId, "lists", listId, "tasks"))

        const unsubscribe = onSnapshot(
        q, (snapshot) => {
            const updatedTasks = snapshot.docs.map((doc) => {
                console.log("Task data: ", doc.data())
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            const sortedTasks = updatedTasks.sort((a, b) => {
                return a.completed - b.completed
            })
            setTasks(sortedTasks)
        },
        (error) => {
            console.error("Error in lists listener:", error)
        })

        return () => unsubscribe()
    }, [])


    return (
        <Container className="py-4">
            <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{listName}</h4>
                <div>
                    <Button className="mx-2">
                        <AddTask listId={listId} />
                    </Button>
                    <Badge bg="light" text="dark" className="fs-6">
                        {taskList.length} zadań
                    </Badge>
                </div>
                
            </Card.Header>

            <ListGroup variant="flush">
                {taskList.length === 0 ? (
                <ListGroup.Item className="text-center text-muted py-5">
                    Brak zadań do wyświetlenia...
                </ListGroup.Item>
                ) : (taskList.map((task) => (
                    <Task key={task.id} {...task} />
                )))}
            </ListGroup>
            
            <Card.Footer className="text-muted small">
                Zrobione: {taskList.filter(t => t.completed).length} / {taskList.length}
            </Card.Footer>
            </Card>
        </Container>
    )
}


export default List