import getFbVideoInfo from 'fb-downloader-scrapper'
import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { env } from './env'

const bot = new Telegraf(env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))

bot.on(message('text'), async (ctx) => {
  const url = ctx.message.text

  if (!/^https:\/\//i.test(url)) return

  await ctx.reply('Downloading...')

  try {
    const video = await getFbVideoInfo(url)
    await ctx.replyWithVideo(video.hd || video.sd)
  } catch (err) {
    console.log(err)
    await ctx.reply('Error while trying to download the video')
  }
})

bot.telegram.getMe().then((botInfos) => {
  console.log(`Bot "${botInfos.first_name}" is running 🚀`)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
