import { WikiEntry } from "./types";

export const save = async (entry: WikiEntry) => {
    const response = await fetch('/api/wiki', {
        method: "POST",
        body: JSON.stringify(entry),
        headers: { 'Content-Type': "application/json"}
    })

    if (!response.ok) {
        console.log("Response error!");
    }
}

export const remove = async (name: string) => {
    const response = await fetch(`/api/wiki/${name}`, {
        method: "DELETE",
        headers: { 'Content-Type': "application/json"}
    })

    if (!response.ok) {
        console.log("Response error!");
    }
}