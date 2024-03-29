'use client';

import { useCallback, useState } from 'react';

import { Button } from '@nextui-org/react';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

import { cardsSlice, useDispatch } from '@/store/redux';
import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';
import { Card } from '@/supabase/types';

import EditCard from '../EditCard';

export default function AddCard() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const dispatch = useDispatch();

  const onTogglePopup = useCallback(() => {
    setShowAddPopup((show) => !show);
  }, []);

  const onAddCard = useCallback(async (card: Card) => {
    const supabase = supabaseWorker(createClient());

    const newCard = await supabase.items.setItem(card);
    if (newCard) {
      dispatch(cardsSlice.actions.addCard(newCard));
    }

    onTogglePopup();
  }, []);

  return (
    <>
      {/* eslint-disable max-len */}
      <div className="z-20 fixed bottom-0 sm:relative flex justify-center ml-auto left-0 right-0 sm:ml-0 h-24 sm:h-auto">
        <Button
          onClick={onTogglePopup}
          className="fixed h-unit-20 w-unit-20 rounded-full sm:relative sm:h-unit-12 sm:rounded-lg sm:w-full text-white"
          color="primary"
          variant="shadow"
          startContent={(
            <PlusIcon
              height={24}
              strokeWidth={3}
              className="stroke-[4px] sm:stroke-[3px]"
            />
          )}
        />
      </div>

      <EditCard
        title="Add Wish"
        type="add"
        isShow={showAddPopup}
        onClose={onTogglePopup}
        onCard={onAddCard}
      />
    </>
  );
}
