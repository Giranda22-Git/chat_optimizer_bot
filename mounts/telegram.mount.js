const { Telegraf } = require("telegraf")

global.bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN)

