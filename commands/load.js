const DiscordJS = require('discord.js')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const Canvas = require('canvas')
const path = require('path')

module.exports = {
    category: "Carrier Missions",
    description: "Gives text and an image for a Carrier Loading Mission.",
    slash: true,
    testOnly: false, // False=Global which takes 1hr to populate.
    minArgs: 8,

    options: [
      {
        name: 'nactag',
        description: 'Does the carrier have the N.A.C. tag?',
        required: true,
        default: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.BOOLEAN,
      },
      {
        name: 'carriername',
        description: 'The name of your carrier (DO NOT INCLUDE N.A.C. TAGS!).',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'carrierid',
        description: "Your carrier's unique ID",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'commodity',
        description: "The commodity your carrier is loading. Agronomic Treatment may be typed as agro or Agro.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'station',
        description: "The station your carrier is loading from.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'system',
        description: "The system you are loading in.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'profit',
        description: "Profit Per Unit in thousands. Do NOT include 'k' to indicate thousands.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'units',
        description: "How many units your carrier is loading.",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
      },
      {
        name: 'background',
        description: 'The background of your mission image',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.ATTACHMENT,
      },
      {
        name: 'carrierlogo',
        description: 'The logo of your fleet carrier.',
        required: false,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.ATTACHMENT,
      },
    ],

    callback: async ({ interaction }) => {
        // Retreving Inputs from Options
        var nactag
        var carrierlogo
        var wallpaper
        let CarrierName = interaction.options.getString('carriername') 
        let CarrierID = interaction.options.getString('carrierid')
        var Commodity = interaction.options.getString('commodity')
        let Station = interaction.options.getString('station')
        let System = interaction.options.getString('system')
        let Profit = interaction.options.getString('profit')
        let Units = interaction.options.getString('units')
        // Setting a Default Background
        if (interaction.options.getAttachment('background') == null) {
          var wallpaper = path.join(__dirname, '../wallpaper.png')
        } else {
          var wallpaper = interaction.options.getAttachment('background').url
        }
        // Setting a Default Carrier Logo
        if (interaction.options.getAttachment('carrierlogo') == null) {
          var carrierlogo = path.join(__dirname, '../profile-image.png')
        } else {
          var carrierlogo = interaction.options.getAttachment('carrierlogo').url
        }
        // Spell Correcting Agronomic Treatment
        const agro = 'Agronomic Treatment'
        if (Commodity = 'agro') {
            var Commodity = agro
        } else if (Commodity = 'Agro') {
            var Commodity = agro
        }
        // Setting NAC Tag Output
        if (interaction.options.getBoolean('nactag') === true) {
            var nactag = "NAC"
        } else {
            var nactag = ""
        }
        // Making the Image Canvas
        const canvas = Canvas.createCanvas(1024, 512)
        const ctx = canvas.getContext('2d')
        const background = await Canvas.loadImage(wallpaper)
        // Making the Elite Trader Icon
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        const trader = await Canvas.loadImage(carrierlogo)
        ctx.drawImage(trader, 25, 400, 100, 100)
        // Making The Carrier Name Text
        ctx.font = '60px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${nactag} ${CarrierName} ${CarrierID}`, 130, 470);
        // Making the Commodity Field
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${Commodity}`, 35, 310);
        // Making the Station-System Field
        ctx.font = '25px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${Station} - ${System}`, 35, 350);
        // Making the Profit Per Unit / Units Field
        ctx.font = '25px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${Profit}k Per Unit Profit, ${Units} Units`, 35, 390);
        // Making the Unloading/Loading Field
        ctx.font = '25px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Now Loading', 35, 265);
        const attachment = new MessageAttachment(canvas.toBuffer(('image/png'), '../carrier-image.png'))
        const embed = new MessageEmbed()
        .setTitle("Carrier Loading Mission Post")
        .setDescription(`\`**${nactag} ${CarrierName} (${CarrierID})** is **loading** ${Commodity} from **${Station}** in the **${System}** system. **${Profit}k**/u Profit, **${Units}** units.\``)
        .setColor("#00c9cc")

        const newMessage = await interaction.reply({
            embeds: [embed],
            files: [attachment],
            ephemeral: true,
        })
    },
}
