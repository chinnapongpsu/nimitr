import { BlobServiceClient } from '@azure/storage-blob'
import { v1 as uuid } from 'uuid'

const sasToken = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN
const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_RESOURCE_NAME

export const isStorageConfigured = () => (!(!storageAccountName || !sasToken))

const createBlobInContainer = async (file, containerType = 'modal') => {
  try {
    // create blobClient for container
    const containerAzure = process.env.REACT_APP_CONTAINER_AZURE
    const containerName = `${containerType}-${containerAzure}`
    const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
    // console.log(uploadUrl);

    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(uploadUrl)

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName)
    let type = 'glb' // Default type
    if (file.type) {
      type = file.type.replace(/^[a-zA-Z]+\//g, '')
    }
    const name = uuid()
    console.log('filename', file.name, file.type)
    const blobClient = containerClient.getBlockBlobClient(`${name}.${type}`)

    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } }

    // upload file
    await blobClient.uploadData(file, options)
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}.${type}`
  } catch (e) {
    console.error(e)
  }
}
// </snippet_createBlobInContainer>

const deleteBlob = async (blobUrl) => {
  try {
    const uploadUrlParts = blobUrl.split('/')
    const containerName = uploadUrlParts[3]
    const blobName = uploadUrlParts.slice(4).join('/').split('?')[0]

    const blobService = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net/?${sasToken}`)
    const containerClient = blobService.getContainerClient(containerName)
    const blobClient = containerClient.getBlockBlobClient(blobName)

    await blobClient.delete()

    console.log(`Blob '${blobName}' deleted successfully.`)
  } catch (error) {
    console.error(`An error occurred while deleting the blob: ${error}`)
  }
}

// <snippet_uploadFileToBlob>
const uploadFileToBlob = async (file, containerType = 'modal') => {
  if (!file) return

  // upload file
  const response = await createBlobInContainer(file, containerType)
  return response
}
// </snippet_uploadFileToBlob>

export default uploadFileToBlob
export { deleteBlob }
