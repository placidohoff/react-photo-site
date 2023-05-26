import { useState, useEffect } from 'react'
import './Admin.css'
import FirebaseAuthService from '../../services/FirebaseAuthService'
import FirebaseFirestoreService from '../../services/FirebaseFirestoreService'
// import FirebaseAuthService from '../FirebaseAuthService'

const Admin = ({ admin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [photoCollection, setPhotoCollection] = useState([])
    const [isAddingNewPhoto, setIsAddingNewPhoto] = useState(false)

    useEffect(() => {

        fetchPhotos()
            .then((fetchedPhotos) => {
                setPhotoCollection(fetchedPhotos)
            })
            .catch((error) => {
                console.error(error.message)
                throw error
            })
    }, [])

    return (
        <div className='login-form-container' style={{ marginTop: '270px' }}>
            {
                admin ? (
                    <>
                        <div className='row'>
                            <div className="col-8"></div>
                            <div className="col d-flex">
                                <h3>Welcome, {admin.email}</h3>
                                <button
                                    type='button'
                                    className='btn btn-primary col-2'
                                    onClick={handleLogout}
                                    style={{ margin: 'auto' }}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {
                                    !isAddingNewPhoto ?
                                        (
                                            <>
                                                <h1>Admin Panel </h1>
                                                {console.log(photoCollection)}
                                                {
                                                    photoCollection.length === 0 && (
                                                        <>
                                                            <p>There are no photos in the database</p>
                                                            <button className='btn btn-primary' onClick={() => setIsAddingNewPhoto(true)}>Add new photo</button>
                                                        </>
                                                    )
                                                }
                                            </>
                                        ) : (
                                            <>
                                                <p>Add new photo form!</p>
                                                <button className='btn btn-primary' onClick={() => setIsAddingNewPhoto(false)}>Cancel</button>

                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </>
                )
                    :
                    <form onSubmit={handleSubmit} className='login-form' style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: 'auto' }}>
                        <label className='input-label login-label'>
                            Username (email):
                            <input
                                type='email'
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='input-text'
                            />
                        </label>
                        <br />
                        <label className='input-label login-label'>
                            Password:
                            <input
                                type='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='input-text'
                            />
                        </label>
                        <div className='button-box'>
                            {/* <button className='primary-button' type='submit'>Register</button> */}
                            <button onClick={handleLogin} className='btn btn-primary' type='button'>Login</button>
                            {/* <button onClick={handleSendResetPasswordEmail} className='primary-button' type='button'>Reset Password</button> */}
                            {/* <button onClick={handleLoginWithGoogle} className='primary-button' type='button'>Login with Google</button> */}
                        </div>
                    </form>
            }

        </div>
    )

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await FirebaseAuthService.registerUser(username, password)
            // await FirebaseAuthService.loginUser(username, password)
            setUsername("")
            setPassword("")

        } catch (error) {
            alert(error.message)
        }
    }

    function handleLogout() {
        FirebaseAuthService.logoutUser();
    }

    async function handleLogin() {
        try {
            await FirebaseAuthService.loginUser(username, password)
            setUsername("")
            setPassword("")

        } catch (error) {
            alert(error.message)
        }
    }

    async function handleRegister() {
        try {
            await FirebaseAuthService.registerUser(username, password)
            setUsername("")
            setPassword("")

        } catch (error) {
            alert(error.message)
        }
    }

    async function fetchPhotos() {
        let fetchedPhotos = [];

        const response = await FirebaseFirestoreService.readDocuments({ collection: 'Photos' })

        try {
            const myPhotos = response.docs.map((photoDoc) => {
                const id = photoDoc.id;
                const data = photoDoc.data();

                return { ...data, id }
            })

            fetchPhotos = [...myPhotos]
        } catch (error) {
            console.log(error.message)
            throw error
        }

        return fetchPhotos;
    }

    // async function handleSendResetPasswordEmail() {
    //     if (!username) {
    //         alert('Missing username')
    //         return
    //     }

    //     try {
    //         await FirebaseAuthService.sendPasswordResetEmail(username)
    //         alert("Sent the password and reset email")
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

}

export default Admin;


