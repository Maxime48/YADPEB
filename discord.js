const {
    DISCORD_TOKEN,
    DISCORD_PREFIX,
    DISCORD_OWNER,
	GIVEWAY_CHANNEL,
	GIVEWAY_CHANNEL_COMMUNITY,
    BASE_URL,
	STATUS_URL,
	STATUS_CHANNEL
} = process.env;

const Discord = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const ms = require("ms");
const client = new Discord.Client();
client.login(DISCORD_TOKEN);

var request = require('request');

const webstatus = require("./automatic/websitecheck.js");
const autoresponse = require("./automatic/auto-response.js");

const paypal = require("./commands/paypal.js");
const rules = require("./commands/rules.js");
const giveaway = require("./commands/giveaway.js");

const activities_list = [
    `with your sanity.`, 
    `with ${DISCORD_PREFIX}help `
    ];

client.on("ready", () => {
    console.log("Bot is listening");
	
	var act =0;
	setInterval(() => {
        client.user.setActivity(activities_list[act]);
		act = act + 1;
		if (act === 2) {act=0;}
    }, 15000);
	
	webstatus.init(request,Discord,client,STATUS_URL,STATUS_CHANNEL);
	
});

const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 10000,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager = manager;

client.on("message", (message) => {

    const args = message.content.slice(DISCORD_PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

	if(!(command === 'ignore'))
	{
		autoresponse.auto(request,Discord,message)
	}

    // Si le message ne commence pas par le préfixe
    if(!message.content.startsWith(DISCORD_PREFIX)) return;
	
    // Si le message ne vient pas du propriétaire du bot
    if(message.member.roles.cache.find(role => role.name === 'paypalmod'))
	{    
    // Si la commande est create
		if(command === "create"){
			paypal.command(Discord,client,message,args,BASE_URL)
		}
	
	} 
	else 
	{ 
		const embedinsmodperm = new Discord.MessageEmbed()
		.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
		.setDescription("Log:")
		.addField("Error:", "you must be 'paypalmod'.", true)
		.addField("Try this instead:", `${DISCORD_PREFIX}:help`, true)
		.addField("You are trying to:", ` Create an invoice`)
		.setColor("#0091fc");	
				
		message.channel.send(embedinsmodperm);
	}
		
	if(command === "rule"){
		rules.rules(request,Discord,message,args)
	}
	
	if(command === "help")
	{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Command list:")
			.addField("Paypal | admin:", `${DISCORD_PREFIX}create @user EUR details`, true)
			.addField("Rules command details", `${DISCORD_PREFIX}rule help`, true)
			.addField("Giveaway command details:", `${DISCORD_PREFIX}giveaway help`, true)
			.addField("Ping the bot: ", `${DISCORD_PREFIX}ping`)
			.addField("Block auto response on error messages: ", `${DISCORD_PREFIX}ignore`, true)
			.addField("Print website status: ", `${DISCORD_PREFIX}webstatus`, true)
			.setColor("#22069c")	
			.setFooter('Please note that this might change');
				
			message.channel.send(embedhelp);	
			
			message.delete();
	}
	
	if(command === 'ping')
	{
		  message.channel.send("Pinging...").then(m =>{
          // The math thingy to calculate the user's ping
            var ping = m.createdTimestamp - message.createdTimestamp;

			const embedping = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Ping infos:")
			.addField("Ping:", `${ping}`, true)
			.setColor("#22069c")	
				
			message.channel.send(embedping);	
			
			message.delete(); 
		   
            // Then It Edits the message with the ping variable embed that you created | seems useless
			//m.edit(embedping)
        });
	}	
	
	if(command === 'webstatus')
	{
		webstatus.webstatuscommand(request,Discord,message);
	}
	
	if(command === 'giveaway')
	{
		if(args[0] === 'help')
		{
			giveaway.help(Discord,message);
		}
		else if(args[0] === 'mod')
		{
			if(!(message.member.hasPermission("ADMINISTRATOR")))
			{

				const criticalpermission = new Discord.MessageEmbed()
				.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
				.setDescription("Error infos:")
				.addField("Permission error:", `You are not administrator`, true)
				.setColor("#b80b0b")	
				
				message.channel.send(criticalpermission);				
			}
			else
			{
				giveaway.create(Discord,message,args,client,GIVEWAY_CHANNEL,GIVEWAY_CHANNEL_COMMUNITY,ms)
			}
		}
		else if(args[0] === 'community')
		{
			giveaway.create(Discord,message,args,client,GIVEWAY_CHANNEL,GIVEWAY_CHANNEL_COMMUNITY,ms)
		}
		message.delete();
	}
	
	if(command === 'apitest')
	{
		const url = 'http://api.open-notify.org/astros.json';
		
		request(url, function (error, response, body) {
			if(!error && response.statusCode == 200){
				let json = JSON.parse(body);
				console.log(json);
			}
			else
			{
				msg.reply('Failed api test');
			}
		});
	}

});

module.exports = client;
