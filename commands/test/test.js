// Credits BelethLucifer(Mika#5285), Valatos and TheStrikes.
// Last update: 03/12/2022 Fixed formatting and removed unused code. Removed username, now auto selects from nickname. Forced Ephemeral for all messages.

/// Pre-command requirements
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const noblox = require('noblox.js');
const Nodeactyl = require('nodeactyl');
const { APIKEY } = require('../../config.json');
const client = new Nodeactyl.NodeactylClient("https://control.novonode.com", APIKEY);
/// const application = new Nodeactyl.NodeactylApplication("https://control.novonode.com", `"${APIKEY}"`);


///Command creator section
module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Police Assistant Bot died again? Use this command to restart it!'),

    async execute(interaction) {
const serverId = await client.getAllServers().then(data => {
    console.log(data)
    console.log(JSON.stringify(data))
    console.log("test"
    )
})
.catch(err => {
    console.log(err)
})

interaction.reply("Test");
    }

}
