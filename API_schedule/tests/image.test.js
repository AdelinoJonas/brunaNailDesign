const { ImageService } = require("../src/services/imageService");
const {
  OfficesLogoRepositoryInMemory,
} = require("../src/repositories/in-memory/LogoRepositoryInMemory");
const{ImageRepositoryInMemory} = require("../src/repositories/in-memory/ImageRepositoryInMemory");
const db = require("./in-memory-db/db");

describe("Image", () => {
  let imageService;
  beforeAll(() => {
    const officesLogoRepository = new OfficesLogoRepositoryInMemory();
    const imageRepositoryInMemory = new ImageRepositoryInMemory();
    return (imageService = new ImageService(officesLogoRepository,imageRepositoryInMemory));
  });

  describe("upload Image", () => {
    it("Should be create image", async () => {
      const image = await imageService.uploadImage({
        name: "novaFoto",
        image: "image.jpg",
        offices_id: db.offices[1].id,
      });
      expect(image).toBe("novaFoto");
    });

    it("Should not be create image name error", async () => {
      expect(() =>
        imageService.uploadImage({
          name: "arquivo_da_imagem",
          image: "image.jpg",
          offices_id: db.offices[2].id,
        })
      ).rejects.toThrow("Nome inválido");
    });

    it("Should not be create image office error", async () => {
      expect(() =>
        imageService.uploadImage({
          name: "novaFoto",
          image: "image.jpg",
          offices_id: "9062bc0d-ba97-4d78-b54b-f7af5c59ea02",
        })
      ).rejects.toThrow("Esse escritório já apresenta uma imagem cadastrada");
    });
  });

  describe("Get image", () => {
    it("Encontrou a foto", async () => {
      const url = await imageService.getImage("novaFoto");
      expect(url).toBeTruthy();
    });
  });

  describe("Delete Image", () => {
    // it("Should be able to delete", async () => {
    //   try {
    //     const name = await imageService.deleteImage("exemple-id01");
        
    //     expect(name).toBe("arquivo_da_imagem");
    //   } catch (error) {
    //     console.log(error.message)
    //   }
    // });
    it("Should not be able to delete", async () => {
      expect(() => imageService.deleteImage("exemple-id02")).rejects.toThrow(
        "Imagem não encontrada"
      );
    });
  });
});
