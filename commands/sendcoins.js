const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let custPrefixes = JSON.parse(fs.readFileSync("../prefixes.json", "utf8"));

module.exports.run = async (bot, message, args) => {

    let coinFile = JSON.parse(fs.readFileSync("../coins.json", "utf8"));

    let gUser = message.author;

    if(!args[0]){
        return message.channel.send("Please specify an amount of coins.");
    }

    if(args[0] == "help"){
        return message.chanenel.send(`Usage: ${custPrefixes[message.guild.id].custPrefixes}sendcoins <amountOfCoins>`)
    }

    let rUser = message.guild.member(message.mentions.users.first());

    if(!rUser){
        return message.author.send(`Could not indentify ${rUser} in ${message.guild.name}.`)
    }

    let amountOfCoins = parseInt(args.join(" ").slice(22));

    if(amountOfCoins >= 1001 || amountOfCoins < 5){
        return message.author.send(`You can send max: 1000, min: 5, in server ${message.guild.name}.`);
    }

    if(amountOfCoins > coinFile[gUser.id].gold){
        return message.author.send(`You only have ${coinFile[gUser.id].gold} coins!`);
    }

    if(!coinFile[rUser.id]){
        coinFile[rUser.id] = {
            gold: amountOfCoins
        };
        coinFile[gUser.id] = {
            gold: coinFile[gUser.id].gold - amountOfCoins
        };
        fs.writeFile("../coins.json", JSON.stringify(coinFile), (err) => {
        });

        let sendembed = new Discord.RichEmbed()
        .setTitle("Coins Sent")
        .setDescription("Coins Sent")
        .setColor("#0000ff")
        .addField("Receiving User", rUser)
        .addField("Coins Received", amountOfCoins)
        .addField(`${rUser.user.username}'s gold`, `$${coinFile[rUser.id].gold}`)
        .addField(`${gUser.username}'s gold`, `$${coinFile[gUser.id].gold}`);

        return message.channel.send(sendembed);
    }

    coinFile[rUser.id] = {
        gold: coinFile[rUser.id].gold + amountOfCoins
    };

    coinFile[gUser.id] = {
        gold: coinFile[gUser.id].gold - amountOfCoins
    };

    fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
        if (err) console.leg(err);
    });

    let sendembed = new Discord.RichEmbed()
    .setTitle("Coins Sent")
    .setDescription("Coins Sent")
    .setColor("#0000ff")
    .addField("Receiving User", rUser)
    .addField("Coins Received", amountOfCoins)
    .addField(`${rUser.user.username}'s gold`, `$${coinFile[rUser.id].gold}`)
    .addField(`${gUser.username}'s gold`, `$${coinFile[gUser.id].gold}`);

    return message.channel.send(sendembed);

}

module.exports.help = {
    name: "sendcoins"
}
