import { useCallback, useState } from 'react';

import { Button } from '@nextui-org/react';
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';
import { Card, ICard } from '@/supabase/types';

import RemoveCard from './RemoveCard';

import EditCard from '@/app/list/[login]/components/EditCard';

type Props = {
    card: ICard,
    userId: string,
}

export default function CardSettings(props: Props) {
  const { card, userId } = props;

  const [showRemove, setShowRemove] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const onCloseEditPopup = useCallback(() => {
    setShowEdit(() => false);
  }, []);

  const onCloseRemovePopup = useCallback(() => {
    setShowRemove(() => false);
  }, []);

  const onRemoveItem = async () => {
    const supabase = supabaseWorker(createClient());
    const isRemove = await supabase.items.removeItem(card);
    if (isRemove) {
      onCloseRemovePopup();
    }
  };

  const onEditCard = useCallback(async (newCard: Card) => {
    const supabase = supabaseWorker(createClient());
    const isEdited = await supabase.items.updateItem(card, newCard);
    if (isEdited) {
      onCloseEditPopup();
    }
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-end gap-2">
        <Button
          isIconOnly
          variant="light"
          onClick={() => setShowEdit(true)}
          startContent={<EditIcon height={20} />}
        />
        <Button
          isIconOnly
          variant="light"
          color="danger"
          onClick={() => setShowRemove(true)}
          startContent={<TrashIcon height={20} />}
        />
      </div>

      <RemoveCard
        isShow={showRemove}
        onClose={onCloseRemovePopup}
        onRemove={onRemoveItem}
        card={card}
        userId={userId}
      />

      <EditCard
        title="Edit item"
        isShow={showEdit}
        onClose={onCloseEditPopup}
        card={card}
        onCard={onEditCard}
        type="edit"
      />
    </>
  );
}
