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

bot.hears('hello', (ctx) => {
    ctx.reply('<b>Hello</b>. <i>How are you today?</i>',
      Extra.HTML()
      .markup(Markup.inlineKeyboard([
        Markup.callbackButton('Not bad', 'not bad'),
        Markup.callbackButton('All right', 'all right')
      ])))
  })
  bot.action('not bad', (ctx) => {
    ctx.editMessageText('<i>Have a nice day 😊</i>',
      Extra.HTML())
  })
  bot.action('all right', (ctx) => {
    ctx.editMessageText('<i>May happiness be with you 🙏</i>',
      Extra.HTML())
  })
bot.launch()