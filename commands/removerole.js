const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
	if (!message.member.roles.some(r=>['Owner', 'Admin'].includes(r.name))) {
		return message.author.send("You do not have the permission to give someone a role.");
	}
	let rMember = message.guild.member(message.mentions.users.first());
	if (!rMember){
		return message.author.send(`Could not identify ${rMember}.`);
	}
	let role = args.join(" ").slice(22);
	if (!role){
		return message.author.send("Please specify a valid role.");
	}
	let gRole = message.guild.roles.find(`name`, role);
	if (!gRole){
		return message.author.send(`${role} is an invalid role.`);
	}
	if(!rMember.roles.has(gRole.id)){
		 
		return message.author.send(`${rMember} does not have ${role}.`);
	};
	await(rMember.removeRole(gRole.id));

	 

	try{
		await rMember.send(`The role ${gRole.name} in server ${message.guild.name} has been revoked from your account!`);
	}catch(e){
		message.channel.send(`<@${rMember.id}> has been revoked of the role ${gRole.name}! We tried to message them but their DMs were blocked!`);
	}
}

module.exports.help = {
	name: "removerole"
}