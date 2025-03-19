const { MongoClient } = require('mongodb');
const uri = require("./atlas_uri");

const client = new MongoClient(uri);
const dbname = 'nodedb';
const collection_name = 'accounts';

const accountCollection = client.db(dbname).collection(collection_name);

const connect = async () => {
    try {
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
        throw err;
    }
};

const sampleAccounts = [
    {
        name: "Alice Johnson",
        accountNumber: "acc1001",
        accountType: "Checking",
        balance: 50234.75
    },
    {
        name: "Bob Smith",
        accountNumber: "acc1002",
        accountType: "Savings",
        balance: 120000.50
    },
    {
        name: "Charlie Brown",
        accountNumber: "acc1003",
        accountType: "Business",
        balance: 250430.10
    },
    {
        name: "Diana Prince",
        accountNumber: "acc1004",
        accountType: "Checking",
        balance: 73200.90
    },
    {
        name: "Ethan Hunt",
        accountNumber: "acc1005",
        accountType: "Savings",
        balance: 98000.25
    }
];

const main = async () => {
    try {
        await connect();
        let result = await accountCollection.insertMany(sampleAccounts);
        console.log(`Inserted ${result.insertedCount} documents:`, result.insertedIds);
    } catch (err) {
        console.error(`Error inserting documents: ${err}`);
    } finally {
        await client.close();
        console.log("Database connection closed.");
    }
};

main();
