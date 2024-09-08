// import { Container } from '@mui/material'
// import React, { useState, useEffect } from 'react'

// import uploadFileToBlob, { isStorageConfigured, getBlobsInContainer } from '../component/azure-storage-blob'
// import DisplayImagesFromContainer from '../component/contain-img-azure'

// const storageConfigured = isStorageConfigured()

// const AzurePageTest = () => {
//   // all blobs in container
//   const [blobList, setBlobList] = useState([])

//   // current file to upload into container
//   const [fileSelected, setFileSelected] = useState()
//   const [fileUploaded, setFileUploaded] = useState('')

//   // UI/form management
//   const [uploading, setUploading] = useState(false)
//   const [inputKey, setInputKey] = useState(Math.random().toString(36))

//   // *** GET FILES IN CONTAINER ***
//   useEffect(() => {
//     getBlobsInContainer().then((list) => {
//       // prepare UI for results
//       setBlobList(list)
//     })
//   }, [fileUploaded])

//   const onFileChange = (event) => {
//     // capture file into state
//     (event.target.filesetFileSelecteds[0])
//   }

//   const onFileUpload = async () => {
//     if (fileSelected && fileSelected?.name) {
//     // prepare UI
//       setUploading(true)

//       // *** UPLOAD TO AZURE STORAGE ***
//       const response = await uploadFileToBlob(fileSelected)
//       console.log('response1', response)
//       // reset state/form
//       setFileSelected(null)
//       setFileUploaded(fileSelected.name)
//       setUploading(false)
//       setInputKey(Math.random().toString(36))
//     }
//   }

//   // display form
//   const DisplayForm = () => (
//     <div>
//       <input type="file" onChange={onFileChange} key={inputKey || ''} />
//       <button type="submit" onClick={onFileUpload}>
//         Upload!
//       </button>
//     </div>
//   )

//   return (
//     <Container>
//       <div>
//         <h1>Upload file to Azure Blob Storage</h1>
//         {storageConfigured && !uploading && DisplayForm()}
//         {storageConfigured && uploading && <div>Uploading</div>}
//         <hr />
//         {storageConfigured && blobList.length > 0 && <DisplayImagesFromContainer blobList={blobList} />}
//         {!storageConfigured && <div>Storage is not configured.</div>}
//       </div>
//     </Container>
//   )
// }

// export default AzurePageTest
