'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DirectorioSchema extends Schema {
  up () {
    this.create('directorios', (table) => {
      table.increments()
      table.string("nombre_completo").notNullable();
      table.string("direccion");
      table.integer("telefono").unique().notNullable();
      table.string("url_foto");
      table.timestamps()
    })
  }

  down () {
    this.drop('directorios')
  }
}

module.exports = DirectorioSchema
