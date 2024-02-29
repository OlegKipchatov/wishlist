import {
  Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

import { ICard } from '@/supabase/types';

import WishItem from './Card/WishItem';

type Props = {
  isShow: boolean,
  onClose: () => void,
  onRemove: () => void,
  card: ICard,
  userId: string,
};

export default function RemoveCard(props: Props) {
  const {
    isShow, onClose, onRemove, card, userId,
  } = props;

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
          Remove Wish
          <Button
            isIconOnly
            variant="light"
            onClick={onClose}
            startContent={<XMarkIcon height={20} />}
          />
        </ModalHeader>
        <ModalBody>
          <WishItem
            card={card}
            userId={userId}
          />
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
            color="danger"
            type="submit"
            formAction={onRemove}
            className="text-white"
          >
            Remove Wish
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
