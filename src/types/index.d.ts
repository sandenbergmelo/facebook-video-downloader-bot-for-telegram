declare module 'fb-downloader-scrapper' {
  interface Video {
    title: string
    duration_time: number
    thumbnail: string
    url: string
    sd: string
    hd?: string
  }
  export default function getFbVideoInfo(url: string): Promise<Video>
}
