const create_user_schema = require("../../validations/user/create.validation")
const error_code = require("../../errors/index.error")

async function create_user (ctx, splited_text) {
  const user_data = {}
  if (splited_text[1]) user_data.telegram_id = splited_text[1]
  if (splited_text[2]) user_data.name = splited_text[2]
  if (splited_text[3]) user_data.role = splited_text[3]

  const { error, value } = create_user_schema.validate(user_data)
  if (error) return error_code.bad_request(ctx, error)

  const user = await global.prisma.user.create({ data: value })
  return ctx.reply(user)
}

module.exports = {
  trigger: "newuser",
  handler: create_user
}

