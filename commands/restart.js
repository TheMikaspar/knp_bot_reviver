// Credits BelethLucifer(Mika#5285)
// Last update: 17/03/2023 First release. Forced Ephemeral for all messages.

/// Pre-command requirements
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { waitForDebugger } = require('inspector');
const noblox = require('noblox.js');
const Nodeactyl = require('nodeactyl');
const { APIKEY, SERVERID } = require('../config.json');
const client = new Nodeactyl.NodeactylClient("https://control.novonode.com/", APIKEY );

/// Wait function
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

///Command creator section
module.exports = {
    data: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('Police Assistant Bot died again? Use this command to restart it!')
        .addSubcommand(subcommand =>
            subcommand
            .setName('bot')
            .setDescription('Restarts the bot itself'))
        .addSubcommand(subcommand =>
            subcommand
            .setName('server')
            .setDescription('Restart the host/server')),

    async execute(interaction) {
        const serverId = SERVERID.toString();
       await interaction.deferReply({ephemeral: true});
        
        //Restart bot only
        if (interaction.options.getSubcommand() === 'bot'){
        const botRestart = await client.sendServerCommand(serverId, "node bot.js").then(data => {
            console.log(`${interaction.user.tag} restarted the bot!`)
        }) 
        .catch(err => {
            console.log(err)
             interaction.editReply({content: `Something went wrong. Show BelethLucifer this error and this code: ${err}`, ephemeral: true})
        })
        interaction.editReply({content: "Bot succesfully restarted!", ephemeral:true})

// Restart server, then the bot
    } else if (interaction.options.getSubcommand() === 'server') {
        const serverRestart = await client.startServer(serverId).then(data => {
            console.log(`${interaction.user.tag} restarted the server!`)
        })
        .catch(err => {
            console.log(err)
            interaction.editReply({content: `Something went wrong. Show BelethLucifer this error and this code: ${err}`, ephemeral: true});
        })
        await sleep(10000)
        const botRestart = await client.sendServerCommand(serverId, "node bot.js").then(data => {
            console.log(`${interaction.user.tag} restarted the bot!`)
        }) 
        .catch(err => {
            console.log(err)
             interaction.editReply({content: `Something went wrong. Show BelethLucifer this error and this code: ${err}`, ephemeral: true})
        })
        interaction.editReply({content: "Server and bot succesfully restarted!", ephemeral: true})
    }
}
};
