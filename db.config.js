use Acme_Corporate;

// creacion de la coleccion de empleados
db.createCollection("empleados", {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: [
                'tipo_identificacion',
                'numero_identificacion',
                'nombres',
                'apellidos',
                'genero',
                'ciudad',
                'activo'
            ],
            properties: {
                tipo_identificacion: { bsonType: 'string' },
                numero_identificacion: { bsonType: 'int' },
                nombres: { bsonType: 'string' },
                apellidos: { bsonType: 'string' },
                telefono: { bsonType: "int", pattern: "^[0-9]{7,15}$" },
                email: { bsonType: 'string', pattern: '^.+@.+\\..+$' },
                genero: { 'enum': ['M', 'F', 'O'] },
                ciudad: {
                    bsonType: 'object',
                    required: ['codigo', 'nombre', 'departamento'],
                    properties: {
                        codigo: { bsonType: 'int' },
                        nombre: { bsonType: 'string' },
                        departamento: {
                            bsonType: 'object',
                            required: ['codigo', 'nombre'],
                            properties: {
                                codigo: { bsonType: 'int' },
                                nombre: { bsonType: 'string' }
                            }
                        }
                    }
                },
                activo: { bsonType: 'bool' }
            }
        }
    }
});
db.empleados.createIndex({ numero_identificacion: 1 }, { unique: true });
db.empleados.createIndex({ "ciudad.nombre": 1 });
db.empleados.createIndex({ genero: 1 });

// inserción de empleados
db.empleados.insertMany([
    {
        tipo_identificacion: "CC",
        numero_identificacion: 1234567890,
        nombres: "Samuel Felipe",
        apellidos: "Torres Sánchez",
        telefono: 3184954811,
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
        numero_identificacion: 9876543210,
        nombres: "Laura Marcela",
        apellidos: "Gómez Rojas",
        telefono: 3201122334,
        email: "lgomez@mail.com",
        genero: "F",
        ciudad: {
            codigo: 05001,
            nombre: "Medellín",
            departamento: {
                codigo: 05,
                nombre: "Antioquia"
            }
        },
        activo: true
    },
    {
        tipo_identificacion: "TI",
        numero_identificacion: 1122334455,
        nombres: "Andrés David",
        apellidos: "Mora Castaño",
        telefono: 3213344556,
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
        numero_identificacion: 9988776655,
        nombres: "Mariana",
        apellidos: "Suárez López",
        telefono: 3106677889,
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

// creacion de la coleccion de contratos
db.createCollection("contratos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "codigo",
                "empleado_id",
                "tipo_contrato",
                "cargo",
                "salario_base",
                "activo"
            ],
            properties: {
                codigo: {
                    bsonType: "int",
                    description: "Código único del contrato"
                },
                empleado_id: {
                    bsonType: "objectId",
                    description: "Referencia al empleado"
                },
                tipo_contrato: {
                    bsonType: "object",
                    required: ["codigo", "nombre"],
                    properties: {
                        codigo: { bsonType: "int" },
                        nombre: { bsonType: "string" }
                    }
                },
                cargo: {
                    bsonType: "object",
                    required: ["codigo", "nombre", "area"],
                    properties: {
                        codigo: { bsonType: "int" },
                        nombre: { bsonType: "string" },
                        area: {
                            bsonType: "object",
                            required: ["codigo", "nombre"],
                            properties: {
                                codigo: { bsonType: "int" },
                                nombre: { bsonType: "string" }
                            }
                        }
                    }
                },
                duracion: {
                    bsonType: "int",
                    minimum: 1,
                    description: "Duración en meses del contrato"
                },
                salario_base: {
                    bsonType: "double",
                    minimum: 0,
                    description: "Salario mensual base"
                },
                activo: {
                    bsonType: "bool",
                    description: "Estado del contrato"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
db.contratos.createIndex({ codigo: 1 }, { unique: true });
db.contratos.createIndex({ empleado_id: 1 });
db.contratos.createIndex({ activo: 1 });
db.contratos.createIndex({ "tipo_contrato.codigo": 1 });
db.contratos.createIndex({ "cargo.codigo": 1 });
db.contratos.createIndex({ "cargo.area.codigo": 1 });

// inserción de contratos
db.contratos.insertMany([
    {
        codigo: 1,
        empleado_id: ObjectId("6865611780a9f4cd56e1a11b"),
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
        empleado_id: ObjectId("6865611780a9f4cd56e1a11c"),
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
        empleado_id: ObjectId("6865611780a9f4cd56e1a11d"),
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
        empleado_id: ObjectId("66a01d76cbbf6e7fc9173b04"),
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

//creacion de coleccion novedades
db.createCollection("novedades", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["empleado_id", "tipo", "fecha_inicial", "fecha_final", "observaciones"],
            properties: {
                empleado_id: { bsonType: "objectId" },
                tipo: {
                    bsonType: "object",
                    required: ["codigo", "nombre"],
                    properties: {
                        codigo: { bsonType: "int" },
                        nombre: { bsonType: "string" }
                    }
                },
                fecha_inicial: { bsonType: "date" },
                fecha_final: { bsonType: "date" },
                observaciones: { bsonType: "string" }
            }
        }
    }
});

//Inserción de novedades
db.novedades.insertMany([
    {
        empleado_id: ObjectId("6865611780a9f4cd56e1a11d"),
        tipo: {
            codigo: 1,
            nombre: "Falta"
        },
        fecha_inicial: ISODate("2025-06-01T00:00:00Z"),
        fecha_final: ISODate("2025-06-03T00:00:00Z"),
        observaciones: "Falta sin justificación"
    },
    {
        empleado_id: ObjectId("6865611780a9f4cd56e1a11e"),
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

//Creacion de coleccion nominas
db.createCollection("nominas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "codigo",
                "empleado_id",
                "fecha",
                "salario_base",
                "devengos",
                "deducciones"
            ],
            properties: {
                codigo: {
                    bsonType: "int",
                    description: "Código único de la nómina"
                },
                empleado_id: {
                    bsonType: "objectId",
                    description: "Referencia al empleado"
                },
                fecha: {
                    bsonType: "date",
                    description: "Fecha de generación de la nómina"
                },
                salario_base: {
                    bsonType: "double",
                    minimum: 0,
                    description: "Salario base mensual"
                },
                devengos: {
                    bsonType: "array",
                    description: "Lista de conceptos devengados",
                    items: {
                        bsonType: "object",
                        required: ["codigo", "nombre", "valor"],
                        properties: {
                            codigo: { bsonType: "int" },
                            nombre: { bsonType: "string" },
                            valor: { bsonType: "double", minimum: 0 }
                        }
                    }
                },
                deducciones: {
                    bsonType: "array",
                    description: "Lista de conceptos deducidos",
                    items: {
                        bsonType: "object",
                        required: ["codigo", "nombre", "valor"],
                        properties: {
                            codigo: { bsonType: "int" },
                            nombre: { bsonType: "string" },
                            valor: { bsonType: "double", minimum: 0 }
                        }
                    }
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
db.nominas.createIndex({ codigo: 1 }, { unique: true });
db.nominas.createIndex({ empleado_id: 1 });
db.nominas.createIndex({ fecha: 1 });

// Inserción de nóminas
db.nominas.insertMany([
    {
        codigo: 20250701,
        empleado_id: ObjectId("6865611780a9f4cd56e1a11b"),
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
        empleado_id: ObjectId("6865611780a9f4cd56e1a11c"),
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
        empleado_id: ObjectId("6865611780a9f4cd56e1a11d"),
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
        empleado_id: ObjectId("6865611780a9f4cd56e1a11e"),
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

// Creacion de Roles
db.getSiblingDB("Acme_Corporate").createRole({
    role: "administrador",
    privileges: [
        {
            resource: { db: "Acme_Corporate", collection: "" },
            actions: [
                "find", "insert", "update", "remove",
                "createCollection", "dropCollection",
                "createIndex", "dropIndex"
            ]
        }
    ],
    roles: [] 
});


db.createRole({
    role: "gestor_nomina",
    privileges: [
        {
            resource: { db: "Acme_Corporate", collection: "empleados" },
            actions: ["find", "insert", "update", "remove"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "contratos" },
            actions: ["find", "insert", "update", "remove"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "novedades" },
            actions: ["find", "insert", "update", "remove"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "nominas" },
            actions: ["find", "insert", "update", "remove"]
        }
    ],
    roles: []
});

db.createRole({
    role: "empleado",
    privileges: [
        {
            resource: { db: "Acme_Corporate", collection: "empleados" },
            actions: ["find"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "contratos" },
            actions: ["find"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "nominas" },
            actions: ["find"]
        }
    ],
    roles: []
});

db.createUser({
    user: "nombre_usuario",
    pwd: "contraseña_segura",
    roles: [
        { role: "empleado", db: "Acme_Corporate" }
    ]
});
