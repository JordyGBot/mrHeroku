const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
	let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		
	if (!kUser){
		
		return message.author.send(`Could not identify ${kUser} member.`);
	}

	let kReason = args.join(" ").slice(22);
	if(!message.member.roles.some(r=>['Owner', 'Admin', 'Moderator'].includes(r.name))){
		
		return message.author.send("You do not have the permissions to mute members.");
	}
	if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("User can not be kicked.");

	let kickembed = new Discord.RichEmbed()
	.setTitle("Kick Evaluation")
	.setDescription("User Kicked")
	.setColor("#ffa500")
	.addField("User Kicked", `${kUser} with ID: ${kUser.id}`)
	.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
	.addField("Kicked In", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", kReason);

	let incidentchannel = message.guild.channels.find(`name`, "kicks")
	if (!incidentchannel) return message.channel.send("Could not find incidents channel.");

	message.guild.member(kUser).kick(kReason);
	incidentchannel.send(kickembed);
}

module.exports.help = {
	name: "kick"
}