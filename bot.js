const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name.toLowerCase() === 'stoners');
    if (!channel) return;

    channel.send(`Welcome to the stoners server, ${member}.  Weed is good, weed is fine, If you share your weed, ill share mine..`);
});

client.on('message', msg => {
    if (msg.author.bot) return;

    if (msg.content === 'ping') {
        msg.reply('pong');
    }

    if (config.reactors.some(term => msg.content.includes(term))) {
        let randomMantra = config.mantras[Math.floor(Math.random() * config.mantras.length)]
        msg.channel.send(randomMantra);
    }
});

client.login(config.token);