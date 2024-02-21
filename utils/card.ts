export type CardBlobImage = {
    blobUrl: string,
    imageType: string,
}

export const updateImageName = (image: File, newName: string) => {
    const newImage = new File([image], newName, { type: image.type });
    return newImage;
}
