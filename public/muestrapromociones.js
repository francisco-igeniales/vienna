export async function muestrapromociones() {

    try {

        const respuesta = await fetch('/api/sacapromociones', { method: 'POST' });
       

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        const tbody = document.querySelector('#Productos tbody');

        tbody.innerHTML = '';

        datos.forEach(doc => {

            const fila = document.createElement('tr');

            fila.innerHTML = `
                <td>${doc.P_CODIGO}</td>
                <td>${doc.P_DESCRIP}</td>
                <td>${doc.P_PREVEN}</td>
                <td>${doc.P_PREPROM}</td>
                <td>${doc.P_INVACT}</td>
            `;

            // Hacer clic en la fila
            fila.addEventListener('click', async () => {
                
              window.location.href =  `/detallepromo.html?codigo=${encodeURIComponent(doc.P_CODIGO)}`;

            });

            tbody.appendChild(fila);

        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
        alert('No fue posible cargar los productos');

    }
}
