
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
            `SELECT P_IMG
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

        const imagen = rows[0].P_IMG;

        if (!imagen || imagen.length === 0) {
            return res.status(404).json({
                error: 'El producto no tiene imagen'
            });
        }

        // Identificar el formato de la imagen por sus bytes.
        let tipoImagen = 'application/octet-stream';

        if (imagen[0] === 0xFF && imagen[1] === 0xD8) {
            tipoImagen = 'image/jpeg';
        } else if (
            imagen[0] === 0x89 &&
            imagen[1] === 0x50 &&
            imagen[2] === 0x4E &&
            imagen[3] === 0x47
        ) {
            tipoImagen = 'image/png';
        } else if (
            imagen.toString('ascii', 0, 3) === 'GIF'
        ) {
            tipoImagen = 'image/gif';
        } else if (
            imagen.toString('ascii', 0, 4) === 'RIFF' &&
            imagen.toString('ascii', 8, 12) === 'WEBP'
        ) {
            tipoImagen = 'image/webp';
        }

        res.setHeader('Content-Type', tipoImagen);
        res.setHeader('Cache-Control', 'no-cache');

        return res.status(200).send(imagen);

    } catch (error) {

        console.error('Error al obtener imagen:', error);

        return res.status(500).json({
            error: 'Error del servidor'
        });
    }
}
