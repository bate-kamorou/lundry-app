import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not defined');
}

if (connectionString === 'base') {
    throw new Error('DATABASE_URL is set to "base". Please check your Netlify environment variables.');
}

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false // Required for Neon
    }
});

export default pool;
