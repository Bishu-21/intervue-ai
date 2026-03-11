import { BlobServiceClient } from '@azure/storage-blob';

export async function uploadResumeToBlob(fileBuffer: Buffer, fileName: string, contentType: string): Promise<string> {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    
    if (!connectionString) {
        throw new Error("AZURE_STORAGE_CONNECTION_STRING is not configured.");
    }

    // Connect to specific container according to instructions
    const containerName = "resumes";
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Create container if it doesn't exist
    await containerClient.createIfNotExists();

    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    // Upload data to the blob
    await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: { blobContentType: contentType }
    });

    return blockBlobClient.url;
}
