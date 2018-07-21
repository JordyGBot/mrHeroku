const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async(bot, message, args) => {

	let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

	if(!message.member.roles.some(r=>['Owner', 'Admin', 'Moderator'].includes(r.name))){
		return message.author.send("You do not have the permissions to mute members.");
	}

	let wUser = message.guild.member(message.mentions.users.first());
	if(!wUser){
		return message.author.send(`${message.mentions.users.first()} does not exist in ${message.guild.name}.`)
	}
	if(wUser.hasPermission("MANAGE_MESSAGES")){
		return message.author.send(`${wUser} can not be warned.`);
	}

	let wReason = args.join(" ").slice(22);

	if(!warns[wUser.id]) warns[wUser.id] = {
		warns: 0
	};

	warns[wUser.id].warns++;

	fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
		if (err) console.leg(err);
	});

	let warnembed = new Discord.RichEmbed()
	.setTitle("Warn Evaluation")
	.setDescription("User Warned")
	.setAuthor(message.author.username)
	.setColor("#ff0000")
	.addField("Warned User", `<@${wUser.id}>`)
	.addField("Warned In", message.channel)
	.addField("Warnings", warns[wUser.id].warns)
	.addField("Reason", wReason);

	let warnchannel = message.guild.channels.find(`name`, "warnings");
	if(!warnchannel){
		return message.author.send("Could not find warnevals channel.");
	}

	return warnchannel.send(warnembed);

	if (warns[wUser.id].warns == 2){
		let muterole = message.guild.roles.find(`name`, "Muted");
		if(!muterole){
			return message.author.send("You need to create a role under the name of 'Muted' before you can warn people.");
		}
		let mutetime = "60s";
		await(wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been temporarily muted.`);

		setTimeout(function(){
			wUser.removeRole(muterole.id)
			message.channel.send(`<@${wUser.id}> has been unmuted.`);
		}, ms(mutetime))
	}
	if (warns[wUser.id].warns == 3){
		let muterole = message.guild.roles.find(`name`, "Muted");
		if(!muterole){
			return message.author.send("You need to create a role under the name of 'Muted' before you can warn people.");
		}
		let mutetime = "300s";
		await(wUser.addRole(muterole.id));
		message.channel.send(`<@${wUser.id}> has been temporarily muted.`);

		setTimeout(function(){
			wUser.removeRole(muterole.id)
			message.channel.send(`<@${wUser.id}> has been unmuted.`);
		}, ms(mutetime))
	}
	if (warns[wUser.id].warns == 4){
		message.guild.member(wUser).kick(reason);
		message.channel.send(`<@${wUser.id}> has been kicked.`);
	}

}

module.exports.help = {
	name: "warn"
}