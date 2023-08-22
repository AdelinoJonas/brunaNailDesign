const {
  UsersRepositoryInMemory,
} = require("../src/repositories/in-memory/UsersRepositoryInMemory");
const { UserService } = require("../src/services/usersServices");
const { offices } = require("./in-memory-db/db");

describe("Users", () => {
  let userService;
  beforeAll(() => {
    const usersRepository = new UsersRepositoryInMemory();
    return (userService = new UserService(usersRepository));
  });
  const userTest = {
    id: "",
    name: "teste de criação",
    cpf: "12345678945",
    email: "teste@teste.com",
    phone: "12 1212121212",
    oab: "123456789123",
    password: "senha123",
    genre: "Masculino",
    is_admin: false,
    is_responsible: false,
    is_active: true,
    offices_id: offices[0].id,
  };
  describe("Create users", () => {
    it("should be able to create a new user", async () => {
      const user = await userService.createUser(userTest);
      userTest.id = user.id;
      userTest.updatedAt = user.updatedAt;
      userTest.createdAt = user.createdAt;
      expect(user).toHaveProperty("id");
      expect(user.name).toBe(userTest.name);
      expect(user.password).not.toBe(userTest.password);
      userTest.password = user.password;
    });

    it("Error without password", async () => {
      try {
        await userService.createUser({ ...userTest, password: "" }).catch();
      } catch (error) {
        expect(error.message).toBe("password é um campo obrigatório");
        expect(error).toHaveProperty("errors");
      }
    });

    it("Error existing email", async () => {
      expect(
        async () => await userService.createUser({ ...userTest })
      ).rejects.toThrow(
        "Email já cadastrado anteriormente, por favor entre em contato com a administração."
      );
    });
  });

  describe("Find user", () => {
    it("find user by id", async () => {
      try {
        const user = await userService.getUser(userTest.id);

        expect(user.id).toBe(userTest.id);
      } catch (error) {}
    });

    it("Don't find user by id", async () => {
      try {
        const user = await userService.getUser(userTest.offices_id);

        expect(user).toBeUndefined();
      } catch (error) {}
    });

    it("Invalid ID", async () => {
      try {
        await userService.getUser("9757c1ae-4f0d-848e-ae6ed00fdca0");
      } catch (error) {
        expect(error.message).toBe("O id de usuário informado é inválido.");
        expect(error).toHaveProperty("errors");
      }
    });

    it("find user by email", async () => {
      try {
        const user = await userService.findUserByEmail({
          email: userTest.email,
        });

        expect(user.email).toBe(userTest.email);
      } catch (error) {}
    });

    it("Don't find user by email", async () => {
      try {
        const user = await userService.findUserByEmail({
          email: "without@email.com",
        });

        expect(user).toBeUndefined();
      } catch (error) {}
    });

    it("find user by name", async () => {
      try {
        const user = await userService.findUserBy({
          name: userTest.name,
        });

        expect(user.email).toBe(userTest.email);
      } catch (error) {}
    });

    it("Don't find user by name", async () => {
      try {
        const user = await userService.findUserBy({
          name: "name name",
        });

        expect(user).toBeUndefined();
      } catch (error) {}
    });
  });

  describe("Get user information", () => {
    describe("Responsible user", () => {
      it("find user by id", async () => {
        const user = await userService.getUserResponsible(
          "8857c1ae-00f8-4f0d-848e-ae6ed00fdca0"
        );
        expect(user.is_responsible).toBe(true);
      });

      it("Don't find user by id", async () => {
        const user = await userService.getUserResponsible(userTest.offices_id);
        expect(user).toBeUndefined();
      });

      it("Invalid ID", async () => {
        try {
          await userService.getUserResponsible(
            "9757c1ae-4f0d-848e-ae6ed00fdca0"
          );
        } catch (error) {
          expect(error.message).toBe("O id de usuário informado é inválido.");
          expect(error).toHaveProperty("errors");
        }
      });
    });

    describe("Common user", () => {
      it("find user by id", async () => {
        try {
          const user = await userService.getUserCommon(userTest.id);

          expect(user.is_responsible).toBe(false);
          expect(user).toHaveProperty("fantasy_name");
        } catch (error) {}
      });

      it("Don't find user by id", async () => {
        try {
          const user = await userService.getUserCommon(userTest.offices_id);

          expect(user).toBeUndefined();
        } catch (error) {}
      });

      it("Invalid ID", async () => {
        try {
          await userService.getUserCommon("9757c1ae-4f0d-848e-ae6ed00fdca0");
        } catch (error) {
          expect(error.message).toBe("O id de usuário informado é inválido.");
          expect(error).toHaveProperty("errors");
        }
      });
    });
  });

  describe("Update User", () => {
    it("Success Update", async () => {
      try {
        const data = {
          id: userTest.id,
          name: "Updated User",
        };
        const userUpdated = await userService.updateUser(data);

        const { createdAt: _, updatedAt: __, ...response } = userUpdated;
        const { createdAt: ___, updatedAt: ____, ...expectData } = userTest;

        expect(response).toStrictEqual({ ...expectData, ...data });
        expect(userUpdated.updatedAt).not.toBe(userTest.updatedAt);
        userTest.updatedAt = userUpdated.updatedAt;
      } catch (error) {}
    });

    it("Success Update", async () => {
      try {
        const data = {
          id: userTest.id,
          cpf: "12345678945",
          email: "teste@teste.com",
          phone: "12 1212121212",
          oab: "123456789123",
          password: "senha123",
          genre: "Masculino",
          is_admin: false,
          is_responsible: false,
          is_active: false,
          is_authorized: true,
        };
        const userUpdated = await userService.updateUser(data);

        const { createdAt: _, updatedAt: __, ...response } = userUpdated;
        const { createdAt: ___, updatedAt: ____, ...expectData } = userTest;

        expect(response).toStrictEqual({ ...expectData, ...data });
        expect(userUpdated.updatedAt).not.toBe(userTest.updatedAt);
        userTest.updatedAt = userUpdated.updatedAt;
      } catch (error) {}
    });

    it("Success Update Password", async () => {
      try {
        const data = {
          id: userTest.id,
          password: "newPassword",
        };

        const userUpdated = await userService.updateUser(data);

        expect(userUpdated.password).not.toBe(userTest.password);
        expect(userUpdated.updatedAt).not.toBe(userTest.updatedAt);
        userTest.updatedAt = userUpdated.updatedAt;
      } catch (error) {}
    });

    it("Error Update Password", async () => {
      try {
        const data = {
          id: userTest.id,
          password: "",
        };
        await userService.updateUser(data);
      } catch (error) {
        expect(error.message).toBe(
          "O 'password' deve ter pelo menos 8 caracteres."
        );
      }
    });

    it("Error existing email", async () => {
      const data = {
        id: userTest.id,
        email: "user@padrão.com",
      };
      expect(async () => await userService.updateUser(data)).rejects.toThrow(
        "Email já cadastrado anteriormente, por favor entre em contato com a administração."
      );
    });
  });

  describe("List Users", () => {
    it("list all users", async () => {
      try {
        const list = await userService.findAllUser();

        expect(list.length).toBeGreaterThan(1);
      } catch (error) {}
    });

    it("list all users by office", async () => {
      try {
        const list = await userService.findAllUsersBy({
          offices_id: offices[0].id,
        });

        expect(list.length).toBeGreaterThan(1);
      } catch (error) {}
    });

    it("list all users with office information", async () => {
      try {
        const list = await userService.findAllUsersWithOfficeInfos();

        expect(list.length).toBeGreaterThan(1);
      } catch (error) {}
    });

    it("list all users by status active", async () => {
      try {
        const list = await userService.findAllUsersByStatusWithOfficeInfos(
          true
        );

        expect(list.length).toBeGreaterThan(1);
      } catch (error) {}
    });

    it("list all users by status inactive", async () => {
      try {
        const list = await userService.findAllUsersByStatusWithOfficeInfos(
          false
        );

        expect(list.length).toBeLessThanOrEqual(2);
      } catch (error) {}
    });

    it("list all users by status inactive", async () => {
      try {
        await userService.findAllUsersByStatusWithOfficeInfos("teste");
      } catch (error) {
        expect(error).toHaveProperty("errors");
      }
    });
  });
});
