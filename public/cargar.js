function formatearFecha(fecha) {

    const f = new Date(fecha);

    const dia = String(f.getDate()).padStart(2, '0');

    const mes = String(f.getMonth() + 1).padStart(2, '0');

    const anio = f.getFullYear();

    return `${dia}-${mes}-${anio}`;
}

export async function cargar() {

    try {

        const respuesta = await fetch('/api/departamentos');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        const tbody = document.getElementById('tbody');

        tbody.innerHTML = '';

        datos.forEach(doc => {

            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${doc.DP_CODDEP}</td>
                <td>${doc.DP_DESCRIP}</td>
            `;

            // Hacer clic en la fila
            fila.addEventListener('click', () => {

                const codigo = encodeURIComponent(doc.DP_CODDEP);
                const nombre = encodeURIComponent(doc.DP_DESCRIP);

                window.location.href =
                    `departamento.html?codigo=${codigo}&nombre=${nombre}`;

            });

            tbody.appendChild(fila);

        });

    } catch (error) {

        console.error('Error al cargar departamentos:', error);
        alert('No fue posible cargar los departamentos.');

    }
}
