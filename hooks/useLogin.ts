import { useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { Status } from "./types";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";

const loginValidReg = /^[A-Za-z][A-Za-z0-9]{4,}$/;

type LoginStatus = Status;

export default (userLogin = '') => {
    const [login, setLogin] = useState(userLogin);
    const [hasChangeLogin, setHasChangeLogin] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState<LoginStatus>('');

    const checkValidLogin = (login: string) => {
        if(login === '') {
            setHasChangeLogin(false);
            setLoginStatus('')
            setLoginErrorMessage('');
        } else if(!loginValidReg.test(login)) {
            setLoginStatus('error-format');
            setLoginErrorMessage('Min length 4 char and without specific chars');
        } else {
            setLoginStatus('approve-format');
            setLoginErrorMessage('');
        }
    };

    const checkLoginExist = useDebouncedCallback(async (login: string) => {
        if(loginStatus === 'approve-format') {
            const supabase = supabaseWorker(createClient());
            const isLoginExist = await supabase.users.isLoginExist(login);

            if(isLoginExist) {
                setLoginStatus('success');
                setLoginErrorMessage('');
            } else {
                setLoginStatus('error-exist');
                setLoginErrorMessage('User with this username already exist');
            }
        }
    }, 500);

    const updateLoginByEmail = (login: string) => {
        setLogin(login);
        checkValidLogin(login);
        checkLoginExist(login)
    }

    const updateLogin = (login: string) => {
        setHasChangeLogin(true);
        updateLoginByEmail(login);
    }

    return {
        login,
        hasChangeLogin,
        loginStatus,
        loginErrorMessage,
        updateLogin,
        updateLoginByEmail
    };
}
