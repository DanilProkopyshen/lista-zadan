import { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'
import RegisterModal from './RegisterModal'
import AccountOptions from './AccountOptions'
import LoginModal from './LoginModal'

function AuthOptions() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });

        return () => unsubscribe()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {user ? (
                <>
                    <div>Witaj {user.email}!</div>
                    <AccountOptions />
                </>
            ) : (
                
                <>
                    <RegisterModal />
                    <LoginModal />
                </>
            )}
        </div>
    )
}

export default AuthOptions