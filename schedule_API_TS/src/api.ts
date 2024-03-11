//@ts-nocheck
import express from "express";
import CreateClient from "./application/usecase/CreateClient";
// import GetClient from "./application/usecase/GetClient";
// import ClientRepositoryDataBase from "./infra/repository/ClientRepositoryDataBase";

const app = express();
app.use(express.json());

app.post("/client", async function (req, res) {
  try {
    const { name, email, phone, adress } = req.body;
    await knex('appbrunanail_db').insert({
      name,
      email,
      phone,
      adress
    });
    res.json({ clientId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get("/client/:clientId",async function (req, res) {
//   try {
//     const useCase = new GetClient(new ClientRepositoryDataBase());
//     const output = await useCase.execute({ clientId: req.params.clientId });    
//     if (!output) {
//       return res.status(404).json({ error: "client not found" });
//     }
//     return res.json(output);
//   } catch (e: any) {
//     return res.status(422).send(e.message);
//   }
// });

app.listen(3000, () => {
  console.log(`Servidor ouvindo na porta http://localhost:3000/`);
});
