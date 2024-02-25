import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { BaseStatus, StatusFormat } from "./types";

const passwordValidReg = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!-])[a-zA-Z0-9-]{8,}$/;

type PasswordStatus = Exclude<StatusFormat, 'approve-format'>;
type ConfirmPasswordStatus = BaseStatus;

export default () => {
    const [password, setPassword] = useState('');
    const [passwordStatus, setPasswordStatus] = useState<PasswordStatus>('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<ConfirmPasswordStatus>('');
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');

    const checkValidPassword = useDebouncedCallback((password: string) => {
        if(password === '') {
            setPasswordStatus('');
            setPasswordErrorMessage('');
        } else if(!passwordValidReg.test(password)) {
            setPasswordStatus('error-format');
            setPasswordErrorMessage('Minimum 8 symbols for password wihtout specific symbols');
        } else {
            setPasswordStatus('success');
            setPasswordErrorMessage('');
        }
    }, 500);

    const checkConfirmPassword = useDebouncedCallback((password: string, confirmPassword: string) => {
        if(confirmPassword === '') {
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
        checkValidPassword(password);
    }, [password]);

    useEffect(() => {
        checkConfirmPassword(password, confirmPassword);
    }, [confirmPassword])

    return {
        passwordStatus,
        passwordErrorMessage,
        setPassword,
        confirmPasswordStatus,
        confirmPasswordErrorMessage,
        setConfirmPassword,
    };
}
