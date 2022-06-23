const DiscordJS = require('discord.js')
const { Client, Intents, MessageAttachment } = require('discord.js')
const WOKCommands = require('wokcommands')
const Canvas = require("canvas")
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

const client = new  DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,]
})

client.on('ready', async () => {
    console.log("The tool is active.")

    new WOKCommands(client, {
        commandsDir: path.join(__dirname, 'commands'),
        testServers: ['TEST_ID'],
        mongoUri: process.env.MONGO_URI,
    })
})
client.login(process.env.TOKEN)
