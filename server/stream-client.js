import { StreamClient } from "@stream-io/node-sdk";
import dotenv from 'dotenv'

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

export const client = new StreamClient(apiKey, apiSecret);