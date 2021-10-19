import { Autocomplete, TextField } from '@mui/material';
import React, {useState, useRef} from 'react';
import ShowWikiEntrySinglePage from '../components/ShowWikiEntrySinglePage';
import EditWikiEntrySinglePage from '../components/EditWikiEntrySinglePage';
import * as mongoRepo from "../mongoRepo";
import {WikiEntry} from "../types";
import Head from 'next/head';
import * as wikiApiClient from '../wikiApiClient';

type SinglePageParams = {
    allEntries: WikiEntry[],
    openEntryNames: string[]
}

type WikiEntryAndMode = {
    name: string,
    text: string,
    mode?: string
}

// FIXME implement add new
const SinglePage = (props: SinglePageParams) => {
    const {openEntryNames } = props;

    const [allEntries, setAllEntries] = useState(props.allEntries); 

    const [entries, setEntries] = useState<WikiEntryAndMode[]>(
        allEntries.filter(({name}) => openEntryNames.includes(name))
    );

    const autoCompleteChangeHandler = (event: any, newInputValue: string) => {
        console.log("Event", event);
        const newEntry = allEntries.find(e => e.name === newInputValue) as WikiEntryAndMode;
        const oldEntries: WikiEntryAndMode[] = entries.filter(e => e.name !== newInputValue);
        const newEntries: WikiEntryAndMode[] = [newEntry, ...oldEntries];
        setEntries(newEntries);
        console.log('Entry added', newInputValue);
    }

    const changeViewMode = (name: string, newMode: string) => { 
        setEntries(entries.map (e => {
            if (e.name === name) {
                return {...e, mode: newMode}
            }
            return e
        }));
    }

    const editEntryHandler = (name: string) => {
        changeViewMode(name, "edit");
    }

    const deleteEntryHandler = async (name: string) => {
        // call api to delete
        await wikiApiClient.remove(name);
        
        // remove entry from allEntries
        setAllEntries(allEntries.filter(e => e.name !== name));

        closeEntryHandler(name);
    }

    const closeEntryHandler = (name: string) => {
        const newEntries = entries.filter(e => e.name !== name);
        setEntries(newEntries);
    }

    const saveHandler = async (entry: any) => {
        console.log('About to save: ', entry);
        await wikiApiClient.save(entry);
        
        // update saved entry on allEntries
        setAllEntries(allEntries.map (e => {
            if (e.name == entry.name) {
                return {...entry};
            } 
            return e;
        }));

        // update saved entry on open entries
        setEntries(entries.map (e => {
            if (e.name == entry.name) {
                return {...entry, mode: "view"};
            } 
            return e;
        }));
    }

    const cancelEditHandler = (name: string) => {
        changeViewMode(name, "view");
    }

    const showEntry = (e: WikiEntryAndMode) => <ShowWikiEntrySinglePage 
        key={e.name} 
        name={e.name} 
        text={e.text} 
        onEdit={editEntryHandler}
        onDelete={deleteEntryHandler}
        onClose={closeEntryHandler}
    />   

    const editEntry = (e: WikiEntryAndMode) => <EditWikiEntrySinglePage 
        key={e.name}
        name={e.name}
        text={e.text}
        onSave={saveHandler}
        onCancel={cancelEditHandler}
    />

    return (<>
        <Head>
            <title>Wiki</title>
        </Head>
        <h1>All pages</h1>
        <Autocomplete 
            disablePortal
            options={allEntries.map(e => e.name)}
            renderInput={(params) => <TextField {...params} label="Entries" />}            
            onInputChange={autoCompleteChangeHandler}
        />
        <br/> 
        {entries.map (e => e.mode ==="edit" ? editEntry(e) : showEntry(e))}
    </>);
}

export const getServerSideProps = async (context: any) => {
    const list = await mongoRepo.list();
    const entries = context.query.entries || "";

    return {
        props: {
            allEntries: list,
            openEntryNames: entries.split(",") || []
        }
    }
}

export default SinglePage;