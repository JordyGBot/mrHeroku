const Discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

	if(!args[2]) {
		
		return message.author.send("2 arguments required to use 8ball command, you gave 1.");
	}

	let replies = ["Yes.", "No.", "Of course.", "Doubtful.", "Most likely.", "Ask again later."];

	let result = Math.floor((Math.random() * replies.length));
	let question = args.slice(0).join(" ");

	let ballembed = new Discord.RichEmbed()
	.setAuthor(message.author.tag)
	.setColor("#FF9900")
	.addField("Question", question)
	.addField("Answer", replies[result]);

	return message.channel.send(ballembed);

}

module.exports.help = {
	name: "8ball"
}
