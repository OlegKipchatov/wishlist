'use client';

import { useCallback, useState } from 'react';

import { Button } from '@nextui-org/react';
import PlusIcon from '@heroicons/react/24/outline/PlusIcon';

import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';
import { Card } from '@/supabase/types';

import EditCard from './EditCard';

export default function AddCard() {
  const [showAddPopup, setShowAddPopup] = useState(false);

  const onShowPopup = useCallback(() => {
    setShowAddPopup(() => true);
  }, []);

  const onClosePopup = useCallback(() => {
    setShowAddPopup(() => false);
  }, []);

  const onAddCard = useCallback(async (card: Card) => {
    const supabase = supabaseWorker(createClient());
    const isAddCard = await supabase.items.setItem(card);
    if (isAddCard) {
      // TODO: Add error message
    }

    onClosePopup();
  }, []);

  return (
    <>
      {/* eslint-disable max-len */}
      <div className="z-20 fixed bottom-8 sm:relative sm:bottom-0 flex justify-center ml-auto left-0 right-0 sm:ml-0 h-24 sm:h-auto">
        <Button
          onClick={onShowPopup}
          className="fixed h-unit-20 w-unit-20 rounded-full sm:relative sm:h-unit-12 sm:rounded-lg sm:w-full text-white"
          color="primary"
          variant="solid"
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
        title="Add item"
        type="add"
        isShow={showAddPopup}
        onClose={onClosePopup}
        onCard={onAddCard}
      />
    </>
  );
}
