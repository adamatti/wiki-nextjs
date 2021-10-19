import Box from '@mui/material/Box';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from './ShowWikiEntry.module.scss';

type ShowWikiEntryParams = {
    name: string
    text: string
    showLinks?: boolean
}

const ShowWikiEntry = (props: ShowWikiEntryParams) => {
    const name = props.name;
    const showLinks = props.showLinks !== false;

    const links = <>
        [ <Link href={`/wiki/${name}/edit`}>edit</Link> | <Link href={`/wiki/${name}/delete`}>delete</Link> ]
    </>

    return (<Box>
        <div>
            <h1>{name}</h1> {showLinks && links} 
        </div>
        <ReactMarkdown className={styles.markdown}>{props.text || 'No text provided'}</ReactMarkdown>
    </Box>);
}

export default ShowWikiEntry;