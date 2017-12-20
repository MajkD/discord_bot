const auth = require('./auth.json');
const DiceRoller = require('./dice_roller.js');
const Discord = require("discord.js");
const roller = new DiceRoller();
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function onError(msg, error) {
  embed = {
    embed: {
      title: "Oops there was an error",
      description: error,
      color: 16012098
    }
  }
  msg.author.send(embed);
}

function onDiceRolled(msg, result) {
  embed = {
    embed: {
      title: result.title,
      description: result.message,
      color: 7708415
    }
  }
  msg.channel.send(embed);
}

client.on('message', function (msg) {
  if (msg.content.startsWith(":") && msg.content.endsWith(":")) {
    var result = roller.roll(msg, onError, onDiceRolled);
  }
});

client.login(auth.token);