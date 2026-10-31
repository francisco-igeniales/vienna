export async function muestracoincide(p_palabra) {

    try {
        const palabra = { palabra: p_palabra};
        const respuesta = await fetch('/api/sacacoincide',{ 
        method: 'POST', headers: { 'Content-Type': 'application/json' },body: JSON.stringify(palabra)});
        

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
                <td>${doc.P_INVACT}</td>
            `;

            // Hacer clic en la fila
            fila.addEventListener('click', () => {

                 //Aqui se va a mostrar el detalle del producto
                 window.location.href =  `/detalle.html?codigo=${encodeURIComponent(doc.P_CODIGO)}`;

            });

            tbody.appendChild(fila);

        });

    } catch (error) {

        console.error('Error al cargar los productos:', error);
        alert('No fue posible cargar los productos');

    }
}
