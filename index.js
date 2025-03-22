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

const singleAccount = {
    name: "John Doe",
    accountNumber: "acc1000",
    accountType: "Checking",
    balance: 65432.45
};

const multipleAccounts = [
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

        // Insert a single document
        let singleInsertResult = await accountCollection.insertOne(singleAccount);
        console.log(`Inserted one document:`, singleInsertResult.insertedId);

        // Insert multiple documents
        let multipleInsertResult = await accountCollection.insertMany(multipleAccounts);
        console.log(`Inserted ${multipleInsertResult.insertedCount} documents:`, multipleInsertResult.insertedIds);

        // Update a document
        const filter = { accountNumber: "acc1001" }; // The document to update
        const updateDoc = {
            $set: {
                balance: 55000.00 // New balance to set
            },
        };

        let updateResult = await accountCollection.updateOne(filter, updateDoc);
        if (updateResult.matchedCount > 0) {
            console.log(`Updated document with accountNumber acc1001`);
        } else {
            console.log(`No document found with accountNumber acc1001`);
        }

        // Retrieve a document with findOne
        const findFilter = { accountNumber: "acc1002" }; // The document to retrieve
        const foundAccount = await accountCollection.findOne(findFilter);

        if (foundAccount) {
            console.log("Found account:", foundAccount);
        } else {
            console.log("No account found with accountNumber acc1002");
        }

        // Retrieve multiple documents with findMany (added this method)
        const findManyFilter = { accountType: "Checking" }; // Example filter to retrieve accounts of type "Checking"
        const foundAccounts = await accountCollection.find(findManyFilter).toArray();

        if (foundAccounts.length > 0) {
            console.log("Found accounts:", foundAccounts);
        } else {
            console.log("No accounts found with accountType 'Checking'");
        }

    } catch (err) {
        console.error(`Error inserting, updating or retrieving documents: ${err}`);
    } finally {
        await client.close();
        console.log("Database connection closed.");
    }
};

main();
