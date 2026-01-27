import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from '../firebase'
import { Card, Spinner } from "react-bootstrap"
import NoAccountBody from "./NoAccountBody"
import AllTasks from "./AllTasks"

function MainBody() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <main className="main-body-container container-fluid vh-100">
                <div className="container text-center mt-3">
                    <div className="row align-items-center">
                        <div className="col">
                            <Card className="text-center p-5 m-5">
                                <Spinner animation="border" role="status" className="mb-3">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <Card.Body>
                                    <Card.Text>Sprawdzanie stanu logowania...</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
    return (
    <>
        { user ? (
            <AllTasks />
        ) : (
            <main className="main-body-container container-fluid vh-100 d-flex justify-content-center align-items-start pt-3">
                <NoAccountBody />
            </main>
        )}
    </>
      
  )
}

export default MainBody