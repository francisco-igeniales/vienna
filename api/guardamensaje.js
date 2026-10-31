import pool from '../lib/db.js';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Método no permitido'
        });
    }

    try {

        const { nombre, telefono, email, mensaje } = req.body;

        if (!telefono?.trim() && !email?.trim()) {
           return res.status(400).json({
           error: 'Debes proporcionar un teléfono o un correo electrónico' }); }

        await pool.query("INSERT INTO MENSAJEMy (ME_NOMBRE, ME_TELEFONO, ME_EMAIL, ME_MENSAJE) VALUES (?, ?, ?, ?);",[ nombre, telefono, email, mensaje ]);

        res.status(200).json({
            mensaje: 'Mensaje Enviado'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Error del servidor'
        });
    }
}
