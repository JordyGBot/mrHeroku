const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let fixesOnline = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
let coinFile = JSON.parse(fs.readFileSync("./coins.json", "utf8"));

bot.rpgcomponents = new Discord.Collection();

fs.readdir("./rpgfolder/", (err,files) =>{
	if (err) console.leg(err);

	let rpgjsfile = files.filter(f => f.split(".").pop() === "js")
	if (rpgjsfile.length <= 0){
		console.log("Could not load RPG Module");
		return;
	}

	rpgjsfile.forEach((f,i) => {
		let rpgprops = require(`./rpgfolder/${f}`);
		console.log(`${f} loaded!`);
		bot.rpgcomponents.set(rpgprops.help.name, rpgprops);
	});
})

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) =>{

	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js");
	
	if (jsfile.length <= 0){
		console.log("Could not find commands.");
		return;
	}

	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});

});

bot.on("ready", async () => {
	console.log(`${bot.user.username} is online in ${bot.guilds.size} servers!`);
	bot.user.setActivity("DivBot | Type [prefix]");
});

bot.on("guildMemberAdd", async member => {
	let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
	console.log(`${member.id} has joined the server ${member.guild.name}.`);
	let welcomechannel = member.guild.channels.find(`name`, "general");
	welcomechannel.send(`<@${member.id}> has joined the server! Welcome!`);
	member.send(`The prefix for ${member.guild.name} is ${custPrefixes[member.guild.id].custPrefixes}`)
});

bot.on("guildMemberRemove", async member => {
	console.log(`${member.id} has left the server ${member.guild.name}.`);
	let welcomechannel = member.guild.channels.find(`name`, "general");
	welcomechannel.send(`<@${member.id}> has left the server! Goodbye!`);
});

bot.on("message", async message => {

	let playerItemFile = JSON.parse(fs.readFileSync("./playeritems.json", "utf8"));

	if (message.author.bot) return;
	if (message.channel.type === "dm") return;

	let custPrefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

	if(!custPrefixes[message.guild.id]){
		custPrefixes[message.guild.id] = {
			custPrefixes: botconfig.prefix, rpgPrefixes: botconfig.rpgprefix
		};
		fs.writeFile("./prefixes.json", JSON.stringify(custPrefixes), (err) => {
			if (err) console.log(err);
		});
	}

	if(!playerItemFile[message.author.id]){
		playerItemFile[message.author.id] = {
			swords: 0, pickaxes: 0
		};
		fs.writeFile("./playeritems.json", JSON.stringify(playerItemFile), (err) => {
			if (err) console.log(err);
		});
	}

	if(!coinFile[message.author.id]){
		coinFile[message.author.id] = {
			gold: 0
		};
		fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
			if (err) console.log(err);
		});
	}

	let math = Math;

	let coinAmount = math.floor(math.random() * 35) + 1;
	let baseAmount = math.floor(math.random() * 35) + 1;
	let addAmount = math.floor((coinAmount/6) + 2);

	if(coinAmount === baseAmount) {
		coinFile[message.author.id] = {
			gold: coinFile[message.author.id].gold + addAmount
		};
	fs.writeFile("./coins.json", JSON.stringify(coinFile), (err) => {
		if (err) console.log(err);
	});

	let coinembed = new Discord.RichEmbed()
	.setTitle("Earned Coins")
	.setAuthor(message.author.username)
	.setColor("#37ff37")
	.addField("💰", `${addAmount} coins earned`);

	message.channel.send(coinembed).then(msg => {msg.delete(3000)});
}

	let prefix = custPrefixes[message.guild.id].custPrefixes;
	let rpgprefix = custPrefixes[message.guild.id].rpgPrefixes;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);

	if(message.content == "[prefix]"){
		bot.user.setActivity(`DivBot | Type ${custPrefixes[message.guild.id].custPrefixes}commands`);
		return message.author.send(`Your guild's prefix is `+ '``' + `${custPrefixes[message.guild.id].custPrefixes}` + '``' + ` for normal commands and ` + '``' + `${custPrefixes[message.guild.id].rpgPrefixes}` + '``' + ` for RPG commands.`);
	}

	if(!message.content.startsWith(prefix)){
		if(!message.content.startsWith(rpgprefix)){
			return;
		}else{
			let rpgfile = bot.rpgcomponents.get(command.slice(rpgprefix.length));
			if(rpgfile){
				return rpgfile.run(bot, message, args);
			}
		}
	}else{
		let commandfile = bot.commands.get(command.slice(prefix.length));
		if (commandfile){
			return commandfile.run(bot, message, args);
	}}

});

bot.login(tokenfile.token);
