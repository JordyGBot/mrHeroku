const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async(bot, message, args) => {

	let {body} = await superagent
	.get(`https://random.dog/woof.json`);
	
	let dogembed = new Discord.RichEmbed()
	.setColor("#020b0c")
	.setTitle("Doggy")
	.setImage(body.url);

	;

	let dogchannel = message.guild.channels.find(`name`, "random");

	return dogchannel.send(dogembed);

}

module.exports.help = {
	name: "dog"
}