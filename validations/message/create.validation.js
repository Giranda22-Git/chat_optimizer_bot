const Joi = require("joi")

const message_create_schema = Joi.object({
  content_text: Joi.string().required(),
  owner_telegram_id: Joi.string().required(),
  reply_text: Joi.string().optional(),
  reply_name: Joi.string().optional()
})

module.exports = message_create_schema

