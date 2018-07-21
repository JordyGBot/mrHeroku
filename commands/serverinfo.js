const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
	let sicon = message.guild.iconURL;
	let serverembed = new Discord.RichEmbed()
	.setDescription("Server Information")
	.setColor("#75efaa")
	.setThumbnail(sicon)
	.addField("Server Name", message.guild.name)
	.addField("Server Created", message.guild.createdAt)
	.addField("You Joined", message.member.joinedAt)
	.addField("Total Members", message.guild.memberCount);

	return message.channel.send(serverembed);
}

module.exports.help = {
	name: "serverinfo"
}