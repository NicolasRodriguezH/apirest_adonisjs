'use strict'

const auth = require("../../../config/auth");

const User = use('App/Models/User')

class UserController {
    async store ({ request, response }) {
        const input = request.all();
    
        // Despues de recoger los datos voy a hacer las VALIDATIONS
        /* const validation = await this.validate(input);
    
        if(validation.fails()) {
          return validation.messages();
        } */
    
        // Se crea la entrada despues de recoegr los datos con el input request.all
        await User.create(input);
    
        // Mensaje de retorno en caso de que sea efectivo el registro
        return response.json({
          rer : true,
          message : "Usuario creado correctamente"
        });
    }

    /* Luego de que el Usuario a creado su registro este metodo le asigna un token JWT al mismo */
    async login ({request, response, auth}) {
        let input = request.all()
        let token = await auth.withRefreshToken().attempt(input.email, input.password)

        return response.json({
            res: true,
            Token: token,
            Message: "Bienvenido al sistema"
        })
    }

    async getUser({response, auth}) {
        try {
            return await auth.getUser()
        } catch (error) {
            response.send("Ningun usuario autenticado")
        }
    }
}

module.exports = UserController
