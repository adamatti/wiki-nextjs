import { Link } from "@mui/material";
import { style } from "@mui/system";
import useUser from "../lib/useUser";
import styles from "./Footer.module.scss";

const Footer = () => {
    const { user, mutateUser, error } = useUser();
    return (
        <div className={styles.footer}>
            [
            <Link href="/profile">Profile</Link> |
            &nbsp;<Link href="/wiki/home">Home</Link> |
            &nbsp;<Link href="/singlePage">Single Page</Link> |
            &nbsp;{user?.isLoggedIn === true && <Link href="/logout">Logout</Link> }
            {!user?.isLoggedIn  && <Link href="/login">Login</Link> }
            ] <br/>
            {error && <div>Error</div>}
            {user?.username}
        </div>
    )
}

export default Footer;