const Discord = require("discord.js");
const fs = require("fs");
const mobs = require("./enemies.json");

module.exports.run = (bot, message, args) => {

    let coinFile = JSON.parse(fs.readFileSync("../coins.json", "utf8"));
    
    let aUser = message.author;

    let chance = Math.floor((Math.random() * 10) + 1);

    if (chance >= 10){
        let enemy = "Spider";

        message.channel.send(`${aUser} came into contact with a spider!`).then(msg => {msg.delete(3000)});

        let winChance = Math.floor((Math.random() * 10) + 1);

        if (winChance <= 10){
            message.channel.send(`${aUser} struck the spider down and won the battle + 5 coins!`).then(msg => {msg.delete(3000)});
            if(coinFile[aUser.id]){
                coinFile[aUser.id].gold = {
                    gold: coinFile[aUser.id].gold + 5
                }
                return;
            }
            coinFile[aUser.id].gold = {
                gold: 5
            }
            return;
        }

        return message.channel.send(`${aUser} lost the fight!`)/then(msg => {msg.delete(3000)});
    }

}

module.exports.help = {
    name: "attack"
}
