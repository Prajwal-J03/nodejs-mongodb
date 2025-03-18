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

const sampleAccount = {
    name:"demo user",
    accountNumber:"demo1",
    accountType:"Checking",
    balance:87432.89
}

const main = async () =>{
    try{
        await connect();
        let result=await accountCollection.insertOne(sampleAccount)
        console.log(result);
    }catch(err){
        console.error(`Error inserting document: ${err}`)
    }finally{
        await client.close();
    }
}

main();