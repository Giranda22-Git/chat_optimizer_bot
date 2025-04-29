const message_create_schema = require("../../validations/message/create.validation")

async function save_messages_middleware (ctx) {
  const { error, value } = message_create_schema.validate({
    owner_telegram_id: String(ctx.from.id),
    content_text: ctx.message.text
  })
  if (error) return;

  await global.prisma.message.create({ data: value })
}

module.exports = save_messages_middleware

