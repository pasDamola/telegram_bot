require('dotenv').config()

//require db
const db = require('./db.js')

// require bot libraries
const Telegraf = require('telegraf')
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
  const message = ctx.match[0];
  const userId = ctx.from.id;
  db.query('INSERT INTO users (user_id, message)', [userId, message], (err, res) => {
    if (err) {
      console.log(err);
    }
    // res.send(res.rows[0])
    ctx.reply(`You're new message: ${message} has been stored in the DB!`)
  })
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