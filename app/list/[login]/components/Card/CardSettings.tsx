import { useCallback, useState } from 'react';

import { Button } from '@nextui-org/react';
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

import { cardsSlice, useDispatch } from '@/store/redux';
import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';
import { Card, ICard } from '@/supabase/types';

import EditCard from '../EditCard';
import RemoveCard from '../RemoveCard';

type Props = {
    card: ICard,
    userId: string,
}

export default function CardSettings(props: Props) {
  const { card, userId } = props;

  const [showRemove, setShowRemove] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();

  const onCloseEditPopup = useCallback(() => {
    setShowEdit(() => false);
  }, []);

  const onCloseRemovePopup = useCallback(() => {
    setShowRemove(() => false);
  }, []);

  const onRemoveItem = useCallback(async () => {
    const supabase = supabaseWorker(createClient());
    const isRemove = await supabase.items.removeItem(card);
    if (isRemove) {
      dispatch(cardsSlice.actions.removeCard(card.id));
      onCloseRemovePopup();
    }
  }, []);

  const onEditCard = useCallback(async (newCard: Card) => {
    const supabase = supabaseWorker(createClient());
    const editCard = await supabase.items.updateItem(card, newCard);
    if (editCard) {
      dispatch(cardsSlice.actions.updateCard(editCard));
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
