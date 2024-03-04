'use client';

import { ChangeEvent, useState } from 'react';
import { redirect } from 'next/navigation';

import {
  Button, Card, CardBody, Divider, Input, Link,
} from '@nextui-org/react';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';

import useEmail from '@/hooks/useEmail';
import useLogin from '@/hooks/useLogin';
import usePassword from '@/hooks/usePassword';
import { createClient } from '@/supabase/client';

export default function SignUp() {
  const { emailStatus, emailErrorMessage, setEmail } = useEmail();
  const { updateLoginByEmail, loginStatus, loginErrorMessage } = useLogin();
  const {
    passwordStatus,
    passwordErrorMessage,
    setPassword,
  } = usePassword();

  const [authError, setAuthError] = useState('');

  const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const login = email.split('@')[0];

    const isValidLogin = loginStatus.current === 'error-exist';
    const isValidEmail = emailStatus.current === 'error-exist';
    const isValidPassword = passwordStatus === 'success';
    if (!(isValidEmail || isValidLogin) && !isValidPassword) {
      setAuthError('Invalid input data');
      return;
    }

    let userEmail = email;
    const supabase = createClient();
    if (!email.includes('@')) {
      const { data } = await supabase.from('profiles').select('email').eq('login', login);
      userEmail = data && data[0].email;
    }

    const { error } = await supabase.auth.signInWithPassword({ email: userEmail, password });
    if (error) {
      setAuthError(error.message);
      return;
    }

    // eslint-disable-next-line consistent-return
    return redirect(`/list/${login}`);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (email.includes('@')) {
      setEmail(email);
      updateLoginByEmail('');
    } else {
      const emailLogin = email.split('@')[0];
      updateLoginByEmail(emailLogin);
      setEmail('');
    }
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="text-foreground text-2xl">Welcom</h1>
        <p className="text-default-500">Log in to your account to continue</p>
      </div>
      <Card className="w-full max-w-sm">
        <CardBody>
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 space-y-8 rounded-lg p-8"
            action={signIn}
          >
            <Input
              name="email"
              type="text"
              isRequired
              label="Email Address or Username"
              labelPlacement="outside"
              placeholder="Enter your email or login"
              startContent={<UserIcon height={20} />}
              onChange={onChangeEmail}
              isInvalid={loginStatus.current === 'error-format' || emailStatus.current === 'error-format'}
              errorMessage={loginStatus.current === ('error-format' && loginErrorMessage)
                || (emailStatus.current === 'error-format' && emailErrorMessage) || ''}
              description={
                loginStatus.current === 'error-exist' || emailStatus.current === 'error-exist'
                  ? <span className="text-danger">This user exist</span>
                  : ''
              }
            />

            <Input
              name="password"
              isRequired
              label="Password"
              type="password"
              labelPlacement="outside"
              placeholder="Enter your password"
              startContent={<KeyIcon height={20} />}
              onChange={onChangePassword}
              isInvalid={passwordStatus === 'error-format'}
              errorMessage={passwordErrorMessage}
            />

            <Button
              color="success"
              type="submit"
              formAction={signIn}
            >
              Sign In
            </Button>

            <div>
              <div className="flex gap-4 items-center">
                <Divider className="flex-1" />
                <span className="text-default-500 text-tiny">OR</span>
                <Divider className="flex-1" />
              </div>
              <div className="flex justify-center mt-4">
                <span>
                  Need to create an account?
                  {' '}
                  <Link
                    color="primary"
                    href="/signup"
                    underline="hover"
                  >
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      { authError && (
        <Card>
          <CardBody className="animate-in flex justify-center items-center bg-red-100">
            {authError}
          </CardBody>
        </Card>
      ) }
    </div>
  );
}
