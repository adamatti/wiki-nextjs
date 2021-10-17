export const save = async (entry) => {
    const response = await fetch('/api/wiki', {
        method: "POST",
        body: JSON.stringify(entry),
        headers: { 'Content-Type': "application/json"}
    })

    if (!response.ok) {
        console.log("Response error!");
    }
}
