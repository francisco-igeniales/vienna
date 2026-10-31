export async function mandamensajeunico(pmensaje, penviadoa, pusuario) {
    try {

        //const { mensaje, enviadoa, usuario } = req.body;
        const datos = { mensaje: pmensaje, enviadoa: penviadoa, usuario: pusuario};
        const tbody = document.getElementById('listaMensajes');

        const respuesta = await fetch('/api/guardamensajeunico', { 
        method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify(datos)});

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        } else {
            //Se agrega a la tabla
               tbody.innerHTML += `
                <tr>
                    <td>${'YO:' + pmensaje}</td>
                </tr>
            `;

        }

    } catch (error) {

        console.error("Error al mandar mensaje unico", error);

    }
}
