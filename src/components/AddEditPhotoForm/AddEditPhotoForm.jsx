import { useState, useEffect } from "react"
import ImageUploadPreview from "../ImageUploadPreview/ImageUploadPreview"

const AddEditPhotoForm = ({ existingPhoto, handleAddPhoto, handleUpdatePhoto }) => {
    const [imageUrl, setImageUrl] = useState('')
    const [size, setSize] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [displayOrder, setDisplayOrder] = useState(null)

    useEffect(() => {
        if (existingPhoto) {
            setName(existingPhoto.name);
            setSize(existingPhoto.size)
            setType(existingPhoto.type)
            setImageUrl(existingPhoto.imageUrl)
            setDisplayOrder(existingPhoto.displayOrder)
        } else {
            resetForm();
        }

    }, [existingPhoto])

    function handlePhotoFormSubmit(e) {
        e.preventDefault();

        if(!imageUrl){
            alert("Please provide an image")
            return
        }

        const newPhoto = {
            name,
            size,
            type,
            imageUrl,
            displayOrder
        };

        if (existingPhoto) {
            handleUpdatePhoto(newPhoto, existingPhoto.id)
        } else {
            handleAddPhoto(newPhoto);
        }

        resetForm();
    }

    function resetForm(){
        setName('')
        setSize('')
        setType('')
        setImageUrl('')
        setDisplayOrder(null)
    }

    return (
        <form onSubmit={handlePhotoFormSubmit}>
            {
                existingPhoto ? <h2>Update the Photo</h2> : <h2>Add a new Photo</h2>
            }
            <div className="fields" style={{width:'50%', margin:'auto', border: '1px solid black', padding:'10px'}}>
                <div className='image-input-box'>
                    <ImageUploadPreview
                        basePath='photos'
                        existingImageUrl={imageUrl}
                        handleUploadFinish={(downloadUrl) => setImageUrl(downloadUrl)}
                        handleUploadCancel={() => setImageUrl('')}
                    />
                </div>
                <label className='recipe-label input-label'>
                    Name:
                    <input
                        type='text'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='input-text'
                    />
                </label>
                <label className='recipe-label input-label'>
                    Size:
                    <select value={size}
                        onChange={e => setSize(e.target.value)}
                        className='select input-text'
                        required
                    >
                        <option value={''}></option>
                        <option value={'small'}>Small</option>
                        <option value={'normal'}>Normal</option>
                        <option value={'larger'}>Larger</option>
                    </select>
                </label>
                <label className='recipe-label input-label'>
                    Photo Type:
                    <select value={type}
                        onChange={e => setType(e.target.value)}
                        className='select input-text'
                        required
                    >
                        <option value={''}></option>
                        <option value={'wedding'}>Wedding</option>
                        <option value={'other'}>Other</option>
                    </select>
                </label>
                <label className='recipe-label input-label'>
                    Display Order:
                    <input
                        type='number'
                        required
                        value={displayOrder}
                        onChange={(e) => setDisplayOrder(e.target.value)}
                        className='input-text'
                        step={0.1}
                    />
                </label>
                <button type='submit' className='primary-button action-button mt-3'>
                    {
                        existingPhoto ? "Update Photo" : "Create Photo"
                    }
                </button>
            </div>

        </form>
    )
}

export default AddEditPhotoForm