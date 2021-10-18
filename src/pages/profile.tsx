import withSession from "../lib/session";
import Head from 'next/head';
import Footer from "../components/Footer";

type ProfilePageParams = {
    user: {
        username: string,
        isLoggedIn: boolean,
    }
}

const ProfilePage = (props: ProfilePageParams) => {
    return (<>
        <Head>
            <title>Profile Page</title>
        </Head>
        <div>Current user is {props.user.username}</div><br/>
        <div>isLoggedIn: {props.user.isLoggedIn + ''}</div>
        <Footer />
    </>);
}

export const getServerSideProps = withSession(async (context:any) : Promise<any> => {
    return {
        props: {
            user: context.req.session.get("user") || { isLoggedIn: false}
        }
    }
})

export default ProfilePage;