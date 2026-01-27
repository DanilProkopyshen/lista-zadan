import { useEffect, useState } from "react";
import { Card, ListGroup, Container, Badge } from "react-bootstrap";
import Task from "./Task";

function List() {
const [taskList, setTasks] = useState([]);

useEffect(() => {
const initialTasks = [
    { id: 1,  title: "Zadanie 1",  desc: "Opis zadania",                 completed: false },
    { id: 2,  title: "Zadanie 2",  desc: "Przygotować prezentację",      completed: true  },
    { id: 3,  title: "Zadanie 3",  desc: "Zaktualizować dokumentację",   completed: false },
    { id: 4,  title: "Zadanie 4",  desc: "Rozwiązać problem z API",      completed: false },
    { id: 5,  title: "Zadanie 5",  desc: "Przetestować formularz",       completed: true  },
    { id: 6,  title: "Zadanie 6",  desc: "Dodać walidację danych",       completed: false },
    { id: 7,  title: "Zadanie 7",  desc: "Zoptymalizować wydajność",     completed: false },
    { id: 8,  title: "Zadanie 8",  desc: "Przygotować demo",             completed: true  },
    { id: 9,  title: "Zadanie 9",  desc: "Napisać testy jednostkowe",    completed: false },
    { id: 10, title: "Zadanie 10", desc: "Wdrożyć na serwer",            completed: true  },
];

setTasks(initialTasks);
}, []);

return (
<Container className="py-4">
    <Card className="shadow-sm border-0">
    <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Lista</h4>
        <Badge bg="light" text="dark" className="fs-6">
        {taskList.length} zadań
        </Badge>
    </Card.Header>

    <ListGroup variant="flush">
        {taskList.length === 0 ? (
        <ListGroup.Item className="text-center text-muted py-5">
            Brak zadań do wyświetlenia...
        </ListGroup.Item>
        ) : (
        taskList.map((task) => (
            <Task key={task.id} {...task} />
        ))
        )}
    </ListGroup>
    
    <Card.Footer className="text-muted small">
        Zrobione: {taskList.filter(t => t.completed).length} / {taskList.length}
    </Card.Footer>
    </Card>
</Container>
);
}

export default List