import { useState, useEffect, startTransition } from 'react'
import './Admin.css'
import FirebaseAuthService from '../../services/FirebaseAuthService'
import FirebaseFirestoreService from '../../services/FirebaseFirestoreService'
// import FirebaseAuthService from '../FirebaseAuthService'
import localPhotoCollection from '../../sample_data/localPhotoCollection'
import AddEditPhotoForm from '../AddEditPhotoForm/AddEditPhotoForm'
// import AddEditPhotoForm from 

const Admin = ({ admin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [photoCollection, setPhotoCollection] = useState([])
    const [isAddingNewPhoto, setIsAddingNewPhoto] = useState(false)
    const [photoInFocus, setPhotoInFocus] = useState(null)

    useEffect(() => {

        // fetchPhotos('test')
        //     .then((fetchedPhotos) => {
        //         setPhotoCollection(fetchedPhotos)
        //     })
        fetchPhotos()
            .then((fetchedPhotos) => {
                setPhotoCollection(orderPhotos(fetchedPhotos))
            })
            .catch((error) => {
                console.error(error.message)
                throw error
            })
    }, [])

    const AddNewPhotoForm = () => {
        return (
            <>
                <label htmlFor="uploadImage">
                    {/* Upload Image: */}
                    <input
                        type='file'
                        accept='image/*'
                    // onChange={handleFileChanged}
                    // ref={fileInputRef}
                    // hidden={uploadProgress > -1 || imageUrl}
                    />
                </label>
            </>
        )
    }

    const DisplayPhotos = () => {
        return (
            <>
                {
                    photoCollection.length === 0 ? (
                        <>
                            <p>There are no photos in the database</p>
                            <button className='btn btn-primary' onClick={() => {setIsAddingNewPhoto(true); setPhotoInFocus(null); }}>Add new photo</button>
                        </>
                    )
                        :
                        (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
                                {
                                    photoCollection.map((photo) => (

                                        <div className="photo-card" onClick={() => handleEditPhotoClick(photo.id)}>
                                            <img src={photo.imageUrl} alt={photo.name} className='img-fluid' />
                                            <div>{photo.name}</div>
                                            <div>{photo.displayOrder}</div>
                                        </div>


                                    ))
                                }
                            </div>

                        )
                }
            </>
        )
    }

    return (
        <div className='login-form-container' style={{ marginTop: '270px' }}>
            {
                admin ? (
                    <>
                        <h1>Admin Panel </h1>
                        <div className='row'>
                            <div className="col-8"></div>
                            <div className="col">
                                <div className="d-flex">
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
                                <br />
                                <button className='btn btn-success' onClick={() => {setIsAddingNewPhoto(true); setPhotoInFocus(null);}}>Add new photo</button>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col">
                                {
                                    !isAddingNewPhoto ?
                                        (
                                            <DisplayPhotos />
                                        ) : (
                                            <>

                                                 <AddEditPhotoForm
                                                    existingPhoto={photoInFocus}
                                                    handleAddPhoto={handleAddPhoto}
                                                    handleUpdatePhoto={handleUpdatePhoto}
                                                    handleEditRecipeCancel={handleEditRecipeCancel}
                                                    handleDeletePhoto={handleDeletePhoto}
                                                /> 
                                                <button className='btn btn-primary mt-2' onClick={() => setIsAddingNewPhoto(false)}>Cancel</button>

                                                <DisplayPhotos />

                                                
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

                            <button onClick={handleLogin} className='btn btn-primary' type='button'>Login</button>
                            {/* <button onClick={handleSendResetPasswordEmail} className='primary-button' type='button'>Reset Password</button> */}
                            {/* <button onClick={handleLoginWithGoogle} className='primary-button' type='button'>Login with Google</button> */}
                        </div>
                    </form>
            }

        </div>
    )

    function orderPhotos(arr){
        return arr.sort((a, b) => a.displayOrder - b.displayOrder);
      
      }

    //Register User:
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

    async function fetchPhotos(test) {
        let fetchedPhotos = [];
        if (test !== 'test') {


            const response = await FirebaseFirestoreService.readDocuments({ collection: 'Photos' })

            try {
                const myPhotos = response.docs.map((photoDoc) => {
                    const id = photoDoc.id;
                    const data = photoDoc.data();

                    return { ...data, id }
                })

                fetchedPhotos = [...myPhotos]
            } catch (error) {
                console.log(error.message)
                throw error
            }
        } else {
            fetchedPhotos = localPhotoCollection
        }

        return fetchedPhotos;
    }

    //The following function is called manually whenever a new photo is sucessfully added. Display new results. 
  //The original fetchPhotos is called via useState() whenever a new user logs in.
  async function handleFetchPhotos() {
    try {
      const fetchedPhotos = await fetchPhotos();

      setPhotoCollection(fetchedPhotos)

    } catch (error) {

      console.error(error.message)
      throw error;

    }
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

    async function handleAddPhoto(newPhoto) {
        
        try {
    
          const response = await FirebaseFirestoreService.createDocument('Photos', newPhoto);
    
          handleFetchPhotos();
    
          alert(`Sucessfully created a photo with an ID = ${response.id}`)
        } catch (error) {
    
          alert(error.message);
    
        }
      }

      async function handleUpdatePhoto(newPhoto, photoId) {
        try {
          await FirebaseFirestoreService.updateDocument(
            'Photos',
            photoId,
            newPhoto
          );
    
          handleFetchPhotos();
    
          alert(`Successfully updated a photo with an ID = ${photoId}`);
        //   setCurrentRecipe(null);
        setPhotoInFocus(null)
    
        } catch (error) {
          alert(error.message)
          throw error;
        }
      }

      async function handleDeletePhoto(photoId) {
        const deleteConfirmation = window.confirm("Are you sure you want to delete this recipe? Ok for Yes, Cancel for No")
    
        if (deleteConfirmation) {
          try {
            await FirebaseFirestoreService.deleteDocument("Photos", photoId);
    
            handleFetchPhotos()
    
            // setCurrentRecipe(null)

            setPhotoInFocus(null)
    
            // window.scrollTo(0, 0)
    
            alert(`Successfully deleted photo with an ID = ${photoId}`)
    
          } catch (error) {
            alert(error.message)
            throw error;
          }
        }
    
      }
      function handleEditPhotoClick(photoId) {
        
        console.log(photoId)
        const selectedPhoto = photoCollection.find((photo) => {
          return photo.id === photoId
        })
    
        if (selectedPhoto) {
          startTransition(() => {
            setIsAddingNewPhoto(true)
            setPhotoInFocus(selectedPhoto)
          });
    
        //window.scrollTo(0, document.body.scrollHeight)
          window.scrollTo(0, 0)
        }
      }

      function handleEditRecipeCancel(){
        setPhotoInFocus(null)
      }

}

export default Admin;


