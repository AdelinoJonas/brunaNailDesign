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

app.post("/user", async function (req, res) {
  try {
    const { name, email, phone, password } = req.body;
    const client = await knex('users').insert({
      name,
      email,
      phone,
      password,
      is_admin: false
    });   
    res.json(client[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/user/:userId", async function (req, res) {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    const userData = await knex('users')
    .select()
    .where('user_id', userId)
    .first()
    if (!userData) {
      return res.status(404).json({error: "User not found"})
    }
    console.log("userData", userData);
    return res.json({message: userData})
  } catch (e) {
    return res.status(500).json({ e: 'Internal server error'})
  }
})

app.post("/service", async function (req, res) {
  try {
    
  } catch (error) {

  }
});

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
