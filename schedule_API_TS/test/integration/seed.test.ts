import { seed } from '../../src/seeds/admin';
import knex from '../../knex';

test('Deve cadastrar o admin com seed', async () => {
    await seed();
    const adminUser = await knex('users').where({ is_admin: true }).first();
    expect(adminUser).toBeDefined();
});