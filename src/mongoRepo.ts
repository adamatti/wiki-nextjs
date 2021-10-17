import { WikiEntry } from "./types";
import {MongoClient, Collection} from "mongodb";

// FIXME move it to env var
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const connectPromise = client.connect();

const removeId = (row: any) => {
    const copy = {...row};
    delete copy._id;
    return copy;
}

const getCollection = async ():Promise<Collection> => {
    await connectPromise;
    // FIXME move it to env var
    const db = client.db("wiki");
    // FIXME move it to env var
    return db.collection('entries');
}

export async function list(): Promise<any> {
    const collection = await getCollection();
    return collection.find().map(removeId).toArray();
}

export async function save(entry: WikiEntry): Promise<WikiEntry> {
    const collection = await getCollection();
    await collection.updateOne(
        {_id: entry.name}, 
        {$set: entry}, 
        {upsert: true}
    );
    return entry;
}

export async function remove(_id: string): Promise<any> {
    const collection = await getCollection();
    return collection.deleteOne({_id});
}

export async function get(_id: string): Promise<any> {
    const collection = await getCollection();
    const dbEntry = await collection.findOne({_id});
    return removeId(dbEntry);
}

export function close(){
    return client.close();
}