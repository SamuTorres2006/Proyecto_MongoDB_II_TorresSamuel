db.empleados.insertMany([
    {
        tipo_identificacion: "CC",
        numero_identificacion: "1234567894",
        nombres: "Samuel Felipe",
        apellidos: "Torres Sánchez",
        telefono: "318495481",
        email: "storres@mail.com",
        genero: "M",
        ciudad: {
            codigo: 11001,
            nombre: "Bogotá",
            departamento: {
                codigo: 11,
                nombre: "Bogotá D.C."
            }
        },
        activo: true
    },
    {
        tipo_identificacion: "CC",
        numero_identificacion: "9876543218",
        nombres: "Laura Marcela",
        apellidos: "Gómez Rojas",
        telefono: "320112233",
        email: "lgomez@mail.com",
        genero: "F",
        ciudad: {
            codigo: 34588,
            nombre: "Medellín",
            departamento: {
                codigo: 34,
                nombre: "Antioquia"
            }
        },
        activo: true
    },
    {
        tipo_identificacion: "TI",
        numero_identificacion: "1122334455",
        nombres: "Andrés David",
        apellidos: "Mora Castaño",
        telefono: "321334455",
        email: "amora@mail.com",
        genero: "M",
        ciudad: {
            codigo: 76001,
            nombre: "Cali",
            departamento: {
                codigo: 76,
                nombre: "Valle del Cauca"
            }
        },
        activo: false
    },
    {
        tipo_identificacion: "CE",
        numero_identificacion: "9988776655",
        nombres: "Mariana",
        apellidos: "Suárez López",
        telefono: "310667788",
        email: "msuarez@mail.com",
        genero: "F",
        ciudad: {
            codigo: 13001,
            nombre: "Cartagena",
            departamento: {
                codigo: 13,
                nombre: "Bolívar"
            }
        },
        activo: true
    }
]);
db.empleados.insertOne({
    tipo_identificacion: "TI",
    numero_identificacion: 112233445,
    nombres: "Ana María",
    apellidos: "Ramírez López",
    telefono: 300456789,
    email: "ana.ramirez@mail.com",
    genero: "F",
    ciudad: {
        codigo: 76001,
        nombre: "Cali",
        departamento: {
            codigo: 76,
            nombre: "Valle del Cauca"
        }
    },
    activo: true
});


db.contratos.insertMany([
    {
        codigo: 1,
        empleado_id: ObjectId("6866b488fd2e36294976149c"),
        tipo_contrato: {
            codigo: 100,
            nombre: "Término indefinido"
        },
        cargo: {
            codigo: 10,
            nombre: "Programador Junior",
            area: {
                codigo: 1,
                nombre: "Desarrollo"
            }
        },
        duracion: 12,
        salario_base: 2300000.1,
        activo: true
    },
    {
        codigo: 2,
        empleado_id: ObjectId("6866b488fd2e36294976149d"),
        tipo_contrato: {
            codigo: 101,
            nombre: "Término fijo"
        },
        cargo: {
            codigo: 11,
            nombre: "Diseñadora UI/UX",
            area: {
                codigo: 2,
                nombre: "Diseño"
            }
        },
        duracion: 6,
        salario_base: 2100000.1,
        activo: true
    },
    {
        codigo: 3,
        empleado_id: ObjectId("6866b488fd2e36294976149e"),
        tipo_contrato: {
            codigo: 102,
            nombre: "Por prestación de servicios"
        },
        cargo: {
            codigo: 12,
            nombre: "Analista de Datos",
            area: {
                codigo: 3,
                nombre: "Analítica"
            }
        },
        duracion: 4,
        salario_base: 3000000.1,
        activo: false
    },
    {
        codigo: 4,
        empleado_id: ObjectId("6866b488fd2e36294976149f"),
        tipo_contrato: {
            codigo: 103,
            nombre: "Temporal"
        },
        cargo: {
            codigo: 13,
            nombre: "Soporte Técnico",
            area: {
                codigo: 1,
                nombre: "Desarrollo"
            }
        },
        duracion: 8,
        salario_base: 1600000.1,
        activo: true
    }
]);
db.contratos.insertOne({
    codigo: 5,
    empleado_id: ObjectId("6866054c832b886c0b05da25"),
    tipo_contrato: {
        codigo: 2,
        nombre: "Término fijo"
    },
    cargo: {
        codigo: 102,
        nombre: "Diseñadora UX",
        area: {
            codigo: 20,
            nombre: "Diseño"
        }
    },
    duracion: 6,
    salario_base: 2100000.1,
    activo: true
});

db.novedades.insertMany([
    {
        empleado_id: ObjectId("6866b488fd2e36294976149d"),
        tipo: {
            codigo: 1,
            nombre: "Falta"
        },
        fecha_inicial: ISODate("2025-06-01T00:00:00Z"),
        fecha_final: ISODate("2025-06-03T00:00:00Z"),
        observaciones: "Falta sin justificación"
    },
    {
        empleado_id: ObjectId("6866b488fd2e36294976149e"),
        tipo: {
            codigo: 2,
            nombre: "Licencia no remunerada"
        },
        fecha_inicial: ISODate("2025-06-10T00:00:00Z"),
        fecha_final: ISODate("2025-06-12T00:00:00Z"),
        observaciones: "Licencia médica"
    }
]);
db.novedades.insertOne({
    empleado_id: ObjectId("6866054c832b886c0b05da25"),
    tipo: {
        codigo: 1,
        nombre: "Falta"
    },
    fecha_inicial: ISODate("2025-07-03T00:00:00Z"),
    fecha_final: ISODate("2025-07-05T00:00:00Z"),
    observaciones: "Ausencia justificada por motivos de salud"
});

db.nominas.insertMany([
    {
        codigo: 20250701,
        empleado_id: ObjectId("6866b488fd2e36294976149c"),
        fecha: ISODate("2025-07-01T00:00:00Z"),
        salario_base: 2000000.1,
        devengos: [
            { codigo: 1, nombre: "Salario básico", valor: 2000000.1 },
            { codigo: 2, nombre: "Auxilio de transporte", valor: 140606.1 }
        ],
        deducciones: [
            { codigo: 3, nombre: "Salud", valor: 80000.1 },
            { codigo: 4, nombre: "Pensión", valor: 80000.1 }
        ]
    },
    {
        codigo: 20250702,
        empleado_id: ObjectId("6866b488fd2e36294976149f"),
        fecha: ISODate("2025-07-01T00:00:00Z"),
        salario_base: 1800000.1,
        devengos: [
            { codigo: 1, nombre: "Salario básico", valor: 1800000.1 },
            { codigo: 2, nombre: "Auxilio de transporte", valor: 140606.1 }
        ],
        deducciones: [
            { codigo: 3, nombre: "Salud", valor: 72000.1 },
            { codigo: 4, nombre: "Pensión", valor: 72000.1 }
        ]
    },
    {
        codigo: 20250703,
        empleado_id: ObjectId("6866b488fd2e36294976149d"),
        fecha: ISODate("2025-07-01T00:00:00Z"),
        salario_base: 2500000.1,
        devengos: [
            { codigo: 1, nombre: "Salario básico", valor: 2500000.1 }
        ],
        deducciones: [
            { codigo: 3, nombre: "Salud", valor: 100000.1 },
            { codigo: 4, nombre: "Pensión", valor: 100000.1 },
            { codigo: 5, nombre: "Retención en la fuente", valor: 50000.1 }
        ]
    },
    {
        codigo: 20250704,
        empleado_id: ObjectId("6866b488fd2e36294976149e"),
        fecha: ISODate("2025-07-01T00:00:00Z"),
        salario_base: 1500000.1,
        devengos: [
            { codigo: 1, nombre: "Salario básico", valor: 1500000.1 },
            { codigo: 2, nombre: "Auxilio de transporte", valor: 140606.1 }
        ],
        deducciones: [
            { codigo: 3, nombre: "Salud", valor: 60000.1 },
            { codigo: 4, nombre: "Pensión", valor: 60000.1 }
        ]
    }
]);
db.nominas.insertOne({
    codigo: 20250710,
    empleado_id: ObjectId("6866054c832b886c0b05da25"),
    fecha: ISODate("2025-07-01T00:00:00Z"),
    salario_base: 2100000.1,
    devengos: [
        { codigo: 1, nombre: "Salario básico", valor: 2100000.1 },
        { codigo: 2, nombre: "Auxilio de transporte", valor: 140606.1 }
    ],
    deducciones: [
        { codigo: 3, nombre: "Salud", valor: 84000.1 },
        { codigo: 4, nombre: "Pensión", valor: 84000.1 }
    ]
});