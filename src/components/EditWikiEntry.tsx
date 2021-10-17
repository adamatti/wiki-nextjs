import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { Link, Paper } from '@mui/material';
import styles from './EditWikiEntry.module.scss';
import { style } from '@material-ui/system';

type EditWikiEntryParams = {
    name: string,
    text: string,
    onSave: (entry: any) => void
}

const EditWikiEntry = (props: EditWikiEntryParams) => {
    const nameRef = useRef<any>(props.name);
    const textRef = useRef<any>(props.text);

    const saveHandler = (event: any) => {
        event.preventDefault();
        console.log("NameRef:", nameRef.current);
        props.onSave({
            name: nameRef.current.value,
            text: textRef.current.value,
        })
    }

    return (
        <>
            <h1 className={styles.title}>Edit Entry</h1>
            <form onSubmit={saveHandler}>
                <TextField 
                    label="Name"
                    inputRef={nameRef} 
                    defaultValue={props.name} 
                    disabled={false}/>
                <TextField 
                    label="Text"
                    inputRef={textRef} 
                    defaultValue={props.text}
                    multiline={true}
                    minRows={5}
                />
                <Button onClick={saveHandler}>Save</Button>
                <Link href={`/wiki/${props.name}`}>Cancel</Link>
            </form>
        </>)
}

export default EditWikiEntry;