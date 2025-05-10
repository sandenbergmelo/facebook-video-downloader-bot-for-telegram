import getFbVideoInfo from 'fb-downloader-scrapper'
import { Bot } from 'grammy'
import { decode } from 'html-entities'
import { env } from './env'

const bot = new Bot(env.BOT_TOKEN)

bot.command('start', (ctx) => ctx.reply('Welcome!'))

bot.on('message', async (ctx) => {
  const url = ctx.message.text ?? ''

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

bot.api.getMe().then((botInfos) => {
  console.log(`Bot "${botInfos.first_name}" is running 🚀`)
})

bot.start()

process.once('SIGINT', () => bot.stop())
process.once('SIGTERM', () => bot.stop())
