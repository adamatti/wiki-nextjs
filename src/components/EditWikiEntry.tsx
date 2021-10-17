import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';

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

    return (<form onSubmit={saveHandler}>
            <Box component="form">
                <label>Name: </label>
                <TextField inputRef={nameRef} defaultValue={props.name} disabled={false}/><br/>
                <label>Text: </label>
                <TextField inputRef={textRef} defaultValue={props.text}/><br/>
                <Button onClick={saveHandler}>Save</Button>
            </Box>
        </form>)
}

export default EditWikiEntry;