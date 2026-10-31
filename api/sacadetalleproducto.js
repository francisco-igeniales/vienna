
import pool from '../lib/db.js';

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Método no permitido'
        });
    }

    try {
        const { codigo } = req.query;

        if (!codigo) {
            return res.status(400).json({
                error: 'Falta indicar el código del producto'
            });
        }

        const [rows] = await pool.query(
            `SELECT P_DESCRIP, P_PREVEN, P_INVACT, P_OBSLAR, P_PREPROM
             FROM PRODUCTOMy
             WHERE P_CODIGO = ?
             LIMIT 1`,
            [codigo]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        return res.status(200).json(rows[0]);

    } catch (error) {

        console.error('Error al consultar el producto:', error);

        return res.status(500).json({
            error: 'Error del servidor'
        });
    }
}
