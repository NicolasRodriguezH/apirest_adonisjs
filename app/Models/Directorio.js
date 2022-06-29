'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Directorio extends Model {
    // Con este metodo get obtenemos el modelo
    static get table() {
        return 'directorios';
    }

    static get hidden() {
        return ["created_at", "updated_at"];
    }
}

module.exports = Directorio
