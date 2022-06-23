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
        featuresDir: path.join(__dirname, 'features'),
        testServers: ['817382286378008617'],
        mongoUri: process.env.MONGO_URI,
    })

    const guildID = '817382286378008617'
    const guild = client.guilds.cache.get(guildID)
    let commands 

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands.create({
        name:"profile",
        description:"test canvas command",
    })
})
client.login(process.env.TOKEN)