const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    let custPrefixes = JSON.parse(fs.readFileSync("../prefixes.json", "utf8"));

    if(!message.member.roles.some(r=>["Owner"].includes(r.name))){
        return message.author.send("You do not have the permissions to set prefixes.");
    }
    
    if(!args[0] || args[0] == "help"){
        return message.channel.send(`Usage: ${custPrefixes[message.guild.id].custPrefixes}prefix <desired prefix>`);
    }

    custPrefixes[message.guild.id] = {
        custPrefixes: args[0], rpgPrefixes: custPrefixes[message.guild.id].rpgPrefixes
    };

    fs.writeFile("../prefixes.json", JSON.stringify(custPrefixes), (err) => {
        if (err) console.leg(err)
    });

    let pembed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("New Prefix")
    .setDescription("A new prefix was set")
    .addField("New Prefix", `The new prefix is ${args[0]}`);

    bot.user.setActivity(`DivBot | ${args[0]}commands`)

    return message.channel.send(pembed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
    name: "prefix"
}
