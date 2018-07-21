const Discord = require("discord.js");
const fs = require("fs");
let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Admin"].includes(r.name))){
        return message.author.send("You may not use the bot to send messages.");
    }

    if (!args[0]){
        return message.channel.send(`Usage: ${custPrefixes[message.guild.id].custPrefixes}say <desired message>`);
    }

    return message.channel.send(args.join(" "));

}

module.exports.help = {
    name: "say"
}