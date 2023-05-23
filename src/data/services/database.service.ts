import * as dotenv from "dotenv";
import * as mongoDB from "mongodb";
import {Viewer} from "../models/viewer";

export const collections: { Viewers?: mongoDB.Collection<Viewer> } = {}

export async function connectToDatabase () {
    dotenv.config();
 
    const connectionString = process.env.DB_CONN_STRING ?? '';
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const viewersCollection: mongoDB.Collection<Viewer> = db.collection<Viewer>('Viewers');
 
    collections.Viewers = viewersCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${viewersCollection.collectionName}`);
 }