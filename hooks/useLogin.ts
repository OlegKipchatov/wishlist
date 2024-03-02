import { useRef, useState } from 'react';

import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';

import { Status } from './types';

import { useDebouncedCallback } from 'use-debounce';

const loginValidReg = /^[A-Za-z][A-Za-z0-9]{4,}$/;

type LoginStatus = Status;

export default (userLogin = '') => {
  const [login, setLogin] = useState(userLogin);
  const [hasChangeLogin, setHasChangeLogin] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const loginStatus = useRef<LoginStatus>('');

  const checkValidLogin = (username: string) => {
    if (login === '') {
      setHasChangeLogin(false);
      loginStatus.current = '';
      setLoginErrorMessage('');
    } else if (!loginValidReg.test(username)) {
      loginStatus.current = 'error-format';
      setLoginErrorMessage('Min length 4 char and without specific chars');
    } else {
      loginStatus.current = 'approve-format';
      setLoginErrorMessage('');
    }
  };

  const checkLoginExist = useDebouncedCallback(async (username: string) => {
    if (loginStatus.current === 'approve-format') {
      const supabase = supabaseWorker(createClient());
      const isLoginExist = await supabase.users.isLoginExist(username);

      if (isLoginExist) {
        loginStatus.current = 'success';
        setLoginErrorMessage('');
      } else {
        loginStatus.current = 'error-exist';
        setLoginErrorMessage('User with this username already exist');
      }
    }
  }, 500);

  const updateLoginByEmail = (username: string) => {
    setLogin(username);
    checkValidLogin(username);
    checkLoginExist(username);
  };

  const updateLogin = (username: string) => {
    setHasChangeLogin(true);
    updateLoginByEmail(username);
  };

  return {
    login,
    hasChangeLogin,
    loginStatus,
    loginErrorMessage,
    updateLogin,
    updateLoginByEmail,
  };
};
