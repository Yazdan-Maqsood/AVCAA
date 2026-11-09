import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env.js';

const initDb = async () => {
  try {
    // Connect without database first to create it
    const connection = await mysql.createConnection({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      multipleStatements: true, // Required to run the whole SQL file
    });

    console.log('Connected to MySQL server.');

    // Read schema file
    const schemaPath = path.resolve(process.cwd(), 'database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await connection.query(schemaSql);
    console.log('✅ Database and Tables created successfully!');

    await connection.end();
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
};

initDb();