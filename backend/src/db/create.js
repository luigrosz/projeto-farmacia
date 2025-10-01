import pool from './pool.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createTables() {
  try {
    const sqlFilePath = path.join(__dirname, 'db.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Criando tabelas...');
    await pool.query(sql);
    console.log('Tabelas criadas!');
    return;
  } catch (err) {
    console.error('Erro criando tabelas:', err);
  }
}

createTables();
