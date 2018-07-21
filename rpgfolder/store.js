const Discord = require("discord.js");
const fs = require("fs");
const itemStats = require("../items.json");

module.exports.run = (bot, message, args) => {

    let storeembed = new Discord.RichEmbed()
    .setTitle("Store")
    .setColor("#00ffff")
    .setFooter(message.author.username)
    .addField("Sword", `Cost: $${itemStats.Sword.price}, Strength: ${itemStats.Sword.strength}`)
    .addField("Pickaxe", `Cost: $${itemStats.Pickaxe.price}, Strength: ${itemStats.Pickaxe.strength}`);

    let botchannel = message.guild.channels.find(`name`, "general");

    return botchannel.send(storeembed);

}

module.exports.help = {
    name: "store"
}
