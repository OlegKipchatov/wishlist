import { useEffect, useRef, useState } from 'react';

import { createClient } from '@/supabase/client';
import { supabaseWorker } from '@/supabase/requests';

import { Status } from './types';

import { useDebouncedCallback } from 'use-debounce';

// eslint-disable-next-line max-len, no-useless-escape
const emailValidReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type EmailStatus = Status;

export default (userEmail = '') => {
  const [email, setEmail] = useState(userEmail);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const emailStatus = useRef<EmailStatus>('');

  const checkEmailValid = useDebouncedCallback(() => {
    if (email === '') {
      emailStatus.current = '';
      setEmailErrorMessage('');
    } else if (emailValidReg.test(email)) {
      emailStatus.current = 'approve-format';
      setEmailErrorMessage('');
    } else {
      emailStatus.current = 'error-format';
      setEmailErrorMessage('Invalid email format. Examaple: login@mail.com');
    }
  }, 500);

  const checkEmailExist = useDebouncedCallback(async () => {
    if (emailStatus.current === 'approve-format') {
      const supabase = supabaseWorker(createClient());
      const isEmailExist = await supabase.users.isEmailExist(email);

      if (isEmailExist) {
        emailStatus.current = 'success';
        setEmailErrorMessage('');
      } else {
        emailStatus.current = 'error-exist';
        setEmailErrorMessage('User with this email already exist');
      }
    }
  }, 500);

  useEffect(() => {
    checkEmailValid();
    checkEmailExist();
  }, [email]);

  return { emailStatus, emailErrorMessage, setEmail };
};
