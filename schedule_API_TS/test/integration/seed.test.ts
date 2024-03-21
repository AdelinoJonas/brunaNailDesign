import { seed, db } from '../../src/seeds/admin';

test('Deve cadastrar o admin com seed', async () => {
    await seed();
    const adminUser = await db('users').where({ is_admin: true }).first();
    console.log(adminUser);
    expect(adminUser).toBeDefined();
});