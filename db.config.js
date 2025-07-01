use Acme_Corporate;

db.createCollection("empleados", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["numero_identificacion", "nombres", "apellidos", "ciudad", "genero", "activo"],
            properties: {
                numero_identificacion: {
                    bsonType: "int",
                    description: "Debe ser un entero y es obligatorio"
                },
                nombres: {
                    bsonType: "string",
                    description: "Nombres del empleado"
                },
                apellidos: {
                    bsonType: "string",
                    description: "Apellidos del empleado"
                },
                telefono: {
                    bsonType: "int"
                },
                email: {
                    bsonType: "string",
                    pattern: "^.+@.+\\..+$",
                    description: "Debe ser un email válido"
                },
                genero: {
                    enum: ["M", "F", "O"],
                    description: "Solo puede ser M, F u O"
                },
                ciudad: {
                    bsonType: "object",
                    required: ["codigo", "nombre", "departamento"],
                    properties: {
                        codigo: { bsonType: "int" },
                        nombre: { bsonType: "string" },
                        departamento: {
                            bsonType: "object",
                            required: ["codigo", "nombre"],
                            properties: {
                                codigo: { bsonType: "int" },
                                nombre: { bsonType: "string" }
                            }
                        }
                    }
                },
                activo: {
                    bsonType: "bool",
                    description: "Debe ser true o false"
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});

db.empleados.insertOne({
    tipo_identificacion: "CC",
    numero_identificacion: 123465789,
    nombres: "Samuel Felipe",
    apellidos: "Torres Sanchez",
    edad: 24,
    telefono: 318495481,
    email: "STorres@mail.com",
    genero: "M",
    ciudad: {
        codigo: 57,
        nombre: "Bogotá",
        departamento: {
            codigo: 25084,
            nombre: "Cundinamarca",
        },
    },
    activo: true,
});

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
                    description: "Duración en meses"
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

db.contratos.insertOne({
    codigo: 001,
    empleado_id: ObjectId('6864125a92428480583510d2'),
    tipo_contrato: {
        codigo: 01,
        nombre: "Termino indefinido",
        cargo: {
            codigo: 10,
            nombre: "Programador junior",
            area: {
                codigo: 1,
                codigo: "Programación"
            },
        },
        duracion: 7,
        salario_base: 20000000,
        activo: true,
    },
});

db.contratos.insertOne({
    codigo: 1,
    empleado_id: ObjectId('6864125a92428480583510d2'),
    tipo_contrato: {
        codigo: 1,
        nombre: "Termino indefinido"
    },
    cargo: {
        codigo: 10,
        nombre: "Programador junior",
        area: {
            codigo: 1,
            nombre: "Programación"
        }
    },
    duracion: 7,
    salario_base: 20000000,
    activo: true
});


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
    },
    validationLevel: "strict"
});

db.novedades.insertOne({
    empleado_id: ObjectId('6864125a92428480583510d2'),
    tipo: {
        codigo: 31,
        nombre: "Inasistencia"
    },
    fecha_inicial: ISODate("2025-04-21T10:00:00Z"),
    fecha_final: ISODate("2025-04-23T10:00:00Z"),
    observaciones: "El empleado faltó por lesión grave"
});