import pool from '../lib/db.js';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Método no permitido'
        });
    }
  try {

     const [rows] = await pool.query("Select P_CODIGO,P_DESCRIP,P_PREVEN,P_PREPROM,P_INVACT from PRODUCTOMy where P_PROMOCION='S'");
     res.status(200).json(rows);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Error del servidor'
    });

  }
}
