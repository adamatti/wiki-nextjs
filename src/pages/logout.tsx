import withSession from "../lib/session";
import useUser from "../lib/useUser";

const LogoutPage = () => {
  const { mutateUser } = useUser();
  mutateUser({isLoggedIn: false}, false);
}

export const getServerSideProps = withSession(async (context: any): Promise<any> => {
    context.req.session.destroy();

    return {
        redirect: {
          destination: `/login`,
          permanent: false,
        },
    }
})

export default LogoutPage;