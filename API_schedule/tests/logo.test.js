const { OfficesLogoService } = require("../src/services/logoService");
const {
  OfficesLogoRepositoryInMemory,
} = require("../src/repositories/in-memory/LogoRepositoryInMemory");
const db = require("./in-memory-db/db");

describe("Image", () => {
  let officesLogoService;
  beforeAll(() => {
    const officesLogoRepository = new OfficesLogoRepositoryInMemory();
    return (officesLogoService = new OfficesLogoService(officesLogoRepository));
  });

  describe("Insert Logo", () => {
    it("Should be create Logo", async () => {
      const logo = await officesLogoService.insertLogo({
        name: "novaFoto",
        offices_id: "no-image",
      });
      expect(logo.name).toBe("novaFoto");
    });

    it("Should not be create Logo", async () => {
      expect(() =>
        officesLogoService.insertLogo({
          name: "novaFoto",
          offices_id: "no-image",
        })
      ).rejects.toThrow("Esse escritório já apresenta uma imagem cadastrada");
    });
  });

  describe("Get image", () => {
    it("Found Logo by Id", async () => {
      const logo = await officesLogoService.getLogo(db.logo[0].id);
      expect(logo.name).toBe(db.logo[0].name);
    });
    it("Found Logo by Id", async () => {
      const logo = await officesLogoService.getLogoByOffice({
        offices_id: db.logo[0].offices_id,
      });
      expect(logo.name).toBe(db.logo[0].name);
    });
  });

  describe("Update Image", () => {
    it("Should be able to update", async () => {
      const logo = await officesLogoService.updateLogo({
        id: "exemple-id01",
        name: "novo_nome",
      });
      expect(logo.name).not.toBe("arquivo_da_imagem");
      expect(logo.name).toBe("novo_nome");
      await officesLogoService.updateLogo({
        id: "exemple-id01",
        name: "arquivo_da_imagem",
      });
    });
    it("Should be able to update", async () => {
      expect(() =>
      officesLogoService.updateLogo({
        id: "exemple-id02",
        name: "novo_nome",
      })
    ).rejects.toThrow("Arquivo não encontrado");
    })
  });

  describe("Delete Image", () => {
    it("Should be able to delete", async () => {
      const logo = await officesLogoService.deleteLogo({ id: "exemple-id01" });

      expect(logo.name).toBe("arquivo_da_imagem");
    });
    it("Should not be able to delete", async () => {
      expect(() =>
        officesLogoService.deleteLogo({ id: "exemple-id02" })
      ).rejects.toThrow("Arquivo não encontrado");
    });
  });
});
