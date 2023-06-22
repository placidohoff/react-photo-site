import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import FirebaseStorageService from '../../services/FirebaseStorageService'

const ImageUploadPreview = ({
    basePath,
    existingImageUrl,
    handleUploadFinish,
    handleUploadCancel
}) => {
    const [uploadProgress, setUploadProgress] = useState(-1)
    const [imageUrl, setImageUrl] = useState('')
    const fileInputRef = useRef();

    useEffect(() => {
        if (existingImageUrl) {
            setImageUrl(existingImageUrl)
        } else {
            setUploadProgress(-1)
            setImageUrl('')
            fileInputRef.current.value = null
        }
    }, [existingImageUrl])

    async function handleFileChanged(event) {
        const files = event.target.files
        const file = files[0]

        if (!file) {
            alert("File select failed.")
            return;
        }

        const generatedFileId = uuidv4();

        try {
            const downloadUrl = await FirebaseStorageService.uploadFile(
                file,
                `${basePath}/${generatedFileId}`,
                setUploadProgress
            );

            setImageUrl(downloadUrl)
            handleUploadFinish(downloadUrl)
        } catch (error) {
            setUploadProgress(-1)
            fileInputRef.current.value = null;
            alert(error.message)
            throw error;
        }
    }

    function handleCancelImageClick() {
        //We delete the image because as soon as we first click an image it begins uploading to our bucket before we hit submit on the entire recipe we are editing
        FirebaseStorageService.deleteFile(imageUrl)

        fileInputRef.current.value = null
        setImageUrl('')
        setUploadProgress(-1)
        handleUploadCancel()
    }

    return (
        <div className="image-upload-preview-container">
            <input
                type='file'
                accept='image/*'
                onChange={handleFileChanged}
                ref={fileInputRef}
                hidden={uploadProgress > -1 || imageUrl}
            />
            {
                !imageUrl && uploadProgress > -1 &&
                (
                    <div>
                        <label htmlFor='file'>Upload Progress:</label>
                        <progress id='file' value={uploadProgress} max='100'>
                            {uploadProgress}%
                        </progress>
                        <span>{uploadProgress}%</span>
                    </div>
                )
            }
            {
                imageUrl && (
                    <div className='image-preview'>
                        <img src={imageUrl} alt={imageUrl} className='image img-fluid' />
                        <button
                            type='button'
                            onClick={handleCancelImageClick}
                            className='btn btn-danger mt-2'
                        >
                            Remove Image

                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ImageUploadPreview;