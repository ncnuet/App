import mongoose from 'mongoose';
import config from './env';

const { MG_HOST, MG_PORT, MG_NAME, MG_USERNAME, MG_PASSWORD } = config;

mongoose.set('strictQuery', true);
// export const connect = async () => mongoose.connect(`mongodb://${MG_HOST}:${MG_PORT}/${MG_NAME}`);
const uri = `mongodb+srv://${MG_USERNAME}:${MG_PASSWORD}@${MG_HOST}/${MG_NAME}`;
console.log(uri);
export const connect = async () => mongoose.connect(uri);