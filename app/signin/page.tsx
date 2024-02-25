'use client'

import { ChangeEvent, useState } from "react";
import { Input, Button, Card, CardBody, Divider, Link } from "@nextui-org/react";
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import KeyIcon from '@heroicons/react/24/outline/KeyIcon';
import { createClient } from "@/supabase/client";
import { redirect } from "next/navigation";
import useEmail from "@/hooks/useEmail";
import useLogin from "@/hooks/useLogin";
import usePassword from "@/hooks/usePassword";

export default function SignUp() {
  const { emailStatus, emailErrorMessage, setEmail} = useEmail();
  const { updateLoginByEmail, loginStatus, loginErrorMessage } = useLogin();
  const {
    passwordStatus,
    passwordErrorMessage,
    setPassword,
  } = usePassword();

  const [authError, setAuthError] = useState('');

  const signIn = async (formData: FormData) => {
    debugger;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const login = email.split('@')[0];

    const isValidLogin = loginStatus === 'error-exist';
    const isValidEmail = emailStatus === 'error-exist';
    const isValidPassword = passwordStatus === 'success';
    if(!(isValidEmail || isValidLogin) && !isValidPassword) {
      setAuthError('Invalid input data');
      return;
    }

    let userEmail = email;
    const supabase = createClient();
    if(!email.includes('@')) {
      const { data } = await supabase.from('profiles').select('email').eq('login', login);
      userEmail = data && data[0].email;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message)
      return;
    }

    return redirect(`/list/${login}`);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if(email.includes('@')) {
      setEmail(email);
      updateLoginByEmail('');
    } else {
      const emailLogin = email.split('@')[0];
      updateLoginByEmail(emailLogin);
      setEmail('');
    }
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  return (
    <div className="space-y-8 flex flex-col items-center">
      <div className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl">Welcom</h1>
          <p className="text-gray-500">Log in to your account to continue</p>
      </div>
      <Card className="w-full max-w-sm">
        <CardBody>
          <form
            className="animate-in flex-1 flex flex-col w-full justify-center gap-2 space-y-8 rounded-lg p-8"
            action={signIn}
          >
            <Input
              name='email'
              type='text'
              isRequired
              label='Email Address or Username'
              labelPlacement="outside"
              placeholder="Enter your email or login"
              startContent={ <UserIcon height={20}/> }
              onChange={onChangeEmail}
              isInvalid={loginStatus === 'error-format' || emailStatus === 'error-format'}
              errorMessage={loginStatus === 'error-format' && loginErrorMessage || emailStatus === 'error-format' && emailErrorMessage || ''}
              description={<>
                { loginStatus === 'error-exist' || emailStatus === 'error-exist' ? <span className="text-green-500">This user exist</span> : <></> }
                { loginStatus === 'success' || emailStatus === 'success' ? <span className="text-red-100">This user does not exist</span> : <></> }
              </>}
            />
            
            <Input
              name='password'
              isRequired
              label='Password'
              type='password'
              labelPlacement="outside"
              placeholder="Enter your password"
              startContent={ <KeyIcon height={20}/> }
              onChange={onChangePassword}
              isInvalid={passwordStatus === 'error-format'}
              errorMessage={passwordErrorMessage}
            />

            <Button color='success' type="submit" formAction={signIn}>Sign In</Button>

            <div>
              <Divider />
              <div className="flex justify-center mt-4">
                <span>Need to create an account? <Link className='text-primary-100' color="primary" href="/signin" underline="hover">Sign Up</Link></span>
              </div>
            </div>
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
