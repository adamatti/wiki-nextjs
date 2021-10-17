import Head from 'next/head';
import ShowWikiEntry from '../../../components/ShowWikiEntry';
import * as mongoRepo from '../../../mongoRepo';

type WikiPageParams = {
    name: string,
    text: string
}

const WikiPage = (props: WikiPageParams) => {
    return <>
        <Head>
            <title>{props.name}</title>
        </Head>
        <ShowWikiEntry name={props.name} text={props.text} />
    </>;
}

export async function getServerSideProps(context: any) {
    const name = context.params.name;
    const entry = await mongoRepo.get(name);
    const entryEnrich = {
        ...entry,
        name
    }    

    return {
        props: entryEnrich
    }
}

export default WikiPage;