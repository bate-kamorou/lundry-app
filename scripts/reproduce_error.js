import pg from 'pg';
const { Pool } = pg;

// Test cases
const inputs = [
    'base',
    'psql postgresql://user:pass@host/db',
    'postgresql://user:pass@base/db',
    undefined
];

async function test() {
    for (const input of inputs) {
        console.log(`Testing input: ${input}`);
        const pool = new Pool({
            connectionString: input,
        });
        try {
            await pool.query('SELECT 1');
        } catch (e) {
            console.log(`Error for '${input}': ${e.message}`);
        }
        await pool.end();
    }
}

test();
