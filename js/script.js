document.addEventListener('DOMContentLoaded', function() {
    // Manejar los botones de "Hacer Pedido"
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const producto = e.target.closest('.producto-card');
            const nombreProducto = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('.precio').textContent;
            
            // Scroll suave hasta el formulario
            document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
            
            // Pre-llenar el campo de mensaje con la información del producto
            const mensaje = document.querySelector('#mensaje');
            mensaje.value = `Me interesa el producto: ${nombreProducto} - ${precio}`;
            
            // Seleccionar automáticamente "Producto del catálogo"
            document.querySelector('#tipo-pedido').value = 'catalogo';
        });
    });

    // Validación y envío del formulario
    const formulario = document.querySelector('#formulario-contacto');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica del formulario
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const direccion = document.querySelector('#direccion').value;
        const tipoPedido = document.querySelector('#tipo-pedido').value;
        const mensaje = document.querySelector('#mensaje').value;

        if (!nombre || !email || !telefono || !direccion || !tipoPedido || !mensaje) {
            alert('Por favor, complete todos los campos del formulario');
            return;
        }

        // Formatear el mensaje para WhatsApp
        const mensajeWhatsApp = `¡Hola Aylin! Te contacto desde la web Aylin’s Crochet World.

*Datos del cliente:*
Nombre: ${nombre}
Email: ${email}
Teléfono: ${telefono}

*Dirección de envío:*
${direccion}

*Tipo de pedido:* ${tipoPedido}

*Mensaje:*
${mensaje}`;

        // Codificar el mensaje para la URL
        const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
        
        // Crear el enlace de WhatsApp con el número proporcionado
        const urlWhatsApp = `https://wa.me/5215571480066?text=${mensajeCodificado}`;
        
        // Abrir WhatsApp en una nueva pestaña
        window.open(urlWhatsApp, '_blank');
        
        // Limpiar el formulario
        formulario.reset();
    });

    // Cambiar el placeholder del mensaje según el tipo de pedido
    document.querySelector('#tipo-pedido').addEventListener('change', function(e) {
        const mensaje = document.querySelector('#mensaje');
        if (e.target.value === 'personalizado') {
            mensaje.placeholder = 'Por favor, describe detalladamente el producto que deseas. Incluye:\n- Tipo de producto\n- Tamaño deseado\n- Colores preferidos\n- Detalles especiales\n\nRecuerda que puedes enviar imágenes de referencia por WhatsApp.';
        } else {
            mensaje.placeholder = 'Escribe tu mensaje aquí...';
        }
    });

    // Función para el sistema de filtrado de productos
    const btnFiltros = document.querySelectorAll('.btn-filtro');
    const productos = document.querySelectorAll('.producto-card');

    btnFiltros.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            btnFiltros.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            btn.classList.add('active');

            const categoria = btn.getAttribute('data-categoria');

            // Filtrar productos
            productos.forEach(producto => {
                if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
                    producto.classList.remove('oculto');
                    producto.style.display = '';
                } else {
                    producto.classList.add('oculto');
                    // Ocultar completamente después de la animación
                    setTimeout(() => {
                        if (producto.classList.contains('oculto')) {
                            producto.style.display = 'none';
                        }
                    }, 500);
                }
            });
        });
    });

    // Funcionalidad del Modal
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');

    // Agregar click event a todas las imágenes de productos
    document.querySelectorAll('.producto-card img').forEach(img => {
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            modal.classList.add('active');
        });
    });

    // Cerrar modal
    modalClose.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.classList.remove('active');
    });

    // Cerrar modal al hacer click fuera de la imagen
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
});