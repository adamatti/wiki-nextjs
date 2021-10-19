import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import {WikiEntry} from '../types';

type EditWikiEntrySinglePageParams = {
    name: string,
    text: string,
    onSave: (entry: WikiEntry) => void,
    onCancel: (name: string) => void
}

const EditWikiEntrySinglePage = (props: EditWikiEntrySinglePageParams) => {
    const nameRef = useRef<any>();
    const textRef = useRef<any>();

    const saveHandler = () => {
        props.onSave({
            name: nameRef.current.value,
            text: textRef.current.value
        })
    }

    const cancelHandler = () => {
        props.onCancel(props.name);
    }

    return (<>
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
            <Button onClick={cancelHandler}>Cancel</Button>
        </form>
    </>)
}

export default EditWikiEntrySinglePage;