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

        // Evento para activar la impresión / PDF
const btnImprimirPdf = document.getElementById('btnImprimirPdf');
if (btnImprimirPdf) {
    btnImprimirPdf.addEventListener('click', () => {
        window.print();
    });
}
    }

    let pedidos = JSON.parse(localStorage.getItem('sopas_pedidos')) || pedidosIniciales;
    let capacidadTotal = parseInt(localStorage.getItem('sopas_capacidad_total')) || 150;

    const inputCapacidadTotal = document.getElementById('inputCapacidadTotal');
    const btnGuardarCapacidad = document.getElementById('btnGuardarCapacidad');
    const metricCapacidad = document.getElementById('metricCapacidad');
    const metricApartados = document.getElementById('metricApartados');
    const metricDisponibles = document.getElementById('metricDisponibles');
    const metricRecaudado = document.getElementById('metricRecaudado');
    const progressBarFill = document.getElementById('progressBarFill');
    const tablaExcelBody = document.getElementById('tablaExcelBody');

    inputCapacidadTotal.value = capacidadTotal;

    btnGuardarCapacidad.addEventListener('click', () => {
        const nuevoLimite = parseInt(inputCapacidadTotal.value);
        if (nuevoLimite && nuevoLimite > 0) {
            capacidadTotal = nuevoLimite;
            localStorage.setItem('sopas_capacidad_total', capacidadTotal);
            actualizarMetricas();
        }
    });

    function actualizarMetricas() {
        let totalPlatosPedidos = 0;
        let totalDineroCobrado = 0;

        pedidos.forEach(p => {
            const cant = parseInt(p.sopas) || 0;
            const monto = parseFloat(p.monto) || (cant * 5.00);

            totalPlatosPedidos += cant;
            if (p.pagado) {
                totalDineroCobrado += monto;
            }
        });

        const platosDisponibles = capacidadTotal - totalPlatosPedidos;
        const porcentajeOcupado = Math.min(100, Math.max(0, (totalPlatosPedidos / capacidadTotal) * 100));

        metricCapacidad.textContent = capacidadTotal;
        metricApartados.textContent = totalPlatosPedidos;
        metricDisponibles.textContent = platosDisponibles;
        if (metricRecaudado) metricRecaudado.textContent = `$${totalDineroCobrado.toFixed(2)}`;

        if (platosDisponibles < 10) {
            metricDisponibles.style.color = '#EF4444';
        } else {
            metricDisponibles.style.color = '#34D399';
        }

        progressBarFill.style.width = `${porcentajeOcupado}%`;
    }

    function renderizarTablaExcel() {
        tablaExcelBody.innerHTML = '';

        const grupos = {};
        const individuales = [];

        pedidos.forEach(p => {
            if (p.grupo && p.grupo.trim() !== '') {
                if (!grupos[p.grupo]) grupos[p.grupo] = [];
                grupos[p.grupo].push(p);
            } else {
                individuales.push(p);
            }
        });

        let indexRow = 1;

        for (const [nombreGrupo, items] of Object.entries(grupos)) {
            let totalSopasGrupo = items.reduce((sum, item) => sum + (parseInt(item.sopas) || 0), 0);
            let totalMontoGrupo = items.reduce((sum, item) => sum + (parseFloat(item.monto) || ((parseInt(item.sopas) || 0) * 5.00)), 0);

            const groupHeaderTr = document.createElement('tr');
            groupHeaderTr.className = 'group-header-row';
            groupHeaderTr.innerHTML = `
                <td colspan="8">
                    👥 CATEGORÍA / GRUPO: ${nombreGrupo} — (${totalSopasGrupo} sopas | Total: $${totalMontoGrupo.toFixed(2)})
                </td>
            `;
            tablaExcelBody.appendChild(groupHeaderTr);

            items.forEach(p => {
                const tr = document.createElement('tr');
                const monto = parseFloat(p.monto) || (parseInt(p.sopas) * 5.00);

                tr.innerHTML = `
                    <td>${indexRow++}</td>
                    <td><strong>${p.nombre}</strong></td>
                    <td><span class="pedido-badge-sopas">${p.sopas}</span></td>
                    <td style="font-weight:700; color:#34D399;">$${monto.toFixed(2)}</td>
                    <td>${p.ref ? `📌 ${p.ref}` : '-'}</td>
                    <td>${p.grupo}</td>
                    <td>
                        <span class="badge-status ${p.entregado ? 'delivered' : 'pending'}">
                            ${p.entregado ? '✔ Entregado' : '⏳ Pendiente'}
                        </span>
                    </td>
                    <td>
                        <span class="badge-pay ${p.pagado ? 'paid' : 'unpaid'}">
                            ${p.pagado ? '🟢 Pagado' : '🔴 Debe'}
                        </span>
                    </td>
                `;
                tablaExcelBody.appendChild(tr);
            });
        }

        if (individuales.length > 0) {
            const indHeaderTr = document.createElement('tr');
            indHeaderTr.className = 'group-header-row';
            indHeaderTr.innerHTML = `
                <td colspan="8">
                    👤 PEDIDOS INDIVIDUALES DIRECTOS
                </td>
            `;
            tablaExcelBody.appendChild(indHeaderTr);

            individuales.forEach(p => {
                const tr = document.createElement('tr');
                const monto = parseFloat(p.monto) || (parseInt(p.sopas) * 5.00);

                tr.innerHTML = `
                    <td>${indexRow++}</td>
                    <td><strong>${p.nombre}</strong></td>
                    <td><span class="pedido-badge-sopas">${p.sopas}</span></td>
                    <td style="font-weight:700; color:#34D399;">$${monto.toFixed(2)}</td>
                    <td>${p.ref ? `📌 ${p.ref}` : '-'}</td>
                    <td>Individual</td>
                    <td>
                        <span class="badge-status ${p.entregado ? 'delivered' : 'pending'}">
                            ${p.entregado ? '✔ Entregado' : '⏳ Pendiente'}
                        </span>
                    </td>
                    <td>
                        <span class="badge-pay ${p.pagado ? 'paid' : 'unpaid'}">
                            ${p.pagado ? '🟢 Pagado' : '🔴 Debe'}
                        </span>
                    </td>
                `;
                tablaExcelBody.appendChild(tr);
            });
        }
    }

    actualizarMetricas();
    renderizarTablaExcel();
});