const Joi = require("joi")
const { UserRoles } = require("@prisma/client")

const user_create_schema = Joi.object({
  name: Joi.string().min(1).max(55).optional(),
  telegram_id: Joi.string().required(),
  role: Joi.string().valid(...Object.values(UserRoles)).optional(),
})

module.exports = user_create_schema
