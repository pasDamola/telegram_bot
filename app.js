require('dotenv').config()

//require db
const db = require('./db.js')

// require bot libraries
const Telegraf = require('tele graf')
const Markup = require('telegraf/markup')
const Extra = require('telegraf/extra')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const response_time = new Date() - start
//   const chat_from = `${ctx.message.chat.first_name} (id: ${ctx.message.chat.id})`
  console.log(`(Response Time: ${response_time})`)
})

const welcomeMessage = `Welcome, I am a telegram Bot, built to answer your questions`
const helpMessage =   `Send me a link, let me help you`

bot.start((ctx) => ctx.reply(welcomeMessage))
bot.help((ctx) => ctx.reply(helpMessage))


bot.hears(/new episode (.+)/, (ctx) => {
  const episodeName = ctx.match[0];
  const userId = ctx.from.id;
  ctx.reply('New Episode')
})

bot.hears('hello', (ctx) => {
    ctx.reply('<b>Hello</b>. <i>How are you today?</i>',
      Extra.HTML()
      .markup(Markup.inlineKeyboard([
        Markup.callbackButton('Not bad', 'bad'),
        Markup.callbackButton('All right', 'right')
      ])))
  })
  bot.action('bad', (ctx) => {
    ctx.editMessageText('<i>Have a nice day 😊</i>',
      Extra.HTML())
  })
  bot.action('right', (ctx) => {
    ctx.editMessageText('<i>May happiness be with you 🙏</i>',
      Extra.HTML())
  })
bot.launch()