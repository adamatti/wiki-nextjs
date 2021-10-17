import * as mongoRepo from '../../../mongoRepo';

const DeletePage = () => {}

export async function getServerSideProps(context: any) {
    const name = context.params.name;

    await mongoRepo.remove(name);

    return {
        redirect: {
          destination: `/wiki/home`,
          permanent: false,
        },
    }
}

export default DeletePage;