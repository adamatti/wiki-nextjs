import Box from '@mui/material/Box';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

type ShowWikiEntryParams = {
    name: string
    text: string
}

const ShowWikiEntry = (props: ShowWikiEntryParams) => {
    const name = props.name;

    return (<Box>
        <div>
            <h1>{name}</h1> [ <Link href={`/wiki/${name}/edit`}>edit</Link> | <Link href={`/wiki/${name}/delete`}>delete</Link> ]
        </div>
        <ReactMarkdown>{props.text || 'No text provided'}</ReactMarkdown>
    </Box>);
}

export default ShowWikiEntry;