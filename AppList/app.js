document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('sesion_sopas') !== 'activa') {
        window.location.href = 'login.html';
        return;
    }

    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('sesion_sopas');
            localStorage.removeItem('usuario_sopas');
            window.location.href = 'login.html';
        });
    }

    let pedidos = JSON.parse(localStorage.getItem('sopas_pedidos')) || pedidosIniciales;

    // Elementos DOM
    const listaPedidosEl = document.getElementById('listaPedidos');
    const totalSopasEl = document.getElementById('totalSopas');
    const totalEntregadasEl = document.getElementById('totalEntregadas');
    const totalPendientesEl = document.getElementById('totalPendientes');
    const totalCobradoEl = document.getElementById('totalCobrado');
    const totalPorCobrarEl = document.getElementById('totalPorCobrar');
    
    const pedidoForm = document.getElementById('pedidoForm');
    const pedidoIdInput = document.getElementById('pedidoId');
    const nombreInput = document.getElementById('nombreCliente');
    const cantidadInput = document.getElementById('cantidadSopas');
    const precioInput = document.getElementById('precioMonto');
    const refInput = document.getElementById('referenciaDescripcion');
    const grupoInput = document.getElementById('grupoPedido');
    const checkPagado = document.getElementById('checkPagado');
    const formTitle = document.getElementById('formTitle');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnCancelar = document.getElementById('btnCancelar');

    const btnTipoPreventa = document.getElementById('btnTipoPreventa');
    const btnTipoEvento = document.getElementById('btnTipoEvento');

    const inputBuscar = document.getElementById('inputBuscar');
    const filterButtons = document.querySelectorAll('.btn-filter');

    let tarifaActualPorPlato = 5.00; // $5.00 preventa por defecto
    let filtroActual = 'todos';

    // Botones rápidos para cambiar tarifa ($5 o $6)
    if (btnTipoPreventa && btnTipoEvento) {
        btnTipoPreventa.addEventListener('click', () => {
            tarifaActualPorPlato = 5.00;
            calcularMontoAuto();
        });

        btnTipoEvento.addEventListener('click', () => {
            tarifaActualPorPlato = 6.00;
            calcularMontoAuto();
        });
    }

    // Auto-calcular precio según cantidad y tarifa
    cantidadInput.addEventListener('input', calcularMontoAuto);

    function calcularMontoAuto() {
        const cant = parseInt(cantidadInput.value) || 1;
        precioInput.value = (cant * tarifaActualPorPlato).toFixed(2);
    }

    function guardarLocal() {
        localStorage.setItem('sopas_pedidos', JSON.stringify(pedidos));
        actualizarResumen();
    }

    function actualizarResumen() {
        let total = 0;
        let entregadas = 0;
        let pendientes = 0;
        let cobrado = 0;
        let porCobrar = 0;

        pedidos.forEach(p => {
            const cant = parseInt(p.sopas) || 0;
            const monto = parseFloat(p.monto) || (cant * 5.00); // $5.00 preventa por defecto

            total += cant;
            if (p.entregado) entregadas += cant;
            else pendientes += cant;

            if (p.pagado) cobrado += monto;
            else porCobrar += monto;
        });

        totalSopasEl.textContent = total;
        totalEntregadasEl.textContent = entregadas;
        totalPendientesEl.textContent = pendientes;
        if (totalCobradoEl) totalCobradoEl.textContent = `$${cobrado.toFixed(2)}`;
        if (totalPorCobrarEl) totalPorCobrarEl.textContent = `$${porCobrar.toFixed(2)}`;
    }

    function renderizarLista() {
        listaPedidosEl.innerHTML = '';
        const textoBusqueda = inputBuscar.value.toLowerCase().trim();

        const pedidosFiltrados = pedidos.filter(p => {
            if (filtroActual === 'pendientes' && p.entregado) return false;
            if (filtroActual === 'no-pagados' && p.pagado) return false;
            if (filtroActual === 'pagados' && !p.pagado) return false;

            const coincideNombre = p.nombre.toLowerCase().includes(textoBusqueda);
            const coincideRef = (p.ref || '').toLowerCase().includes(textoBusqueda);
            const coincideGrupo = (p.grupo || '').toLowerCase().includes(textoBusqueda);

            return coincideNombre || coincideRef || coincideGrupo;
        });

        if (pedidosFiltrados.length === 0) {
            listaPedidosEl.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🍲</div>
                    <p>No se encontraron pedidos con los criterios aplicados.</p>
                </div>
            `;
            return;
        }

        pedidosFiltrados.forEach(p => {
            const li = document.createElement('li');
            li.className = `pedido-item ${p.entregado ? 'entregado' : ''}`;
            const montoCalculado = parseFloat(p.monto) || (parseInt(p.sopas) * 5.00);

            li.innerHTML = `
                <div class="pedido-info">
                    <label class="checkbox-container" title="Marcar Entrega">
                        <input type="checkbox" class="checkbox-entregado" data-id="${p.id}" ${p.entregado ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                    <div class="pedido-detalles">
                        <div class="pedido-main-title">
                            <span class="pedido-nombre">${p.nombre}</span>
                            <span class="pedido-badge-sopas">${p.sopas} ${p.sopas === 1 ? 'Sopa' : 'Sopas'}</span>
                            <span style="font-weight:800; color:#34D399; font-size:0.9rem;">$${montoCalculado.toFixed(2)}</span>
                            <button class="btn-pay-toggle ${p.pagado ? 'paid' : 'unpaid'}" data-id="${p.id}">
                                ${p.pagado ? '🟢 PAGADO' : '🔴 DEBE'}
                            </button>
                        </div>
                        <div class="pedido-meta">
                            ${p.ref ? `<span class="pedido-ref">📌 ${p.ref}</span>` : ''}
                            ${p.grupo ? `<span class="pedido-grupo">👥 ${p.grupo}</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="pedido-acciones">
                    <button class="btn-icon edit" onclick="editarPedido(${p.id})" title="Editar Pedido">✏️</button>
                    <button class="btn-icon delete" onclick="eliminarPedido(${p.id})" title="Eliminar Pedido">🗑️</button>
                </div>
            `;

            listaPedidosEl.appendChild(li);
        });

        // Eventos Entrega
        document.querySelectorAll('.checkbox-entregado').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = pedidos.find(p => p.id === id);
                if (item) {
                    item.entregado = e.target.checked;
                    guardarLocal();
                    renderizarLista();
                }
            });
        });

        // Eventos Pago
        document.querySelectorAll('.btn-pay-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                const item = pedidos.find(p => p.id === id);
                if (item) {
                    item.pagado = !item.pagado;
                    guardarLocal();
                    renderizarLista();
                }
            });
        });
    }

    // Guardar / Editar
    pedidoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = pedidoIdInput.value;
        const nombre = nombreInput.value.trim();
        const sopas = parseInt(cantidadInput.value);
        const monto = parseFloat(precioInput.value) || (sopas * tarifaActualPorPlato);
        const ref = refInput.value.trim();
        const grupo = grupoInput.value.trim();
        const pagado = checkPagado.checked;

        if (id) {
            const item = pedidos.find(p => p.id === parseInt(id));
            if (item) {
                item.nombre = nombre;
                item.sopas = sopas;
                item.monto = monto;
                item.ref = ref;
                item.grupo = grupo;
                item.pagado = pagado;
            }
        } else {
            const nuevoPedido = {
                id: Date.now(),
                nombre: nombre,
                sopas: sopas,
                monto: monto,
                ref: ref,
                grupo: grupo,
                entregado: false,
                pagado: pagado
            };
            pedidos.unshift(nuevoPedido);
        }

        guardarLocal();
        resetFormulario();
        renderizarLista();
    });

    window.editarPedido = function(id) {
        const item = pedidos.find(p => p.id === id);
        if (item) {
            pedidoIdInput.value = item.id;
            nombreInput.value = item.nombre;
            cantidadInput.value = item.sopas;
            precioInput.value = item.monto || (item.sopas * 5.00);
            refInput.value = item.ref || '';
            grupoInput.value = item.grupo || '';
            checkPagado.checked = !!item.pagado;

            formTitle.textContent = 'Editar Pedido';
            btnGuardar.textContent = 'Actualizar Pedido';
            btnCancelar.style.display = 'inline-flex';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    window.eliminarPedido = function(id) {
        if (confirm('¿Deseas eliminar este pedido del listado?')) {
            pedidos = pedidos.filter(p => p.id !== id);
            guardarLocal();
            renderizarLista();
        }
    };

    btnCancelar.addEventListener('click', resetFormulario);

    function resetFormulario() {
        pedidoIdInput.value = '';
        pedidoForm.reset();
        tarifaActualPorPlato = 5.00;
        formTitle.textContent = 'Agregar Nuevo Pedido';
        btnGuardar.textContent = 'Guardar Pedido';
        btnCancelar.style.display = 'none';
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filtroActual = btn.dataset.filter;
            renderizarLista();
        });
    });

    inputBuscar.addEventListener('input', renderizarLista);

    actualizarResumen();
    renderizarLista();
});