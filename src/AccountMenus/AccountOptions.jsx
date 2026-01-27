import { getAuth, signOut } from "firebase/auth"
import { Button } from "react-bootstrap"
import { toast } from "react-toastify"

function AccountOptions() {
    const handleLogout = async () => {
        const auth = getAuth()

        try {
        await signOut(auth)
            console.log("User signed out successfully")
            toast.success("Wylogowano pomyślnie.")
        } catch (error) {
            console.error("Error during sign out:", error)
            toast.error("Wystąpił błąd podczas wylogowywania.")
        }
    }

    return (
        <Button className="primary mt-4" onClick={handleLogout}>Wyloguj się</Button>
    )

}

export default AccountOptions