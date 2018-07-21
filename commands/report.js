const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
	let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	
	if (!rUser){
		return message.author.send(`Could not identify ${rUser} member.`);
	}

	if(!message.member.roles.some(r=>['Owner', 'Trusted'].includes(r.name))){
		return message.author.send("You do not have the permissions to mute members.");
	}

	let reason = args.join(" ").slice(22);

	let reportembed = new Discord.RichEmbed()
	.setTitle("Report Evaluation")
	.setDescription("User Reported")
	.setColor("#ffff00")
	.addField("Reported User", `${rUser} with ID: ${rUser.id}`)
	.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);

	let reportchannel = message.guild.channels.find(`name`, "reports")
	if (!reportchannel) return message.channel.send("Could not find report channel.");

	reportchannel.send(reportembed);
}

module.exports.help = {
	name: "report"
}