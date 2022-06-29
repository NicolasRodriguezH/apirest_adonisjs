'use strict'

/*
|--------------------------------------------------------------------------
| DirectorioSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class DirectorioSeeder {
  static async run () {
    await Database.table("directorios").insert([
      {
        "nombre_completo" : "Saul Mamani",
        "direccion" : "Plan 500 #4465",
        "telefono" : "7634567",
        "url_foto" : "null"
      },
      {
        "nombre_completo" : "Lidia Marce",
        "direccion" : "Jaen y calle 34 #4456",
        "telefono" : "6537889",
        "url_foto" : "null"
      },
    ])
  }
}

module.exports = DirectorioSeeder
