const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/vulnerabilityScanner";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

async function connectDB() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect();
            console.log("✅ Connected to MongoDB:", uri);
        }
        return client.db("vulnerabilityScanner");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectDB;
