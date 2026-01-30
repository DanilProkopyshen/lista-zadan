import { useEffect, useState } from "react"
import { Card, ListGroup, Container, Badge, Button } from "react-bootstrap"
import Task from "./Task"
import AddTask from "../AddTask"
import { auth, db } from "../firebase"
import { collection, onSnapshot, query } from "firebase/firestore"
import ListOptions from "./ListOptions"

function List({listId, listName}) {
    const [taskList, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const userId = auth.currentUser.uid
        const q = query(collection(db, "users", userId, "lists", listId, "tasks"))

        const unsubscribe = onSnapshot(
        q, (snapshot) => {
            const updatedTasks = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

            const sortedTasks = updatedTasks.sort((a, b) => {
                return a.completed - b.completed
            })

            setTasks(sortedTasks)
            setLoading(false)
        },
        (error) => {
            console.error("Error in lists listener:", error)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])


    /******************LOADING STATE******************/
    if (loading) {
        return (
            <Container className="py-4">
            <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">{listName}</h4>
                <div>
                    <Button className="mx-2" disabled>
                        <AddTask listId={listId} />
                    </Button>
                    <Badge bg="light" text="dark" className="fs-6">
                        0 zadań
                    </Badge>
                </div>
                
            </Card.Header>

            <ListGroup variant="flush">
                <ListGroup.Item className="text-center text-muted py-5">
                    Brak zadań do wyświetlenia...
                </ListGroup.Item>
            </ListGroup>
            
            <Card.Footer className="text-muted small">
                Zrobione: 0/0
            </Card.Footer>
            </Card>
        </Container>
        ) 
    }

    /******************REGULAR STATE******************/
    return (
        <Container className="py-4">
            <Card className="shadow-sm border-0">
                <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
                    
                    <div className="d-flex align-items-center">
                        <ListOptions listId={listId}/>
                        <h4 className="mb-0">{listName}</h4>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button className="mx-1">
                            <AddTask listId={listId} />
                        </Button>
                        <Badge bg="light" text="dark" className="fs-6 mx-1">
                            {taskList.length} {
                                taskList.length === 1 ? 'zadanie' : (taskList.length >= 2 && taskList.length <= 4 ? 'zadania' : 'zadań')
                            }
                        </Badge>
                    </div>
                    
                </Card.Header>

                <ListGroup variant="flush" style={{overflowY: 'auto', maxHeight: '30rem'}}>
                    {taskList.length === 0 ? (
                    <ListGroup.Item className="text-center text-muted py-5">
                        Brak zadań do wyświetlenia...
                    </ListGroup.Item>
                    ) : (taskList.map((task) => (
                        <Task key={task.id} {...task} listId={listId} />
                    )))}
                </ListGroup>
                
                <Card.Footer className="text-muted small">
                    Ukończone: {taskList.filter(t => t.completed).length} / {taskList.length}
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default List