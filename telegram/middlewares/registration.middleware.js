const user_create_schema = require("../../validations/user/create.validation")

async function registration_middleware (ctx) {
  if (String(ctx.chat.id) !== process.env.TELEGRAM_CHAT_ID) return;
  const { error, value } = user_create_schema.validate({
    telegram_id: String(ctx.from.id),
    name: ctx.from.username || ctx.from.first_name
  });
  if (error) return;
  const exist = await prisma.user.count({
    where: { telegram_id: value.telegram_id }
  }) > 0;
  if (exist) return;
  const user = await global.prisma.user.create({ data: value })
  console.log({ created_user: user })
}

module.exports = registration_middleware

