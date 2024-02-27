'use client';

import { ChangeEvent, useState } from 'react';
import { redirect } from 'next/navigation';

import {
  Button, Card, CardBody, Divider, Input, Link,
} from '@nextui-org/react';
import MailIcon from '@heroicons/react/24/outline/EnvelopeIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';

import useEmail from '@/hooks/useEmail';
import useLogin from '@/hooks/useLogin';
import usePassword from '@/hooks/usePassword';
import { createClient } from '@/supabase/client';

export default function SignUp() {
  const { emailStatus, emailErrorMessage, setEmail } = useEmail();
  const {
    login, updateLogin, updateLoginByEmail, hasChangeLogin, loginStatus, loginErrorMessage,
  } = useLogin();
  const {
    passwordStatus,
    passwordErrorMessage,
    setPassword,
    confirmPasswordStatus,
    confirmPasswordErrorMessage,
    setConfirmPassword,
  } = usePassword();

  const [authError, setAuthError] = useState('');

  const signUp = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const userLogin = formData.get('login') as string;
    const password = formData.get('password') as string;

    const isValidLogin = loginStatus === 'success';
    const isValidEmail = emailStatus === 'success';
    const isValidPassword = passwordStatus === 'success' && confirmPasswordStatus === 'success';
    if (!isValidLogin || !isValidEmail || !isValidPassword) {
      setAuthError('Invalid imput data');
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          login: userLogin,
          email,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      return;
    }

    // eslint-disable-next-line consistent-return
    return redirect(`/list/${login}`);
  };

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const userLogin = e.target.value;
    updateLogin(userLogin);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!hasChangeLogin) {
      const emailLogin = email.split('@')[0];
      updateLoginByEmail(emailLogin);
    }

    setEmail(email);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="flex flex-col gap-1 items-center">
        <h1 className="text-2xl">Welcom</h1>
        <p className="text-gray-500">Create your account to get started</p>
      </div>
      <Card className="w-full max-w-sm">
        <CardBody>
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 space-y-8 rounded-lg p-8"
            action={signUp}
          >
            <Input
              name="login"
              type="login"
              isRequired
              label="Username"
              labelPlacement="outside"
              placeholder="Enter your username"
              startContent={<UserIcon height={20} />}
              value={login}
              isInvalid={loginStatus === 'error-format' || loginStatus === 'error-exist'}
              errorMessage={loginErrorMessage}
              onChange={onChangeLogin}
            />

            <Input
              name="email"
              type="email"
              isRequired
              label="Email Address"
              labelPlacement="outside"
              placeholder="Enter your email"
              startContent={<MailIcon height={20} />}
              onChange={onChangeEmail}
              isInvalid={emailStatus === 'error-exist' || emailStatus === 'error-format'}
              errorMessage={emailErrorMessage}
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
            <Input
              name="confirm-password"
              type="password"
              isRequired
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Confirms your password"
              startContent={<KeyIcon height={20} />}
              onChange={onChangeConfirmPassword}
              isInvalid={confirmPasswordStatus === 'error'}
              errorMessage={confirmPasswordErrorMessage}
            />

            <Button
              color="success"
              type="submit"
            >
              Sign Up
            </Button>

            <div>
              <Divider />
              <div className="flex justify-center mt-4">
                <span>
                  Already have an account?
                  <Link
                    className="text-primary-100"
                    color="primary"
                    href="/signin"
                    underline="hover"
                  >
                    Sign In
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
