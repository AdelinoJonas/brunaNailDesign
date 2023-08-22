const knexConfig = require("../../knexfile");
const knex = require("knex")(knexConfig);

const { BaseRepository } = require("@cubos/knex-repository");

class UserRepository extends BaseRepository {
  constructor() {
    super(knex, "users");
  }

  async findAllJoinOffices() {
    const list = await knex("users as u")
      .leftJoin("offices as o", "o.id", "u.offices_id")
      .select(
        "u.id",
        "u.name",
        "u.is_active",
        "u.is_responsible",
        "u.is_admin",
        "u.is_authorized",
        "o.fantasy_name",
        "o.company_name",
        "o.registration_date",
        "u.email",
        "u.phone",
        "o.email as office_email",
        "o.phone as office_phone",
        "o.is_active as office_is_active",
        "o.due_date"
      )
      .where("u.is_responsible", true)
      .where("u.is_admin", false);

    return list;
  }

  async findAllByStatus(is_active) {
    const list = await knex("users as u")
      .leftJoin("offices as o", "o.id", "u.offices_id")
      .select(
        "u.id",
        "u.name",
        "u.is_active",
        "u.is_responsible",
        "u.is_admin",
        "u.is_authorized",
        "o.fantasy_name",
        "o.company_name",
        "u.email",
        "u.phone",
        "o.email as office_email",
        "o.phone as office_phone",
        "o.is_active as office_is_active",
        "o.registration_date",
        "o.due_date"
      )
      .where("o.is_active", is_active)
      .where("u.is_responsible", true)
      .where("u.is_admin", false);
    return list;
  }

  async getResponsible(id) {
    const iten = await knex("users as u")
      .leftJoin("offices as o", "o.id", "u.offices_id")
      .leftJoin("offices_logo as ol", "ol.offices_id", "o.id")
      .select(
        "u.id",
        "u.name",
        "u.email",
        "u.phone",
        "u.cpf",
        "u.oab",
        "u.genre",
        "u.is_admin",
        "u.is_responsible",
        "u.is_active",
        "u.is_authorized",
        "u.nationality",
        "u.civil_status",
        "u.title",
        "o.company_name",
        "o.fantasy_name",
        "o.email as office_email",
        "o.phone as office_phone",
        "o.cnpj",
        "o.cep",
        "o.address",
        "o.number",
        "o.complement",
        "o.district",
        "o.state",
        "o.city",
        "o.observation",
        "o.is_active as office_is_active",
        "o.registration_date",
        "o.due_date",
        "o.folder_id",
        "ol.name as logo"
      )
      .where("u.id", id)
      .first();
    return iten;
  }

  async getCommon(id) {
    const iten = await knex("users as u")
      .leftJoin("offices as o", "o.id", "u.offices_id")
      .select(
        "u.id",
        "u.name",
        "u.email",
        "u.phone",
        "u.cpf",
        "u.oab",
        "u.is_admin",
        "u.is_responsible",
        "u.is_active",
        "u.is_authorized",
        "o.fantasy_name",
        "o.folder_id",
        "u.nationality",
        "u.civil_status",
        "u.title"
      )
      .where("u.id", id)
      .first();
    return iten;
  }
}
module.exports = { UserRepository };
