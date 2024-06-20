# Facebook Video Downloader Bot for telegram

## To run the project:
Set up a `.env` file in the root directory.

You can use the `.env.example` file as a template with the following content:

```properties
BOT_TOKEN='your_bot_token'
```

How to get a bot token:
1. Open Telegram and search for `BotFather`
2. Start a chat with `BotFather`
3. Send `/newbot` command
4. Follow the instructions
5. Copy the token and paste it in the `.env` file

Install dependencies (using [Bun](https://bun.sh/)):

```bash
bun install
```

Run:

```bash
bun dev
```
