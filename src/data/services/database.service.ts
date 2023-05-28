import * as dotenv from "dotenv";
import {connect, disconnect} from "mongoose";

export async function connectToDatabase () {
    dotenv.config();
 
    const connectionString = process.env.DB_CONN_STRING ?? '';
    await connect(connectionString, {dbName: process.env.DB_NAME});
       
    console.log(`Successfully connected to database: ${process.env.DB_NAME}`);
 }

 export async function disconnectOfDatabase () {
    await disconnect();
    console.log(`Successfully disconnected of database`);
 }