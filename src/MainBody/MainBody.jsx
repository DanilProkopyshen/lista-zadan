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
            <main className="main-body-container container-fluid vh-100 d-flex justify-content-center align-items-start pt-3">
                <Spinner animation="border" role="status" variant="light">
                    <span className="visually-hidden">Ładowanie...</span>
                </Spinner>
            </main>
        )
    }

    else if (!loading && !user) {return (
        <main className="main-body-container container-fluid vh-100 d-flex justify-content-center align-items-center pt-3">
            <NoAccountBody />
        </main>
    )}


    else if (!loading && user) {
        return (
            <AllTasks />
        )
        
    }
}

export default MainBody