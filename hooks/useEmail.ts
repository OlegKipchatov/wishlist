import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce";
import { Status } from "./types";
import { createClient } from "@/supabase/client";
import { supabaseWorker } from "@/supabase/requests";

const emailValidReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

type EmailStatus = Status;

export default (userEmail = '') => {
    const [email, setEmail] = useState(userEmail);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [emailStatus, setEmailStatus] = useState<EmailStatus>('');

    const checkEmailValid = useDebouncedCallback((email: string) => {
        if(email === '') {
            setEmailStatus('');
            setEmailErrorMessage('');
          } else if(emailValidReg.test(email)) {
            setEmailStatus('approve-format');
            setEmailErrorMessage('');
          }else {
            setEmailStatus('error-format');
            setEmailErrorMessage('Invalid email format. Examaple: login@mail.com');
          }
    }, 500);

    const checkEmailExist = useDebouncedCallback(async (email: string) => {
        if(emailStatus === 'approve-format') {
          const supabase = supabaseWorker(createClient());
          const isEmailExist = await supabase.users.isEmailExist(email);
    
          if(isEmailExist) {
            setEmailStatus('success');
            setEmailErrorMessage('');
          } else {
            setEmailStatus('error-exist');
            setEmailErrorMessage('User with this email already exist');
          }
        }
      }, 500);

    useEffect(() => {
        checkEmailValid(email);
        checkEmailExist(email);
    }, [email]);

    return { emailStatus, emailErrorMessage, setEmail };
}
