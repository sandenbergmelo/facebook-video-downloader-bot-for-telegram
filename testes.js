import fbDownloader from 'fb-downloader'

const videoURL = 'https://fb.watch/c4nli-fkj4/'

const pattern = /^https:\/\//i

if (pattern.test(videoURL)) {
    console.log('Video URL is valid')
}
fbDownloader(videoURL)
    .then(videoInfos => {
        console.log(videoInfos)
    })
