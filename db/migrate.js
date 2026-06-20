#!/usr/bin/env node
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('Error: DATABASE_URL environment variable is not set.');
    process.exit(1);
  }
  const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    console.log('Connected to database');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    console.log('Running schema.sql...');
    await client.query(schema);
    console.log('Schema applied successfully');
    if (process.argv.includes('--seed')) {
      const seed = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');
      console.log('Running seed.sql...');
      await client.query(seed);
      console.log('Seed data inserted successfully');
    }
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
