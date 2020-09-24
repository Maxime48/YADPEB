const {
    DISCORD_TOKEN,
    DISCORD_PREFIX,
    DISCORD_OWNER,
    BASE_URL
} = process.env;

const Discord = require("discord.js");
const client = new Discord.Client();
client.login(DISCORD_TOKEN);

var request = require('request');

const webstatus = require("./automatic/websitecheck.js");
const autoresponse = require("./automatic/auto-response.js");

const paypal = require("./commands/paypal.js");
const rules = require("./commands/rules.js");

const activities_list = [
    "with your sanity.", 
    "with p:help "
    ];

client.on("ready", () => {
    console.log("Bot is listening");
	
	var act =0;
	setInterval(() => {
        client.user.setActivity(activities_list[act]);
		act = act + 1;
		if (act === 2) {act=0;}
    }, 15000);
	
	webstatus.init(request,Discord,client);
	
});

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
		.addField("Try this instead:", `p:help`, true)
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
			.addField("Paypal | admin:", "p:create @user EUR details", true)
			.addField("Rules command details", `p:rule help`, true)
			.addField("Giveaway command details:", `p:giveaway help`, true)
			.addField("Ping the bot: ", `p:ping`)
			.addField("Block auto response on error messages: ", `p:ignore`, true)
			.addField("Print website status: ", `p:webstatus`, true)
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
		   
            // Then It Edits the message with the ping variable embed that you created
            m.edit(embed)
        });
	}	
	
	if(command === 'webstatus')
	{
		webstatus.webstatuscommand(request,Discord,message);
	}
	

});

module.exports = client;
