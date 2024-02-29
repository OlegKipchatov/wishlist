import { useCallback, useState } from 'react';

import {
  Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import { Card, ICard } from '@/supabase/types';

import EditCardImage from './EditCardImage';

type Props = {
  title: string,
  isShow: boolean,
  onClose: () => void,
  card?: ICard,
  onCard: (formData: Card) => void,
  type: 'add' | 'edit',
};

export default function EditCard(props: Props) {
  const {
    title, isShow, onClose, card, onCard, type,
  } = props;

  const formButtonText = type === 'edit' ? 'Edit Wish' : 'Add Wish';

  const [image, setImage] = useState<File>();

  const onFormAction = async (formData: FormData) => {
    const newCard: Card = {
      title: formData.get('title') as string,
      cost: Number(formData.get('cost')),
      link: formData.get('link') as string,
      time: new Date().toISOString(),
      image,
    };

    return onCard(newCard);
  };

  const setImageCallback = useCallback((newImage: File) => {
    setImage(newImage);
  }, []);

  return (
    <Modal
      isOpen={isShow}
      onClose={onClose}
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: 'md:max-w-4xl',
      }}
    >
      <ModalContent>
        <ModalHeader className="flex justify-between items-center">
          {title}
          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            startContent={<XMarkIcon height={20} />}
          />
        </ModalHeader>
        <ModalBody>
          <form
            action={onFormAction}
            className="flex flex-col md:justify-between md:flex-row gap-4"
          >
            <EditCardImage
              cardImageName={card?.image}
              setImage={setImageCallback}
            />

            <div className="flex flex-col gap-4 justify-between w-full">
              <div className="flex flex-col gap-4">
                <Input
                  name="link"
                  type="text"
                  label="Link to wish"
                  labelPlacement="outside"
                  placeholder="Paste link to the wish"
                  defaultValue={card?.link}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    name="titke"
                    type="text"
                    label="Wish"
                    labelPlacement="outside"
                    placeholder="Enter name your wish"
                    defaultValue={card?.title}
                  />

                  <Input
                    name="cost"
                    type="number"
                    label="Price"
                    labelPlacement="outside"
                    placeholder="Price of a wish"
                    defaultValue={card?.cost?.toString()}
                  />
                </div>
              </div>

            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            fullWidth
            color="default"
            variant="bordered"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            color="success"
            type="submit"
            formAction={onFormAction}
            className="text-white"
          >
            {formButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
