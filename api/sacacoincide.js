import pool from '../lib/db.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Método no permitido'
        });
    }
  try {
     const { palabra } = req.body;
     // Agregamos los porcentajes directamente al valor de la variable
     const searchTerm = `%${palabra}%`;
     const [rows] = await pool.query("SELECT P_CODIGO, P_DESCRIP, P_PREVEN, P_INVACT FROM PRODUCTOMy WHERE P_DESCRIP LIKE ?", [searchTerm]);
     res.status(200).json(rows);
     //console.log(rows);
  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Error del servidor'
    });

  }
}
