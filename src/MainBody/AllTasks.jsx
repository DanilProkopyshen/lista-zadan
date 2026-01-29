import { useEffect, useState } from "react"
import List from "../TaskLists/List"
import { collection, query, onSnapshot } from "firebase/firestore"
import { db, auth } from "../firebase"
import { Spinner } from "react-bootstrap"

function AllTasks() {
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const q = query(collection(db, "users", userId, "lists"))

    const unsubscribe = onSnapshot(
      q, (snapshot) => {
        const updatedLists = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })

        setLists(updatedLists)
        setLoading(false)
      },
      (error) => {
        console.error("Error in lists listener:", error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <main className="main-body-container container-fluid vh-100 d-flex justify-content-center align-items-start pt-3">
        <Spinner variant="light" animation="border" role="status">
          <span className="visually-hidden">Ładowanie...</span>
        </Spinner>
      </main>
    )
  }

  return (
    <main className="main-body-container container-fluid py-4 overflow-auto vh-100">
      <div className="row row-cols-1 row-cols-lg-3 g-3">
        {lists.map((list) => (
          <List
            key={list.id}
            listId={list.id}
            listName={list.name}
          />
        ))}
      </div>
    </main>
  )
}

export default AllTasks