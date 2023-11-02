import mongoose from 'mongoose';
import config from './env';

const { MG_HOST, MG_PORT, MG_NAME } = config;

mongoose.set('strictQuery', true);
export const connect = async () => mongoose.connect(`mongodb://${MG_HOST}:${MG_PORT}/${MG_NAME}`);