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

//creacion de coleccion de contratos
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

// inserción de datos para contratos
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

//Inserción de datos en novedades
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

//Creacion de coleccion nominas
db.createCollection("nominas", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["codigo", "fecha_inicial", "fecha_final", "contratos"],
            properties: {
                codigo: { bsonType: "string" },
                fecha_inicial: { bsonType: "date" },
                fecha_final: { bsonType: "date" },
                contratos: {
                    bsonType: "array",
                    minItems: 1,
                    items: {
                        bsonType: "object",
                        required: ["contrato_id", "salario_base", "devengos", "deducciones", "total_devengos", "total_deducciones", "neto_pagar"],
                        properties: {
                            contrato_id: { bsonType: "objectId" },
                            salario_base: { bsonType: "double" },
                            devengos: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["codigo", "nombre", "valor"],
                                    properties: {
                                        codigo: { bsonType: "string" },
                                        nombre: { bsonType: "string" },
                                        valor: { bsonType: "double" }
                                    }
                                }
                            },
                            deducciones: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["codigo", "nombre", "valor"],
                                    properties: {
                                        codigo: { bsonType: "string" },
                                        nombre: { bsonType: "string" },
                                        valor: { bsonType: "double" }
                                    }
                                }
                            },
                            novedades: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["tipo", "fecha_inicial", "fecha_final", "dias", "descuento"],
                                    properties: {
                                        tipo: {
                                            bsonType: "object",
                                            required: ["codigo", "nombre"],
                                            properties: {
                                                codigo: { bsonType: "string" },
                                                nombre: { bsonType: "string" }
                                            }
                                        },
                                        fecha_inicial: { bsonType: "date" },
                                        fecha_final: { bsonType: "date" },
                                        dias: { bsonType: "int" },
                                        descuento: { bsonType: "double" }
                                    }
                                }
                            },
                            total_devengos: { bsonType: "double" },
                            total_deducciones: { bsonType: "double" },
                            neto_pagar: { bsonType: "double" }
                        }
                    }
                }
            }
        }
    },
    validationLevel: "strict",
    validationAction: "error"
});
