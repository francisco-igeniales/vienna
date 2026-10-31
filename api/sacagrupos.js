import pool from '../lib/db.js';

export default async function handler(req, res) {

  try {
     const [rows] = await pool.query('Select * from GRUPOMy');
     res.status(200).json(rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Error del servidor'
    });

  }
}
