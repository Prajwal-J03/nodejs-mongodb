const { MongoClient, ObjectId } = require('mongodb');

const uri = require("./atlas_uri")

const client = new MongoClient(uri)
const dbname = 'nodedb'
const collection_name= 'accounts'

const accountCollection = client.db(dbname).collection(collection_name)

const connect = async () => {
    try{
        await client.connect();
        console.log(`Connected to the ${dbname} database`);
    }catch(err){
        console.log(`Error connecting to the database: ${err}`);
    }
}

const documentToDelete = { _id:1}

const main = async () =>{
    try{
        await connect();
        let result=await accountCollection.deleteOne(documentToDelete)
        result.deletedCount === 1 
        ? console.log(`Updated Document is ${result.deletedCount}`)
        : console.log(`No document is modified`)
    }catch(err){
        console.error(`Error inserting document: ${err}`)
    }finally{
        await client.close();
    }
}

main();