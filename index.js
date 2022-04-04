import { Telegraf } from 'telegraf'
import getFBInfo from 'fb-downloader'
import 'dotenv/config'

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))

bot.on('text', async (ctx) => {
    const url = ctx.message.text

    if (/^https:\/\//i.test(url)) {
        ctx.reply('Downloading...')
        const video = await getFBInfo(url)
        ctx.replyWithVideo({url: video.sd})
    }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
