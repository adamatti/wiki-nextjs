import styles from './ShowWikiEntry.module.scss';
import ReactMarkdown from 'react-markdown';
import Grid from '@mui/material/Grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

type ShowWikiEntrySinglePageParams = {
    name: string
    text: string
    onEdit: (name: string) => void,
    onDelete: (name: string) => void,
    onClose: (name: string) => void
}

const ShowWikiEntrySinglePage = (props: ShowWikiEntrySinglePageParams) => {
    return (<>
        <Grid container>
            <Grid item xs={8}>
                <h2>{props.name}</h2>
            </Grid> 
            <Grid item xs={4}>
                <IconButton onClick={() => props.onClose(props.name)}>
                    <CloseIcon  />
                </IconButton>
                <IconButton onClick={() => { props.onEdit(props.name)}}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() => { props.onDelete(props.name)}}>
                    <DeleteIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <ReactMarkdown className={styles.markdown}>{props.text || 'No text provided'}</ReactMarkdown>
            </Grid>
        </Grid>
    </>);
}

export default ShowWikiEntrySinglePage;