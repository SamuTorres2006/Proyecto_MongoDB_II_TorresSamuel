// Primera agregación
db.contratos.aggregate([
{
    $match: { activo: true }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{
    $unwind: "$empleado"
},
{
    $project: {
    _id: 0,
    "area_codigo": "$cargo.area.codigo",
    "area_nombre": "$cargo.area.nombre",
    "cargo_codigo": "$cargo.codigo",
    "cargo_nombre": "$cargo.nombre",
    "tipo_identificacion": "$empleado.tipo_identificacion",
    "numero_identificacion": "$empleado.numero_identificacion",
    "nombres": "$empleado.nombres",
    "apellidos": "$empleado.apellidos",
    "telefono": "$empleado.telefono",
    "email": "$empleado.email",
    "genero": "$empleado.genero"
    }
}
]);


// Segunda agregación
db.nominas.aggregate([
{
    $match: { codigo: 20250701 }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{
    $unwind: "$empleado"
},
{
    $addFields: {
    total_devengos: {
        $sum: "$devengos.valor"
    },
    total_deducciones: {
        $sum: "$deducciones.valor"
    }
    }
},
{
    $project: {
    _id: 0,
    tipo_identificacion: "$empleado.tipo_identificacion",
    numero_identificacion: "$empleado.numero_identificacion",
    nombres: "$empleado.nombres",
    apellidos: "$empleado.apellidos",
    salario_base: 1,
    total_devengos: 1,
    total_deducciones: 1,
    neto_a_pagar: {
        $subtract: ["$total_devengos", "$total_deducciones"]
    }
    }
}
]);

// Tercera agregación
db.nominas.aggregate([
{
    $match: {
    _id: ObjectId("6865d999bffd764eb153c221"),
    empleado_id: ObjectId("6865611780a9f4cd56e1a11b")
    }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{
    $unwind: "$empleado"
},
{
    $project: {
    _id: 0,
    tipo_identificacion: "$empleado.tipo_identificacion",
    numero_identificacion: "$empleado.numero_identificacion",
    nombres: "$empleado.nombres",
    apellidos: "$empleado.apellidos",
    salario_base: 1,
    deducciones: {
        $map: {
        input: "$deducciones",
        as: "d",
        in: {
            codigo: "$$d.codigo",
            nombre: "$$d.nombre",
            valor: "$$d.valor"
        }
        }
    },
    devengos: {
        $map: {
        input: "$devengos",
        as: "v",
        in: {
            codigo: "$$v.codigo",
            nombre: "$$v.nombre",
            valor: "$$v.valor"
        }
        }
    }
    }
}
]);

// Cuarta agregación
db.empleados.aggregate([
{
    $group: {
    _id: {
        codigo: "$ciudad.codigo",
        nombre: "$ciudad.nombre"
    },
    total_empleados: { $sum: 1 }
    }
},
{
    $project: {
    _id: 0,
    ciudad_codigo: "$_id.codigo",
    ciudad_nombre: "$_id.nombre",
    total_empleados: 1
    }
},
{
    $sort: { total_empleados: -1 }
}
]);

// Quinta agregación
db.contratos.aggregate([
{
    $match: {
    activo: true,
      salario_base: { $lt: 2600000 } // 2 salarios mínimos
    }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{ $unwind: "$empleado" },
{
    $project: {
    _id: 0,
    tipo_identificacion: "$empleado.tipo_identificacion",
    numero_identificacion: "$empleado.numero_identificacion",
    nombres: "$empleado.nombres",
    apellidos: "$empleado.apellidos",
    salario_base: 1,
    cargo: 1
    }
},
{
    $project: {
    tipo_identificacion: 1,
    numero_identificacion: 1,
    nombres: 1,
    apellidos: 1,
    salario_base: 1,
    cargo_codigo: "$cargo.codigo",
    cargo_nombre: "$cargo.nombre",
    area_codigo: "$cargo.area.codigo",
    area_nombre: "$cargo.area.nombre"
    }
}
]);

// Sexta agregación
db.contratos.aggregate([
{
    $match: { activo: true }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{ $unwind: "$empleado" },
{
    $group: {
    _id: "$empleado.genero",
    promedio_salario: { $avg: "$salario_base" }
    }
},
{
    $project: {
    _id: 0,
    genero: "$_id",
    promedio_salario: { $round: ["$promedio_salario", 2] }
    }
}
]);

// Séptima agregación
db.novedades.aggregate([
{
    $match: {
    "tipo.nombre": "Falta",
    fecha_inicial: { $lte: ISODate("2025-07-03T00:00:00.000+00:00") },
    fecha_final: { $gte: ISODate("2025-07-05T00:00:00.000+00:00") }
    }
},
{
    $lookup: {
    from: "empleados",
    localField: "empleado_id",
    foreignField: "_id",
    as: "empleado"
    }
},
{ $unwind: "$empleado" },
{
    $lookup: {
    from: "contratos",
    localField: "empleado_id",
    foreignField: "empleado_id",
    as: "contrato"
    }
},
{ $unwind: "$contrato" },
{
    $match: {
    "contrato.activo": true
    }
},
{
    $project: {
    tipo_identificacion: "$empleado.tipo_identificacion",
    numero_identificacion: "$empleado.numero_identificacion",
    nombres: "$empleado.nombres",
    apellidos: "$empleado.apellidos",
    cargo_codigo: "$contrato.cargo.codigo",
    cargo_nombre: "$contrato.cargo.nombre",
    area_codigo: "$contrato.cargo.area.codigo",
    area_nombre: "$contrato.cargo.area.nombre",
    dias_faltados: {
        $add: [
        {
            $dateDiff: {
            startDate: "$fecha_inicial",
            endDate: "$fecha_final",
            unit: "day"
            }
        },
        1
        ]
    }
    }
},
{
    $group: {
    _id: {
        tipo_identificacion: "$tipo_identificacion",
        numero_identificacion: "$numero_identificacion",
        nombres: "$nombres",
        apellidos: "$apellidos",
        cargo_codigo: "$cargo_codigo",
        cargo_nombre: "$cargo_nombre",
        area_codigo: "$area_codigo",
        area_nombre: "$area_nombre"
    },
    total_faltas: { $sum: "$dias_faltados" }
    }
},
{
    $project: {
    _id: 0,
    tipo_identificacion: "$_id.tipo_identificacion",
    numero_identificacion: "$_id.numero_identificacion",
    nombres: "$_id.nombres",
    apellidos: "$_id.apellidos",
    cargo_codigo: "$_id.cargo_codigo",
    cargo_nombre: "$_id.cargo_nombre",
    area_codigo: "$_id.area_codigo",
    area_nombre: "$_id.area_nombre",
    total_faltas: 1
    }
}
]);

// Octava agregación
db.contratos.aggregate([
{
    $match: {
    activo: true
    }
},
{
    $group: {
    _id: {
        codigo: "$tipo_contrato.codigo",
        nombre: "$tipo_contrato.nombre"
    },
    cantidad_empleados: { $sum: 1 }
    }
},
{
    $project: {
    _id: 0,
    tipo_contrato_codigo: "$_id.codigo",
    tipo_contrato_nombre: "$_id.nombre",
    cantidad_empleados: 1
    }
}
]);
