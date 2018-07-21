const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (bot, message, args) => {
    
    let botchannel = message.guild.channels.find(`name`, "general");

    let playerItemFile = JSON.parse(fs.readFileSync("./playeritems.json", "utf8"));

    let iUser = message.author;

    if(!playerItemFile[iUser.id]){
        return botchannel.send(`<@${iUser.id}> does not have any items.`);
    }

    let inventoryembed = new Discord.RichEmbed()
    .setTitle("Player Inventory")
    .setFooter(`${iUser.username}`)
    .setColor("#ab00fc")
    .addField("Swords", `${playerItemFile[iUser.id].swords} swords`)
    .addField("Pickaxes", `${playerItemFile[iUser.id].pickaxes} pickaxes`);

    return botchannel.send(inventoryembed);

}

module.exports.help = {
    name: "invent"
}
