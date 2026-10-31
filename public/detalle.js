const parametros = new URLSearchParams(window.location.search);
const codigo = parametros.get('codigo');

const nombreProducto = document.getElementById('nombreProducto');
const codigoProducto = document.getElementById('codigoProducto');
const precioProducto = document.getElementById('precioProducto');
const existenciaProducto = document.getElementById('existenciaProducto');
const imagenProducto = document.getElementById('imagenProducto');
const observacionesProducto = document.getElementById('observacionesProducto');

async function cargarDetalle() {

    if (!codigo) {
        nombreProducto.textContent = 'Código de producto no proporcionado';
        return;
    }

    codigoProducto.textContent = `Código: ${codigo}`;

    try {
        const respuesta = await fetch(
            `/api/sacadetalleproducto?codigo=${encodeURIComponent(codigo)}`
        );

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const producto = await respuesta.json();

        nombreProducto.textContent = producto.P_DESCRIP;

        precioProducto.textContent =
            Number(producto.P_PREVEN).toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });

        existenciaProducto.textContent =
            `Existencia: ${producto.P_INVACT} unidades`;

            observacionesProducto.value = producto.P_OBSLAR ?? '';

    } catch (error) {

        console.error('Error al cargar el detalle:', error);
        nombreProducto.textContent = 'No fue posible cargar el producto';
        precioProducto.textContent = 'Precio no disponible';
        existenciaProducto.textContent = 'Existencia no disponible';
        observacionesProducto.value =  'No fue posible cargar las observaciones';
    }

    // Cargar la imagen independientemente de los otros datos
    imagenProducto.src =
        `/api/imagenproducto?codigo=${encodeURIComponent(codigo)}`;

    imagenProducto.onerror = () => {
        imagenProducto.alt = 'Imagen no disponible';
    };
}
cargarDetalle();
