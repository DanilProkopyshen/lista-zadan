import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from '../firebase'
import { Spinner } from "react-bootstrap"
import NoAccountBody from "./NoAccountBody"
import AllTasks from "./AllTasks"
import { collection, doc, getDocs } from "firebase/firestore"
import NoAddedContentBody from "./NoAddedContentBody"

function MainBody() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [listsAdded, setListsAdded] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        const handleCheckLists = async () => {

            const userId = auth.currentUser.uid

            try {
                const docRef = doc(db, "users", userId)
                const subcollectionRef = collection(docRef, "lists")
                const querySnapshot = await getDocs(subcollectionRef)

                if (!querySnapshot.empty) {
                    setListsAdded(true)

                } else {
                    setListsAdded(false)

                }
            } catch(error) {
                setListsAdded(false)
                console.log("User hasnt added any content yet: ", error)
            }
        }

        handleCheckLists()

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
        if (listsAdded) { return (<AllTasks />) }
        else {return (
            <main className="main-body-container container-fluid vh-100 d-flex justify-content-center align-items-center pt-3">
                <NoAddedContentBody />
            </main>
        )} 
    }
}

export default MainBody