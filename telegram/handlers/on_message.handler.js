const commands = require("../commands/index.command")
const registration_middleware = require("../middlewares/registration.middleware")
const save_messages_middleware = require("../middlewares/save_messages.middleware")

global.bot.on("message", async (ctx) => {
  try {
    const text = ctx.message.text
    const photo = ctx.message.photo
    await registration_middleware(ctx)
    await save_messages_middleware(ctx)

    if (text) { // this is text
      const splited_text = text.split(" ")
      if (splited_text[0][0] === "/") { // this is command
        splited_text[0] = splited_text[0].replace("/", "")

        for (const key in commands) {
          if (commands[key].trigger !== splited_text[0]) continue
          await commands[key].handler(ctx, splited_text)
          break
        }
      }
    }
    else if (photo) { // this is picture

    }
  }
  catch (error) {
    const message = `[ERROR] -> telegram -> on -> message: ${error}`
    console.log(error)
    return ctx.reply(message)
  }
})


