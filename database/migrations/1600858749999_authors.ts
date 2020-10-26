import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AnyMigrationError extends BaseSchema {
  protected tableName = 'any'

  public async up() {
    throw new Error('Something went wrong...')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
