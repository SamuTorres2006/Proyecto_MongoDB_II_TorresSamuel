use ("Acme_Corporate");

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
                telefono: { bsonType: 'string', pattern: "^[0-9]{7,15}$" },
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

// Creacion de Roles
db.createRole({
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
            actions: ["find", "insert", "update"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "contratos" },
            actions: ["find", "insert", "update"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "novedades" },
            actions: ["find", "insert", "update"]
        },
        {
            resource: { db: "Acme_Corporate", collection: "nominas" },
            actions: ["find", "insert", "update"]
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

