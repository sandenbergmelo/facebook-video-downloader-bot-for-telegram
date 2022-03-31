import { Telegraf } from 'telegraf'
import fbDownloader from 'fb-downloader'
import 'dotenv/config'

const bot = new Telegraf(process.env.TOKEN)

bot.start((ctx) => ctx.reply('Welcome!'))

bot.on('text', (ctx) => {
    const url = ctx.message.text
    const pattern = /^https:\/\//i

    if (pattern.test(url)) {
        ctx.reply('Downloading...').then(() => {
            fbDownloader(url)
                .then((videoInfos) => {
                    const video = {
                        quality: videoInfos.hd,
                        title: `${videoInfos.title}.mp4`,
                    }

                    if (!videoInfos.hd) {
                        video.quality = videoInfos.sd
                    }

                    ctx.replyWithVideo({
                        url: video.quality,
                        filename: video.title
                    })
                })
        })
    }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
