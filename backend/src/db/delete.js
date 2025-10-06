import pool from './pool.js';

async function deleteDatabase() {
  try {
    await pool.query('DROP DATABASE IF EXISTS rede_pesquisadores');
    console.log('Bancp "rede_pesquisadores" deletado com sucesso');
  } catch (error) {
    console.error('Erro deletando banco', error);
  } finally {
    await pool.end();
  }
}

deleteDatabase();
