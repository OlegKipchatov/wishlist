import { useEffect, useState } from 'react';

import { BaseStatus, StatusFormat } from './types';

import { useDebouncedCallback } from 'use-debounce';

type PasswordStatus = Exclude<StatusFormat, 'approve-format'>;
type ConfirmPasswordStatus = BaseStatus;

export default () => {
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<ConfirmPasswordStatus>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

  const checkValidPassword = useDebouncedCallback(() => {
    if (password === '') {
      setPasswordStatus('');
      setPasswordErrorMessage('');
    } else if (password.length < 8) {
      setPasswordStatus('error-format');
      setPasswordErrorMessage('Minimum 8 symbols for password wihtout specific symbols');
    } else {
      setPasswordStatus('success');
      setPasswordErrorMessage('');
    }
  }, 500);

  const checkConfirmPassword = useDebouncedCallback(() => {
    if (confirmPassword === '') {
      setConfirmPasswordStatus('');
      setConfirmPasswordErrorMessage('');
    } else if (password !== confirmPassword) {
      setConfirmPasswordStatus('error');
      setConfirmPasswordErrorMessage('Invalid confirms, passwords must match');
    } else {
      setConfirmPasswordStatus('success');
      setConfirmPasswordErrorMessage('');
    }
  }, 500);

  useEffect(() => {
    checkValidPassword();
  }, [password]);

  useEffect(() => {
    checkConfirmPassword();
  }, [confirmPassword]);

  return {
    passwordStatus,
    passwordErrorMessage,
    setPassword,
    confirmPasswordStatus,
    confirmPasswordErrorMessage,
    setConfirmPassword,
  };
};
