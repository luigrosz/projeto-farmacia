import express from 'express';
import pool from '../db/pool.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "pesquisador"');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na requisicao de pesquisadores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM "pesquisador" WHERE id_pesquisador = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pesquisador nao encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao buscar pesquisador com ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.post('/', async (req, res) => {
  try {
    const { nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado } = req.body;
    const result = await pool.query(
      `INSERT INTO "pesquisador" (nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar pesquisador:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado } = req.body;

    const result = await pool.query(
      `UPDATE "pesquisador"
       SET nome = $1, link_lattes = $2, area_pesquisa = $3, email = $4, celular = $5,
           localidade = $6, pagina_institucional = $7, pq = $8, is_admin = $9,
           editor_revista = $10, revistas = $11, laboratorio = $12, area_doutorado = $13
       WHERE id_pesquisador = $14
       RETURNING *`,
      [nome, link_lattes, area_pesquisa, email, celular, localidade, pagina_institucional, pq, is_admin, editor_revista, revistas, laboratorio, area_doutorado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pesquisador nao encontrado para atualizacao' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Erro ao atualizar pesquisador com ID ${req.params.id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
