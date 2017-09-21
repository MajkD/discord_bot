var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    switch(message) {
      case '1':
        bot.sendMessage({to: channelID, message: ':one:' });
        break;
      case '2':
        bot.sendMessage({to: channelID, message: ':two:' });
        break;
      case '3':
        bot.sendMessage({to: channelID, message: ':three:' });
        break;
      case '4':
        bot.sendMessage({to: channelID, message: ':four:' });
        break;
      case '5':
        bot.sendMessage({to: channelID, message: ':five:' });
        break;
      case '6':
        bot.sendMessage({to: channelID, message: ':six:' });
        break;
      case '7':
        bot.sendMessage({to: channelID, message: ':seven:' });
        break;
      case '8':
        bot.sendMessage({to: channelID, message: ':eight:' });
        break;
      case '9':
        bot.sendMessage({to: channelID, message: ':nine:' });
        break;
    }
});