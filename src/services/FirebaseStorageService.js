import firebase from '../FirebaseConfig'

const storageRef = firebase.storage().ref();

const uploadFile = (file, fullFilePath, progressCallback) => {
    const updloadTask = storageRef.child(fullFilePath).put(file)

    updloadTask.on("state_changed", (snapshot) => {
        const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        progressCallback(progress)
    },
        (error) => {
            throw error;
        }
    );

    return updloadTask.then(async () => {
        const downloadUrl = await updloadTask.snapshot.ref.getDownloadURL();

        return downloadUrl;
    })
}

const deleteFile = (fileDownloadUrl) => {
    const decodedUrl = decodeURIComponent(fileDownloadUrl)
    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?");
    const filePath = decodedUrl.substring(startIndex, endIndex);

    return storageRef.child(filePath).delete();
}

const FirebaseStorageService = {
    uploadFile,
    deleteFile
}

export default FirebaseStorageService;