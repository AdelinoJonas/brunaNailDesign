const {
  procedureRepositoryInMemory,
} = require("../src/repositories/in-memory/procedureInMemory");
const { procedureService } = require("../src/services/procedureService");
const db = require("./in-memory-db/db");

describe("Court Hearing", () => {
  let courtService;
  beforeAll(() => {
    const courtRepository = new procedureRepositoryInMemory();
    return courtService = new procedureService(courtRepository);
  });

  const courtTest = {
    user_id: db.users[0].id,
    clients_id: db.clients[0].id,
    type: db.court_hearing_type[1].id,
    process_number: "123456789-ASDFG-12345",
    opposing: "LOJAS AMERICANAS",
    is_remote: true,
    date: "2023-12-12",
    time: "12:00",
    address_link: "https://www.link.com",
    is_notified: true,
    offices_id: db.offices[0].id,
  };

  describe("Create Court", () => {
    it("Should be able to create a new court hearing", async () => {
      const court = await courtService.createCourt(courtTest);
      expect(court).toHaveProperty("id");
      courtTest.id = court.id;
      courtTest.createdAt = court.createdAt;
      courtTest.updatedAt = court.updatedAt;
      expect(court).toStrictEqual(courtTest);
    });
    it("Should not be able to create a new court Hearing (error time)", async () => {
      expect(
        async () =>
          await courtService.createCourt({
            ...clientTest,
            time: "",
          })
      ).rejects.toThrow();
    });
  });

  describe("Show Courts", () => {
    it("Show Court Hearing", async () => {
      const court = await courtService.getCourt(courtTest.id);
      expect(court).toStrictEqual(courtTest);
    });

    it("Don't find Court Hearing", async () => {
      const court = await courtService.getCourt(courtTest.clients_id);

      expect(court).toBeUndefined();
    });
  });

  describe("Show Courts with extra infos", () => {
    it("Show Court Hearing with extra infos", async () => {
      const court = await courtService.getCourtWithInfo(courtTest.id);

      expect(court).toHaveProperty("client");
      expect(court).toHaveProperty("user");
    });

    it("Don't find Court Hearing", async () => {
      const court = await courtService.getCourtWithInfo(courtTest.clients_id);

      expect(court).toBeUndefined();
    });
  });

  describe("List Court Hearing", () => {
    it("Show Court Hearing with extra infos", async () => {
      const list = await courtService.findAllCourtWithInfo(db.offices[0].id);

      expect(list.length).toBeGreaterThan(1);
    });

    it("Empty List", async () => {
      const list = await courtService.findAllCourtWithInfo(db.clients[0].id);

      expect(list.length).toBeLessThan(1);
    });
  });

  describe("List Court Hearing by Client", () => {
    it("Show Court Hearing with extra infos", async () => {
      const list = await courtService.findAllCourtByClient(
        courtTest.clients_id
      );

      expect(list.length).toBeGreaterThan(1);
    });

    it("Empty List", async () => {
      const list = await courtService.findAllCourtByClient(
        courtTest.offices_id
      );

      expect(list.length).toBeLessThan(1);
    });
  });

  describe("Update Court", () => {
    it("Success", async () => {
      const court = await courtService.updateCourt({
        id: courtTest.id,
        user_id: db.users[0].id,
        clients_id: db.clients[0].id,
        type: db.court_hearing_type[2].id,
        process_number: "Update Process",
        opposing: "LOJAS Updated",
        is_remote: false,
        date: "2023-10-12",
        time: "11:00",
        address_link: "https://www.link.com.br",
      });

      expect(court.process_number).toBe("Update Process");
      expect(court.is_remote).toBe(false);
    });

    it("Success with only 1 field", async () => {
      const court = await courtService.updateCourt({
        id: courtTest.id,
        is_notified: true,
      });

      expect(court.is_notified).toBe(true);
    });

    it("User Not found", async () => {
      const court = await courtService.updateCourt({
        id: courtTest.clients_id,
      });

      expect(court).toBeUndefined;
    });
  });

  describe("Delete Court", () => {
    it("Success", async () => {
      const courtLength = db.court_hearing.length;

      await courtService.deleteCourt(courtTest.id);

      expect(db.court_hearing.length).toBeLessThan(courtLength);
    });
    it("Error", async () => {
      const response = await courtService.deleteCourt(courtTest.id);

      expect(response).toBeUndefined();
    });
  });
});
