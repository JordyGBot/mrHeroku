const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let coinFile = JSON.parse(fs.readFileSync("./coins.json", "utf8"));
    let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!message.member.roles.some(r=>["Owner", "Admin"].includes(r.name))){
        
        return message.author.send(`You do not have the permissions to givecoins in server ${message.guild.name}.`);
    }

    if(!args[0]){
        return message.channel.send("Please specify an amount of coins.");
    }

    let rUser = message.guild.member(message.mentions.users.first());

    if(!rUser){
        
        return message.author.send(`Could not indentify ${rUser} in ${message.guild.name}.`)
    }

    let amountOfCoins = parseInt(args.join(" ").slice(22));

    if(amountOfCoins >= 1001){
        
        return message.author.send(`You can give a maximum of 1000 coins, in server ${message.guild.name}.`);
    }

    if(!coinFile[rUser.id]){
        coinFile[rUser.id] = {
            gold: amountOfCoins
        }
        fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
            if (err) console.log(err);
        })

        let giveembed = new Discord.RichEmbed()
        .setTitle("New Coins")
        .setDescription("Coin Balance Increased")
        .setColor("#00ff00")
        .addField("Receiving User", rUser)
        .addField("Coins Received", amountOfCoins)
        .addField("Gold", `$${coinFile[rUser.id].gold}`);

        return message.channel.send(giveembed);
    }

    coinFile[rUser.id] = {
        gold: coinFile[rUser.id].gold + amountOfCoins
    };

    fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
        if (err) console.leg(err);
    })

    let giveembed = new Discord.RichEmbed()
    .setTitle("New Coins")
    .setDescription("Coin Balanced Increased")
    .setColor("#00ff00")
    .addField("Receiving User", rUser)
    .addField("Coins Received", amountOfCoins)
    .addField("Gold", `$${coinFile[rUser.id].gold}`);

    return message.channel.send(giveembed);

}

module.exports.help = {
    name: "givecoins"
}