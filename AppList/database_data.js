// Carga Inicial de Datos de Sopas de Gallina
const pedidosIniciales = [
    // --- PEDIDOS INDIVIDUALES (PREVENTA / LOCAL) ---
    { id: 1, nombre: "Madelín Hernández", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 2, nombre: "Arelis Melgar", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 3, nombre: "Elsy González", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 4, nombre: "Iginia García", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 5, nombre: "Concepción Segovia", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 6, nombre: "Marina Rodríguez", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 7, nombre: "Silvia Ortiz", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 8, nombre: "Dinora Raimundo", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 9, nombre: "Verónica Machado", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 10, nombre: "Santos Dagoberto", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 11, nombre: "Deysi Recinos", sopas: 3, monto: 15.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 12, nombre: "Carlota Gutiérrez", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 13, nombre: "Emilia Raimundo", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 14, nombre: "Ruiby Ventura", sopas: 4, monto: 20.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 15, nombre: "Lili", sopas: 1, monto: 5.00, ref: "Hermana", grupo: "", entregado: false, pagado: false },
    { id: 16, nombre: "Enrique Contreras", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 17, nombre: "Tía Rosa Pérez", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 18, nombre: "Cristina Ferrufino", sopas: 2, monto: 10.00, ref: "El Tejar", grupo: "", entregado: false, pagado: false },
    { id: 19, nombre: "Deysi Pérez", sopas: 1, monto: 5.00, ref: "Hermana de Ruberto", grupo: "", entregado: false, pagado: false },
    { id: 20, nombre: "Yasmín", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 21, nombre: "Marili Cisneros", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 22, nombre: "Wendy Amador", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 23, nombre: "Lili Nájera Molina", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 24, nombre: "Alicia Pérez", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 25, nombre: "Angélica Vicente", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 26, nombre: "Álvaro Cruz", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 27, nombre: "Yesenia Cruz", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 28, nombre: "Idalia Rodríguez", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 29, nombre: "Mari Raimundo", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 30, nombre: "Daniel Méndez", sopas: 4, monto: 20.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 31, nombre: "Eulogio Romero", sopas: 3, monto: 15.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 32, nombre: "Laura de Samuel", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 33, nombre: "Reyes de Griselda Elsy Melgar", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 34, nombre: "William Chávez", sopas: 3, monto: 15.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 35, nombre: "Katherine Ventura", sopas: 2, monto: 10.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 36, nombre: "Amilcar Alvarado", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 37, nombre: "Berta Hernández", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 38, nombre: "Orbelia Alvarado", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },
    { id: 39, nombre: "Mirna Pérez", sopas: 1, monto: 5.00, ref: "", grupo: "", entregado: false, pagado: false },

    // --- GRUPOS INTERNACIONALES (PAGADOS DESDE EL EXTRANJERO) ---
    // 1. Pedido Ángela Ramírez ($50.00 - 10 sopas)
    { id: 40, nombre: "Máxima Ainila", sopas: 3, monto: 15.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 41, nombre: "Nayito", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 42, nombre: "Genara", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 43, nombre: "Emilia Raimundo", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 44, nombre: "Clara Coto", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 45, nombre: "Benigna Nájera", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 46, nombre: "Ernestina", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },
    { id: 47, nombre: "Ofelita", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Ángela Ramírez ($50)", entregado: false, pagado: true },

    // 2. Pedido Rubidia ($50.00 - 10 sopas)
    { id: 48, nombre: "Maritza", sopas: 10, monto: 50.00, ref: "Jar / donde Maritza (Internacional)", grupo: "Pedido Rubidia ($50)", entregado: false, pagado: true },

    // 3. Pedido Juan Carlos ($40.00 - 8 sopas)
    { id: 49, nombre: "Felipa Vicente", sopas: 2, monto: 10.00, ref: "Jar / donde Felipa (Internacional)", grupo: "Pedido Juan Carlos ($40)", entregado: false, pagado: true },
    { id: 50, nombre: "Roxana Ramírez", sopas: 3, monto: 15.00, ref: "Internacional", grupo: "Pedido Juan Carlos ($40)", entregado: false, pagado: true },
    { id: 51, nombre: "Edelmira Rodríguez", sopas: 2, monto: 10.00, ref: "Internacional", grupo: "Pedido Juan Carlos ($40)", entregado: false, pagado: true },
    { id: 52, nombre: "Mecha", sopas: 1, monto: 5.00, ref: "Internacional", grupo: "Pedido Juan Carlos ($40)", entregado: false, pagado: true },

    // 4. Pedido Flor Reyes ($40.00 - 8 sopas)
    { id: 53, nombre: "Flor Reyes (Distribución Pendiente)", sopas: 8, monto: 40.00, ref: "Internacional (Asignación Pendiente)", grupo: "Pedido Flor Reyes ($40)", entregado: false, pagado: true },

    // 5. Pedido Simón Segovia (Pagado desde el extranjero)
    { id: 54, nombre: "Concepción Hernández", sopas: 1, monto: 5.00, ref: "Mamá (Internacional)", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 55, nombre: "María Hernández", sopas: 3, monto: 15.00, ref: "Pilanga (Internacional)", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 56, nombre: "Fabián Nájera", sopas: 3, monto: 15.00, ref: "Paquito (Internacional)", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 57, nombre: "Karen Segovia", sopas: 2, monto: 10.00, ref: "Internacional", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 58, nombre: "Moncho López", sopas: 2, monto: 10.00, ref: "Colonia (Internacional)", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 59, nombre: "Carla Segovia", sopas: 2, monto: 10.00, ref: "Calvario (Internacional)", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 60, nombre: "Max Nájera", sopas: 3, monto: 15.00, ref: "Internacional", grupo: "Pedido Simón Segovia", entregado: false, pagado: true },
    { id: 61, nombre: "Noel Vicente", sopas: 3, monto: 15.00, ref: "Internacional", grupo: "Pedido Simón Segovia", entregado: false, pagado: true }
];