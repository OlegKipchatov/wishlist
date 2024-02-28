/* eslint-disable no-shadow */

'use client';

import {
  Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
} from '@nextui-org/react';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon';

type Props = {
    title: string,
    show: boolean,
    onClose: () => void,
    children: any,
}

export default function Popup(props: Props) {
  const {
    show, title, onClose, children,
  } = props;

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      backdrop="blur"
      hideCloseButton
      classNames={{
        base: 'md:max-w-4xl',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
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
              {children}
            </ModalBody>
            <ModalFooter />
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
