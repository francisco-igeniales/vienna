function formatearFecha(fecha) {

   //2026-06-01T05:00:00.000Z

    const dia = fecha.substring(8, 10);

    const mes = fecha.substring(5, 7);

    const anio = fecha.substring(0, 4);

    return `${dia}/${mes}/${anio}`;
}

export async function muestracursos() {

    try {

        const respuesta = await fetch('/api/sacacursos');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        //const tbody = document.getElementById('grupos');
        const tbody = document.querySelector('#Capacitaciones tbody');

        tbody.innerHTML = '';

        datos.forEach(doc => {

            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${formatearFecha(doc.CM_FECHA)}</td>
                <td>${doc.CM_HORA}</td>
                <td>${doc.CM_CURSO}</td>
                <td>${doc.CM_INSTRUCTOR}</td>
                <td>${doc.CM_COSTO}</td>
                <td>${doc.CM_LUGDISP}</td>
            `;

            tbody.appendChild(fila);

        });

    } catch (error) {

        console.error('Error al cargar las capacitaciones:', error);
        alert('No fue posible cargar las capacitaciones');

    }
}
