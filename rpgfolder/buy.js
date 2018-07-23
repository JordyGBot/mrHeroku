const Discord = require("discord.js");
const fs = require("fs");
const itemStats = require("./items.json");

module.exports.run = (bot, message, args) => {

    let playerItemFile = JSON.parse(fs.readFileSync("../playeritems.json", "utf8"));
    
    let playerCoins = JSON.parse(fs.readFileSync("../coins.json", "utf8"));
    
    let bUser = message.author;

    if(!playerItemFile[bUser.id]){
        playerItemFile[bUser.id] = {
            swords: 0, pickaxes: 0
        };
        fs.writeFile("../playeritems.json", JSON.stringify(playerItemFile), (err) => {
        });
    }

    if(!playerCoins[message.author.id]){
        playerCoins[message.author.id] = {
            gold: 0
        };
        fs.writeFile("../coins.json", JSON.stringify(playerCoins), (err) =>{
        });
    }

    if(!args[0] || args[0] == "help"){
        return message.channel.send("Usage: -buy <desired item>");
    }

    if(!itemStats[args[0]]){
        return message.channel.send("Please enter a valid item name!");
    }

    if(playerCoins[message.author.id].gold < itemStats[args[0]].price){
        return message.channel.send(`You do not have enough money to purchase ${args[0]}.`);
    }

    if(args[0] === "Sword"){
        playerItemFile[bUser.id] = {
            swords: playerItemFile[bUser.id].swords + 1, pickaxes: playerItemFile[bUser.id].pickaxes
        };
        fs.writeFile("../playeritems.json", JSON.stringify(playerItemFile), (err) => {
        });
    }

    if(args[0] === "Pickaxe"){
        playerItemFile[bUser.id] = {
            swords: playerItemFile[bUser.id].swords, pickaxes: playerItemFile[bUser.id].pickaxes + 1
        };
        fs.writeFile("../playeritems.json", JSON.stringify(playerItemFile), (err) => {
        });
    }

    playerCoins[bUser.id] = {
        gold: playerCoins[bUser.id].gold - parseInt(itemStats[args[0]].price)
    };

    fs.writeFile("../coins.json", JSON.stringify(playerCoins), (err) => {
    });

    let botchannel = message.guild.channels.find(`name`, "general");

    let buyembed = new Discord.RichEmbed()
    .setTitle("Bought Item")
    .setColor("#00abff")
    .setFooter(message.author.username)
    .addField("Item Bought", args[0]);

    return botchannel.send(buyembed);

}

module.exports.help = {
    name: "buy"
}
