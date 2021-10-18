const config = {
    firebase: {
        authUrl: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword",
        key: process.env.FIREBASE_KEY
    },
    mongo: {
        url: process.env.MONGO_URL || 'mongodb://localhost:27017',
        dbName: process.env.MONGO_DB_NAME || 'wiki',
        collectionName: process.env.MONGO_COLLECTION_NAME || 'entries'
    }
}

export default config;