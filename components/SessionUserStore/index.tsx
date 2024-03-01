'use client';

import { useEffect } from 'react';

import { Providers } from '@/store/providers';
import { sessionUserSlice, useDispatch } from '@/store/redux';
import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';

function SessionUser() {
  const supabase = supabaseWorker(createClient());
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.users.getSessionUser()
      .then((user) => {
        if (user) {
          dispatch(sessionUserSlice.actions.setUser(user));
        }
      });

    return () => {
      dispatch(sessionUserSlice.actions.clear());
    };
  });

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
}

export default function SessionUserStore() {
  return (
    <Providers>
      <SessionUser />
    </Providers>
  );
}
