import { WikiEntry } from "./types";
import {MongoClient, Collection} from "mongodb";
import config from "./config";
import {default as loggerParent} from "./logger";
const logger = loggerParent.child({file: 'mongoRepo'});

const client = new MongoClient(config.mongo.url);
const connectPromise = client.connect();

const removeId = (row: any) => {
    const copy = {...row};
    delete copy._id;
    return copy;
}

const getCollection = async ():Promise<Collection> => {
    await connectPromise;
    const db = client.db(config.mongo.dbName);
    return db.collection(config.mongo.collectionName);
}

export async function list(): Promise<any> {
    const collection = await getCollection();
    return collection.find().map(removeId).toArray();
}

export async function save(entry: WikiEntry): Promise<WikiEntry> {
    logger.debug('Repo: About to save', entry);
    const collection = await getCollection();
    await collection.updateOne(
        {_id: entry.name}, 
        {$set: entry}, 
        {upsert: true}
    );
    return entry;
}

export async function remove(_id: string): Promise<any> {
    logger.debug('Repo: About to remove', _id);
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

export async function count(): Promise<number> {
    const collection = await getCollection();
    return collection.countDocuments();
}