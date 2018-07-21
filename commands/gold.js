const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    let coinFile = JSON.parse(fs.readFileSync("./coins.json", "utf8"));

    if ((args[0]) == "help") {
        return message.channel.send(`Usage: ${custPrefixes[message.guild.id].custPrefixes}coins`);
    }

    if(!coinFile[message.author.id]){
        coinFile[message.author.id] = {
            gold: 0
        }
        fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
        });
    }

    let coinembed = new Discord.RichEmbed()
    .setTitle("Coins")
    .setDescription("User Coins")
    .setColor("#00ff00")
    .addField("User", message.author)
    .addField("Gold", `$${coinFile[message.author.id].gold}`);

    let botchannel = message.guild.channels.find(`name`, "general");
    if(!botchannel){
        return message.channel.send("No bot_commands channel.");
    }

    return botchannel.send(coinembed);

}

module.exports.help = {
    name: "gold"
}
