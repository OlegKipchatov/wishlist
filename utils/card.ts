export const getImageByBlob = async (blobUrl: string, type: string): Promise<File> => {
    const blob = await fetch(blobUrl).then(r => r.blob());
    
    const imageName = blobUrl.split('/').pop() as string;
    const image = new File([blob], imageName, { type: type });
    return image;
}
