import EditWikiEntry from '../../../src/components/EditWikiEntry';
import { useRouter } from 'next/router'
import * as wikiApiClient from '../../../src/wikiApiClient';
import * as mongoRepo from '../../../src/mongoRepo';
import {WikiEntry} from '../../../src/types';

type EditPageParams = {
    name: string,
    text: string
}

const EditPage = (props: EditPageParams) => {
    const router = useRouter();

    const saveHandler = async (entry: WikiEntry) => {
        await wikiApiClient.save(entry);
        router.push(`/wiki/${entry.name}`);
    }

    return <EditWikiEntry name={props.name} text={props.text} onSave={saveHandler}/>
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

export default EditPage;