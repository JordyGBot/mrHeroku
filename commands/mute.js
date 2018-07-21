const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

	if(!message.member.roles.some(r=>['Owner', 'Admin', 'Moderator'].includes(r.name))){
		
		return message.author.send("You do not have the permissions to mute members.");
	}
	let tomute = (message.mentions.members.first());
	if (!tomute){
		return message.reply("couldn't identify user.");
	}
	if (tomute.hasPermission("MANAGE_MESSAGES")){
		return message.reply("can not mute user.");
	}
	let muterole = message.guild.roles.find(`name`, "Muted");
	if (!muterole){
		try{
			muterole = await message.guild.createRole({
				name: "Muted",
				color: "#ff0000",
				permissions:[]
			})
			message.guild.channels.forEach(async(channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false
				});
			});
		}catch(e){
			console.log(e.stack);
		}
	}

	let reason = args.slice(1).join(" ");
	if(!reason){
		
		return message.author.send("You must specify a reason when muting members.");
	}

	await tomute.addRole(muterole.id);

	let muteembed = new Discord.RichEmbed()
	.setTitle("Mute Evaluation")
	.setDescription("User Muted")
	.setColor("#ffff00")
	.addField("Muted User", `${tomute} with ID: ${tomute.id}`)
	.addField("Muted By", `${message.author} with ID: ${message.author.id}`)
	.addField("Channel", message.channel)
	.addField("Time", message.createdAt)
	.addField("Reason", reason);

	let mutechannel = message.guild.channels.find(`name`, "mutes");
	if (!mutechannel) return message.author.reply("could not find mutes channel.");

	
	mutechannel.send(muteembed);

}

module.exports.help = {
	name: "mute"
}