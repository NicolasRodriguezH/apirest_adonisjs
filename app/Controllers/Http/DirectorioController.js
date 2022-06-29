'use strict'

/* Aca invoca a los modelos a usar: Directorio, valdiator  */
const Directorio = use("App/Models/Directorio")
const { validateAll } = use("Validator")

class DirectorioController {
  //GET
  async index ({ request }) {
    // Recoge todas las entradas de request
    const input = request.all();
    
    // Filtrar consulta de un registro por su telefono, nombre y con filtro de busqueda en el nombre
    if (input.txtBuscar !== undefined) {
      return await Directorio.query()
                             .where("telefono", input.txtBuscar)
                             .orWhere("nombre_completo", "like", "%" + input.txtBuscar + "%")
                             .fetch();
    }

    return await Directorio.all();
  }
  
  //POST
  async store ({ request, response }) {
    const input = request.all();

    // Despues de recoger los datos voy a hacer las VALIDATIONS
    const validation = await this.validate(input);

    if(validation.fails()) {
      return validation.messages();
    }

    // Se crea la entrada despues de recoegr los datos con el input request.all
    await Directorio.create(input);

    // Mensaje de retorno en caso de que sea efectivo el registro
    return response.json({
      rer : true,
      message : "Registro insertado correctamente"
    });
  }

  //GET
  async show ({ params }) {
    return await Directorio.findOrFail(params.id);
  }

  //PUT
  async update ({ params, request, response }) {
    const input = request.all();

    // Despues de recoger los datos voy a hacer las VALIDATIONS
    const validation = await this.validate(input, params.id);

    if(validation.fails()) {
      return validation.messages();
    }

    // Se crea la entrada despues de recoger los datos con el input request.all
    await Directorio.query()
                    .where("id", params.id).update(input);

    // Mensaje de retorno en caso de que sea efectiva la modificacion
    return response.json({
      rer : true,
      message : "Registro modificado correctamente"
    });    
  }

  //DELETE
  async destroy ({ params, response }) {
    const directorio = await Directorio.findOrFail(params.id)
    await directorio.delete()

    return response.json({
      rer : true,
      message : "El registro ha sido eliminado"
    })
  }
  
  // Refactorizando validaciones
  async validate (input, id = null) {
    let ruleUpdate = id === null ? "" : ",id," + id;
    return await validateAll(input, {
      "nombre_completo": "required|min:3|max:100",
      "telefono": "required|unique:directorios,telefono" + ruleUpdate
    });
  }

  async loadPhoto ({request, response, params}) {
    const avatar = request.file('avatar', {
      types: ['image'],
      size: '2mb'
    })

    const fileName = params.id + "." + avatar.extname;
    await avatar.move('./public/fotografias/', {
      name: fileName,
      overwruite: true
    })

    if(! avatar.moved()) {
      return response.status(422).send({
        res: false,
        message: avatar.error()
      })
    }

    const directorio = await Directorio.findOrFail(params.id)
    directorio.url_foto = fileName
    await directorio.save();

    return response.json({
      res: true,
      message: "Foto registrada correctamente"
    })
  }

}

module.exports = DirectorioController
