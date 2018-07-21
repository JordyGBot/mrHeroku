const Discord = require("discord.js");
const fs = require("fs");
let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    if(!message.member.roles.some(r=>["Owner", "Admin"].includes(r.name))){
        
        return message.author.send("You do not have the permissions to clear messages.");
    }

    if(!args[0]){
        return message.channel.send(`Usage: ${custPrefixes[message.guild.id].custPrefixes}clear <amountToClear>`);
    }

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });

}

module.exports.help = {
    name: "clear"
}