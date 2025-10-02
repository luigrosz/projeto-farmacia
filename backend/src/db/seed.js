import pool from './pool.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  try {
    console.log('Iniciando o seeding do banco de dados...');

    await pool.query('DELETE FROM "pesquisador" CASCADE;');
    await pool.query('DELETE FROM "area_doutorado" CASCADE;');
    await pool.query('DELETE FROM "localidade" CASCADE;');
    await pool.query('DELETE FROM "instituicao" CASCADE;');

    const instituicao1 = await pool.query(
      `INSERT INTO "instituicao" (id, nome) VALUES ($1, $2) RETURNING id`,
      [101, 'Universidade Federal do Mato Grosso']
    );
    const instituicao2 = await pool.query(
      `INSERT INTO "instituicao" (id, nome) VALUES ($1, $2) RETURNING id`,
      [102, 'Universidade de São Paulo']
    );
    const instituicao3 = await pool.query(
      `INSERT INTO "instituicao" (id, nome) VALUES ($1, $2) RETURNING id`,
      [103, 'Universidade Estadual de Goias']
    );

    const localidade1 = await pool.query(
      `INSERT INTO "localidade" (nome_estado, sigla_estado, nome_cidade) VALUES ($1, $2, $3) RETURNING id_localidade`,
      ['Mato Grosso', 'MT', 'Barra do Garças']
    );
    const localidade2 = await pool.query(
      `INSERT INTO "localidade" (nome_estado, sigla_estado, nome_cidade) VALUES ($1, $2, $3) RETURNING id_localidade`,
      ['São Paulo', 'SP', 'São Paulo']
    );
    const localidade3 = await pool.query(
      `INSERT INTO "localidade" (nome_estado, sigla_estado, nome_cidade) VALUES ($1, $2, $3) RETURNING id_localidade`,
      ['Goiás', 'GO', 'Goiânia']
    );

    const areaDoutorado1 = await pool.query(
      `INSERT INTO "area_doutorado" (id_pesquisador, titulo, instituicao_id) VALUES ($1, $2, $3) RETURNING id_doutorado`,
      [1, 'Química Medicinal', instituicao1.rows[0].id]
    );
    const areaDoutorado2 = await pool.query(
      `INSERT INTO "area_doutorado" (id_pesquisador, titulo, instituicao_id) VALUES ($1, $2, $3) RETURNING id_doutorado`,
      [2, 'Farmacologia Clínica', instituicao2.rows[0].id]
    );
    const areaDoutorado3 = await pool.query(
      `INSERT INTO "area_doutorado" (id_pesquisador, titulo, instituicao_id) VALUES ($1, $2, $3) RETURNING id_doutorado`,
      [3, 'Biologia Molecular Aplicada à Saúde', instituicao3.rows[0].id]
    );

    await pool.query(
      `INSERT INTO "pesquisador" (nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        'Dr. João Silva',
        'http://lattes.cnpq.br/joao_silva',
        'Desenvolvimento de Fármacos',
        'joao.silva@sou.ufmt.br',
        '31987654321',
        localidade1.rows[0].id_localidade,
        'http://www.ufmg.br/joao_silva',
        true,
        false,
        true,
        'Revista Brasileira de Farmacologia',
        'Laboratório de Química Farmacêutica',
        areaDoutorado1.rows[0].id_doutorado
      ]
    );

    await pool.query(
      `INSERT INTO "pesquisador" (nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        'Dra. Maria Oliveira',
        'http://lattes.cnpq.br/maria_oliveira',
        'Farmacocinética',
        'maria.oliveira@usp.br',
        '11912345678',
        localidade2.rows[0].id_localidade,
        'http://www.usp.br/maria_oliveira',
        false,
        false,
        false,
        null,
        'Laboratório de Biofarmacêutica',
        areaDoutorado2.rows[0].id_doutorado
      ]
    );

    await pool.query(
      `INSERT INTO "pesquisador" (nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        'Dr. Pedro Santos',
        'http://lattes.cnpq.br/pedro_santos',
        'Toxicologia Ambiental',
        'pedro.santos@ufg.br',
        '19998765432',
        localidade3.rows[0].id_localidade,
        null,
        true,
        true,
        false,
        null,
        'Laboratório de Toxicologia',
        areaDoutorado3.rows[0].id_doutorado
      ]
    );

    console.log('3 pesquisadores inseridos com sucesso!');
  } catch (err) {
    console.error('Erro durante o seeding do banco de dados:', err);
    process.exit(1);
  } finally {
    await pool.end();
    console.log('Conexao com o banco de dados encerrada.');
  }
}

seedDatabase();
