import useUser from "../lib/useUser";

const LoginRequired = (props: any) => {
    const { user } = useUser({redirectTo: "/login"});

    return <>{props.children}</>;
}

export default LoginRequired;