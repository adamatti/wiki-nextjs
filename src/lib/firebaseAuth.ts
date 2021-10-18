import config from '../config';

type AuthResponse = {
    ok: boolean,
    errorMessage?: string
}

export const login = async (email: string, password: string):Promise<AuthResponse> => {
    const path = `${config.firebase.authUrl}?key=${config.firebase.key}`;
    const response = await fetch(path, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        console.log("Firebase response: ok");
        return {ok: true};
    } else {
        const error = await response.json();
        return {
            ok: false,
            errorMessage: error.error.message
        }
    }
}