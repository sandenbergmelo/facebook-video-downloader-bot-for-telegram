import getFbVideoInfo from 'fb-downloader-scrapper'
import { decode } from 'html-entities'
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

    const videoUrl = video.hd || video.sd
    const videoTitle = decode(video.title)

    await ctx.replyWithVideo(videoUrl, { caption: videoTitle })
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
