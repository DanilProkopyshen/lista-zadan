import { useEffect, useState } from "react"
import Task from "./Task"

function List() {
    const [taskList, setTasks] = useState([])

    useEffect(() => {
        const initialTasks = [
      { id: 1,  title: "Zadanie 1",  desc: "Opis zadania",                completed: false },
      { id: 2,  title: "Zadanie 2",  desc: "Przygotować prezentację",     completed: true  },
      { id: 3,  title: "Zadanie 3",  desc: "Zaktualizować dokumentację",  completed: false },
      { id: 4,  title: "Zadanie 4",  desc: "Rozwiązać problem z API",     completed: false },
      { id: 5,  title: "Zadanie 5",  desc: "Przetestować formularz",      completed: true  },
      { id: 6,  title: "Zadanie 6",  desc: "Dodać walidację danych",      completed: false },
      { id: 7,  title: "Zadanie 7",  desc: "Zoptymalizować wydajność",    completed: false },
      { id: 8,  title: "Zadanie 8",  desc: "Przygotować demo",            completed: true  },
      { id: 9,  title: "Zadanie 9",  desc: "Napisać testy jednostkowe",   completed: false },
      { id: 10, title: "Zadanie 10", desc: "Wdrożyć na serwer",           completed: true  },
    ];

    setTasks(initialTasks); 
    }, [])

    return (
        <div className="container-sm d-inline-flex flex-wrap bg-green-400 mb-2">
            {taskList.map(task => <Task key={task.id} {...task} />)}
        </div>
    )
}
export default List