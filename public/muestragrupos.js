import { muestraproductos } from './muestraproductos.js';

export async function muestragrupos() {

    try {

        const respuesta = await fetch('/api/sacagrupos');

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        //const tbody = document.getElementById('grupos');
        const tbody = document.querySelector('#grupos tbody');

        tbody.innerHTML = '';

        //datos.forEach(doc => {
        for (const dato of datos) {

            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${dato.GP_DESCRIP}</td>
            `;

            // Hacer clic en la fila
            fila.addEventListener('click', async () => {
                //Aqui se va a llenar la otra tabla de productos
                await muestraproductos(dato.GP_CODIGO);
            });

            tbody.appendChild(fila);

        };

    } catch (error) {

        console.error('Error al cargar los grupos:', error);
        alert('No fue posible cargar los grupos');

    }
}
