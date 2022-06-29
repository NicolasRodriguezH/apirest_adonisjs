'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const DirectorioSeeder = use('./DirectorioSeeder')

class DatabaseSeeder {
  async run () {
    await DirectorioSeeder.run();
  }
}

module.exports = DatabaseSeeder
