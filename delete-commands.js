const { REST, Routes } = require('discord.js');
const { clientId, guildId, bot_token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(bot_token);

// ...

// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);