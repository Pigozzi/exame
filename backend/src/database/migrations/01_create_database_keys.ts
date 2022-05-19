import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('keys', table => {
        table.increments('id').primary();
        table.string('user_id').notNullable();
        table.string('token').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('keys');
}