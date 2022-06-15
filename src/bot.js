const { Client, Intents} = require('discord.js');
const cmds = require('./cmds');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  // if (msg.mentions.users.has(client.user.id)) {
  //   msg.channel.send('👀');
  //   return;
  // }
  if (cmds.isCmd(msg.content)) cmds.dispatch(msg);
});

client.login('OTg0OTA0NjAxMTQyNzIyNjIx.GL8lkC.diljsBWFV4VaZAUoLQZYbG5A4VINy-SZUcts8A');
