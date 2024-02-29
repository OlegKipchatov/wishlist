import {
  ChangeEvent, useEffect, useRef, useState,
} from 'react';

import { Button, Image } from '@nextui-org/react';
import CloudArrowUpIcon from '@heroicons/react/24/outline/CloudArrowUpIcon';

import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';
import { updateImageName } from '@/utils/card';

const MAX_SIZE = 2_097_152;

type Props = {
    cardImageName?: string,
    setImage: (newValue: File) => void,
};

export default function EditCardImage(props: Props) {
  const { cardImageName, setImage } = props;
  const [imageUrl, setImageUrl] = useState<string>();
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getPublicImageUrl = async (imageName: string) => {
      const supabase = supabaseWorker(createClient());
      const publicImageUrl = await supabase.storage.getPublicCardImageUrl(imageName);

      setImageUrl(publicImageUrl);
    };

    if (cardImageName) {
      getPublicImageUrl(cardImageName);
    }

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);

  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const userImage = e.currentTarget.files?.item(0) as File;
    if (userImage.size > MAX_SIZE) {
      return;
    }

    const imageBlobUrl = URL.createObjectURL(userImage);
    setImageUrl(imageBlobUrl);

    const imageName = imageBlobUrl.split('/').pop() as string;
    const cardImage = updateImageName(userImage, imageName);
    setImage(cardImage);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full md:w-auto mb-5 md:mb-0">
      { !imageUrl && (
        <Button
          as="label"
          htmlFor="dropzone-file"
          variant="light"
          className="flex flex-col items-center justify-center w-full max-w-64 h-64 border-2 border-dashed"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <CloudArrowUpIcon
              width={48}
              height={48}
              className="mb-2 text-gray-500"
            />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span>
              {' '}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX 2MB)</p>
          </div>
        </Button>
      ) }

      { imageUrl && (
        <Image
          isBlurred
          src={imageUrl}
          width={256}
          height={256}
          className="hover:cursor-pointer"
          onClick={() => inputFileRef.current?.click()}
        />
      ) }

      <input
        ref={inputFileRef}
        id="dropzone-file"
        type="file"
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        onChange={uploadImage}
      />
    </div>
  );
}
