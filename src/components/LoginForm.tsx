import React, {useRef} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import useUser from "../lib/useUser";

const LoginForm = () => {
    const router = useRouter();
    const usernameRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const { mutateUser } = useUser();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();

        const username = usernameRef.current.value;

        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password: passwordRef.current.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            mutateUser({username, isLoggedIn:true});
            router.push("/wiki/home");
        } else {
            // FIXME provide a better error message
            alert("Unable to login");
        }
    }

    return (<>
        <h1>Login page</h1>
        <form onSubmit={submitHandler}>
            <TextField 
                label="Username" 
                required={true} 
                inputRef={usernameRef}
                defaultValue="adamatti@gmail.com"
            /><br/>
            <TextField label="Password" type="password" required={true} inputRef={passwordRef}/><br/>
            <Button onClick={submitHandler}>Login</Button>
        </form>
    </>)
}

export default LoginForm;