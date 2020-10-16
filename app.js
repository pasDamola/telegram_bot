require('dotenv').config()

const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const response_time = new Date() - start
  const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`
  console.log(`Chat from ${chat_from} (Response Time: ${response_time})`)
})

bot.hears('hello', (ctx) => ctx.reply('how are you today?'))
bot.launch()