const zip_text_openai = require("../../openai/zip_text.openai")

async function zip_messages (ctx, splited_text) {
  try {
    const count_of_messages = Number(splited_text[1])

    const messages = await global.prisma.message.findMany({
      orderBy: { created_at: "desc" },
      take: count_of_messages,
      include: { owner: true }
    });
    
    let joined_messages = new String()
    for (const message of messages) {
      const date = new Date(message.created_at)
      const formattedDate = date.toLocaleDateString('ru-RU').replace(/\//g, '.') + ' ' + date.toTimeString().split(' ')[0];
      joined_messages += `&^text^& ${message.content_text} &^author^& @${message.owner.name} &^date^& ${formattedDate}\n`
    }
    console.log(joined_messages)
    const result = await zip_text_openai(joined_messages)
    if (!result) return ctx.reply("чет не получилось, хз почему)")

    return ctx.reply(result)
  }
  catch (error) {
    console.log("[ERROR] -> telegram -> command -> zip_messages: " + error)
    return ctx.reply("Странная ошибка, обратитесь к администратору, ну или к любому из дим)")
  }
}

module.exports = {
  trigger: "zip",
  handler: zip_messages
}

