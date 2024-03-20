import express from "express";
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '0.0.0.0',
    port : 3318,
    user : 'jonas',
    password : '123456',
    database : 'appbrunanail_db'
  },
  useNullAsDefault: true
});

const app = express();
app.use(express.json());

app.post("/client", async function (req, res) {
  try {
    const { name, email, phone, password } = req.body;
    const client = await knex('clients').insert({
      name,
      email,
      phone,
      password,
      is_admin: false
    });
    console.log("client", client);
    
    res.json(client[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
