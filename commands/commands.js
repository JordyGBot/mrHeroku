const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (bot, message, args) => {

	let customPrefixes = JSON.parse(fs.readFileSync("../prefixes.json", "utf8"));
	let guildPrefix = customPrefixes[message.guild.id].custPrefixes;

	let commandsembed = new Discord.RichEmbed()
	.setTitle("Commands")
	.setDescription("Commands for Bot")
	.setColor("#885ead")
	.setFooter("Normal Commands")
	.addField(`${guildPrefix}8ball <question>`, "Allows you to play 8ball with the bot")
	.addField(`${guildPrefix}addrole <user> <role>`, "Allows co-founders+ to add a <role> to <user>")
	.addField(`${guildPrefix}ban <user> <reason>`, "Allows co-founders+ to ban users")
	.addField(`${guildPrefix}botinfo`, "Briefly gives information about the bot")
	.addField(`${guildPrefix}clear <number>`, "Allows moderators+ to clear a <number> of messages")
	.addField(`${guildPrefix}commands`, "Shows you this list of commands")
	.addField(`${guildPrefix}dog`, "Shows a random gif/img of a dog")
	.addField(`${guildPrefix}givecoins <user> <amount>`, "Allows moderators+ to give a <user> an <amount> of coins")
	.addField(`${guildPrefix}gold`, "Shows you how much gold you have")
	.addField(`${guildPrefix}kick <user> <reason>`, "Allows moderators+ to kick a <user>")
	.addField(`${guildPrefix}mute <user> <time>`, "Allows moderators+ to mute a <user> for a certain amount of <time>")
	.addField(`${guildPrefix}prefix <any>`, "Allows co-founders+ to assign <any> keyboard character or a string as the new prefix")
	.addField(`${guildPrefix}removerole <user> <role>`, "Allows co-founders+ to remove a <role> from <user>")
	.addField(`${guildPrefix}report <user> <reason>`, "Allows anyone in the server to file a report about <user>")
	.addField(`${guildPrefix}say <message>`, "Allows specific users to announce a <message>")
	.addField(`${guildPrefix}sendcoins <user> <amount>`, "Allows anyone in the server to a <user> an <amount> of their coins")
	.addField(`${guildPrefix}serverinfo`, "Provides the user with some info about the server")
	.addField(`${guildPrefix}warn <user> <reason>`, "Allows moderators to warn a <user> for a certain <reason>");

	let rpgcommandsembed = new Discord.RichEmbed()
	.setTitle("RPG Commands")
	.setDescription("Commands for RPGBot")
	.setColor("#0bcaff")
	.setFooter("RPG Commands")
	.addField("-buy <item>", "Allows you to buy an item if you have enough money")
	.addField("-store", "Shows you what the RPGBot has in store for you")
	.addField("-invent", "Shows you your own inventory and how many items you have");
	
	
	message.author.send(commandsembed);
	message.author.send(rpgcommandsembed);

	return;
}

module.exports.help = {
	name: "commands"
}
