const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
	let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		
	if (!bUser){
		
		return message.author.send(`Could not identify ${bUser} member.`);
	}

	let bReason = args.join(" ").slice(22);
	if (!message.member.roles.some(r=>['Founder', 'Co-Founder'].includes(r.name))) {
		
		return message.author.send("You do not have the permission to ban users.");
	}
	if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("User can not be banned.");


	let banembed = new Discord.RichEmbed()
	.setTitle("Ban Evaluation")
	.setDescription("User Banned")
	.setColor("#ff0000")
	.addField("User Banned", `${bUser} with ID: ${bUser.id}`)
	.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
	.addField("Banned In", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", bReason);

	let banchannel = message.guild.channels.find(`name`, "bans")
	if (!banchannel) return message.channel.send("Could not find incidents channel.");

	message.guild.member(bUser).ban(bReason);
	banchannel.send(banembed);
}

module.exports.help = {
	name: "ban"
}
