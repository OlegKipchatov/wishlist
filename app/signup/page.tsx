'use client'

import { ChangeEvent, useRef, useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import MailIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import ArrowIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import { useDebouncedCallback } from 'use-debounce';
import { supabaseWorker } from "@/supabase/requests";
import { createClient } from "@/supabase/client";
import { redirect } from "next/navigation";

const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type EmailStatus = '' | 'error-format' | 'email-exist' | 'loading' | 'approve-format' | 'success';

export default function Login() {
  const [login, setLogin] = useState('');
  const [hasChangeLogin, setHasChangeLogin] = useState(false);

  const emailStatus = useRef<EmailStatus>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [authError, setAuthError] = useState('');

  const signUp = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const login = formData.get("login") as string;

    debugger;

    setAuthError(email + password + login);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          login,
          email,
        }
      },
    });

    if (error) {
      setAuthError(error.message)
      return;
    }

    return redirect(`/list/${login}`);
  };

  const checkEmailExist = useDebouncedCallback(async (email: string) => {
    if(emailStatus.current === 'approve-format') {
      emailStatus.current = 'loading';
      const supabase = supabaseWorker(createClient());
      const isEmailExist = await supabase.users.isEmailExist(email);

      if(isEmailExist) {
        emailStatus.current = 'success';
        setEmailErrorMessage('');
      } else {
        emailStatus.current = 'email-exist';
        setEmailErrorMessage('User with this email already exist');
      }
    }
  }, 700);

  const validateEmail = useDebouncedCallback((email: string) => {
    if(email === '') {
      emailStatus.current = '';
      setEmailErrorMessage('');
    } else if(emailReg.test(email)) {
      emailStatus.current = 'approve-format';
      setEmailErrorMessage('');
    }else {
      emailStatus.current = 'error-format'
      setEmailErrorMessage('Invalid email format. Examaple: login@mail.com');
    }
  }, 500);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if(!hasChangeLogin) {
      const emailLogin = email.split('@')[0];
      setLogin(emailLogin);
    }

    validateEmail(email);
    checkEmailExist(email);
  }

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setHasChangeLogin(true);

    const userLogin = e.target.value;
    setLogin(() => userLogin);

    if(userLogin === '') {
      setHasChangeLogin(false);
    }
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    const isShortPassword = password.length !== 0 && password.length < 8;
    setIsInvalidPassword(isShortPassword);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardBody>
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 space-y-8 rounded-lg p-8"
            action={signUp}
          >
            <Input
              name='email'
              isRequired
              label='Email'
              type='email'
              labelPlacement="outside"
              placeholder="login@email.com"
              startContent={ <MailIcon height={20}/> }
              onChange={onChangeEmail}
              isInvalid={emailStatus.current === 'email-exist' || emailStatus.current === 'error-format'}
              errorMessage={emailErrorMessage}
              endContent={ emailStatus.current === 'loading' ? <ArrowIcon className='animate-spin-slow' height={20}/> : <></> }
            />
            <Input
              name='login'
              isRequired
              label='Login'
              type='login'
              labelPlacement="outside"
              placeholder="login"
              startContent={ <UserIcon height={20}/> }
              value={login}
              onChange={onChangeLogin}
            />
            <Input
              name='password'
              isRequired
              label='Password'
              type='password'
              labelPlacement="outside"
              placeholder="••••••••"
              startContent={ <KeyIcon height={20}/> }
              onChange={onChangePassword}
              isInvalid={isInvalidPassword}
              errorMessage={isInvalidPassword ? 'Minimum 8 char for password' : ''}
            />

            <Button color='success' type="submit">SignUp</Button>
          </form>
        </CardBody>
      </Card>

      { authError && <Card>
        <CardBody className="animate-in flex justify-center items-center bg-red-100">
          {authError}
        </CardBody>
      </Card> }
    </div>
  );
}
