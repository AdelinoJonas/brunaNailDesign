const {
  ClientRepositoryInMemory,
} = require("../src/repositories/in-memory/ClientRepositoryInMemoy");
const { ClientService } = require("../src/services/clientService");
const { offices } = require("./in-memory-db/db");

describe("Clients", () => {
  let clientService;
  beforeAll(() => {
    const clientRepository = new ClientRepositoryInMemory();
    return (clientService = new ClientService(clientRepository));
  });

  const clientTest = {
    name: "Client Test",
    document: "123.123.123-12",
    email: "test@client.com",
    phone: "12 12121212",
    other_phone: "12 12121212",
    rg: "12.123.123-1",
    genre: "Feminino",
    birth_date: "2000-01-01",
    nationality: "Brasileira",
    civil_status: "Solteiro",
    occupation: "Vendendora",
    cep: "01010-010",
    address: "Rua Primeiro Cliente",
    number: 123,
    complement: "Sem complemento",
    district: "Centro",
    state: "SP",
    city: "São Paulo",
    observation: "Endereço",
    offices_id: offices[0].id,
  };

  const clientPJ = {
    name: "Client Test",
    document: "96.753.484/0001-19",
    email: "pj@client.com",
    phone: "12 12121212",
    other_phone: "12 12121212",
    birth_date: "2000-01-01",
    cep: "01010-010",
    address: "Rua Primeiro Cliente",
    number: 123,
    complement: "Sem complemento",
    district: "Centro",
    state: "SP",
    city: "São Paulo",
    observation: "Endereço",
    offices_id: offices[0].id,
  };

  let idClient;
  let idClientPJ;
  let createdAt;
  let updatedAt;

  describe("Create Client", () => {
    it("Should be able to create a new client", async () => {
      const client = await clientService.createClient({
        ...clientTest,
      });
      expect(client).toHaveProperty("id");
      idClient = client.id;
      createdAt = client.createdAt;
      updatedAt = client.updatedAt;
      expect(client.name).toBe(clientTest.name);
    });

    it("Should be able to create a new client pj", async () => {
      const client = await clientService.createClient(clientPJ);
      expect(client).toHaveProperty("id");
      expect(client.name).toBe(clientPJ.name);
      idClientPJ=client.id
    });
    
    it("Should not be able to create a new client (error name)", async () => {
      expect(
        async () =>
          await clientService.createClient({
            ...clientTest,
            name: "",
          })
      ).rejects.toThrow();
    });
    it("Should not be able to create a new client (error cep)", async () => {
      expect(
        async () =>
          await clientService.createClient({
            ...clientTest,
            cep: "",
          })
      ).rejects.toThrow();
    });
  });

  describe("Show Client", () => {
    it("List all clients by offices", async () => {
      const list = await clientService.listClientsByOffice({
        offices_id: offices[0].id,
      });

      expect(list.length).toBeGreaterThan(1);
    });

    it("Offices_id invalid", async () => {
      const list = await clientService.listClientsByOffice({
        offices_id: idClient,
      });

      expect(list.length).toBeLessThan(1);
    });

    it("Show client infos", async () => {
      const client = await clientService.getClient(idClient);

      expect(client.name).toBe(
        clientTest.name
      );
      // expect(client).toStrictEqual({
      //   ...clientTest,
      //   id: idClient,
      //   createdAt,
      //   updatedAt,
      // });
    });

    it("Don't find client infos", async () => {
      const client = await clientService.getClient(offices[0].id);

      expect(client).toBeUndefined();
    });
  });

  describe("Update Client", () => {
    it("Should be able to update Client PF", async () => {
      const client = await clientService.updateClient({
        id: idClient,
        name: "Update Client",
        document: "123.123.123-12",
        email: "test@client.com",
        phone: "12 12121212",
        other_phone: "12 12121212",
        rg: "12.123.123-12",
        genre: "Feminino",
        birth_date: "2000-01-01",
        nationality: "Brasileira",
        civil_status: "Solteiro",
        occupation: "Vendendora",
        cep: "01010-010",
        address: "Rua Primeiro Cliente",
        number: 123,
        complement: "Sem complemento",
        district: "Centro",
        state: "SP",
        observation: "Endereço",
      });
      expect(client.name).toBe("Update Client");
      expect(client.rg).toBe("12.123.123-12");
    });

    it("Should be able to update Client", async () => {
      const client = await clientService.updateClient({
        id: idClient,
        city: "Santos",
      });
      expect(client.city).toBe("Santos");
    });

    it("Should be able to update Client PJ", async () => {
      const client = await clientService.updateClient({
        id: idClientPJ,
        rg: "12.123.123-12",
        genre: "Feminino",
        birth_date: "2000-01-01",
        nationality: "Brasileira",
        civil_status: "Solteiro",
        occupation: "Vendendora",
        cep: "01010-010",
        address: "Rua Primeiro Cliente",
        number: 123,
        complement: "Sem complemento",
        district: "Centro",
        state: "SP",
        observation: "Endereço",
      });
      expect(client.rg).toBe(null);
    });

    it("Should not be able to update Client", async () => {
      await expect(() =>
        clientService.updateClient({
          id: "invalid-id",
        })
      ).rejects.toThrow();
    });

    it("Should be able to update Client", async () => {
      const client = await clientService.updateClient({
        id: offices[0].id,
        city: "Santos",
      });
      expect(client).toBeUndefined();
    });
  });

  describe("Delete Client", () => {
    it("Should be able to delete client", async () => {
      const client = await clientService.deleteClient(idClient);
      expect(client.id).toBe(idClient);
    });
    
    it("Should not be able to delete client", async () => {
      const client = await clientService.deleteClient(idClient);
      expect(client).toBeUndefined();
    });
  });
});
