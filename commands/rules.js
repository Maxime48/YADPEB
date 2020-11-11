function rules(request,Discord,message,args){

		var rules = [
		'Ad = BAN', //1
		'Insult, racism and diffamation = BAN.', //2
		'Do not provide any pirated software = BAN', //3
		'No Spamming = WARN', //4
		'No Excessive Emojis = WARN', //5
		'No links to other discord servers = WARN', //6
		'Excessive mentions are not tolerated', //7
		'Unless asked by us do not apply to admins or sys-admins positions', //8
		"I'm allergic to choosingbeggars and easily ban them (also -> r/choosingbeggars) ", //9
		'Not everything is free in life, stop begging for free servers or you will get sanctioned', //10
		'Do not advertise your server/services in private messages (unless authorized)', //11
		"The forum was recently wiped, it's not a reason to abuse it", //12
		"Founders reserves themselves the right to bypass a rule", //13
		"Do not abuse the 'trusted' role", //14
		"All our 'own' source code is available, but not for free", //15
		];
		
		if (args[0] === 'help')
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("p:rule command usage:")
			.addField("Argument 1 (necessary):", `Rule number (1 to ${rules.length})`, true)
			.addField("Argument 2 (trusted only):", "user-id (pings the user)", true)
			.setColor("#22069c")
			.setFooter("Please note that this command can evolve");
			
			message.channel.send(embedhelp);
		}
		else if( (args[0] === 'list') && ( message.member.roles.cache.find(role => role.name === 'paypalmod') || message.member.roles.cache.find(role => role.name === 'trusted') ) )
		{
			var count = 1;
			
			const embedrulelist = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("List of rules:")
			.setColor("#22069c")
			.setFooter("Please note that these rules can evolve.");
			
			rules.forEach(element => {
				embedrulelist.addField(`Rule ${count}:`, `${element}`);
				count += 1;
			});
			
			message.channel.send(embedrulelist);
			count = 0;
		}
		else
		{ 
	
		const rulenumber = args[0] - 1; // table starts at 0
		
		const userid = args[1];
		
		
		if ((rulenumber != null) && (rulenumber <= rules.length) && (rulenumber >= 0))
		{	
			if (userid != null)
			{
				if(message.member.roles.cache.find(role => role.name === 'paypalmod') || message.member.roles.cache.find(role => role.name === 'trusted'))
				{
					message.channel.send(`<@${userid}>, please read this:`)
					
					const embedtag = new Discord.MessageEmbed()
					.setAuthor(`Hello, you were tagged by: @${message.member.user.tag}`, message.member.user.displayAvatarURL())
					.setDescription("You did not respect that rule:")
					.addField(`Rule ${rulenumber + 1}: `, `${rules[rulenumber]}`, true)
					.addField(`Tagger id: `, message.member.id)
					.setColor("#42f55d")
					.setFooter("Please note that this can be a warning");	
					
					message.channel.send(embedtag);
				}
				else
				{
					const embedinsmodperm = new Discord.MessageEmbed()
					.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
					.setDescription("Log:")
					.addField("Error:", "you must be trusted.", true)
					.addField("Try this instead:", `p:rule ${rulenumber + 1}`, true)
					.addField("You are trying to:", `ping a user with the id ${userid} `)
					.setColor("#22069c");	
				
					message.channel.send(embedinsmodperm);
				}
					
			}
			else
			{
					const embedtag = new Discord.MessageEmbed()
					.setAuthor(`Hello, rule requested by: @${message.member.user.tag}`, message.member.user.displayAvatarURL())
					.setDescription("Someone did not respect that rule:")
					.addField(`Rule ${rulenumber + 1}: `, `${rules[rulenumber]}`, true)
					.setColor("#42f55d")
					.setFooter("Please note that this can be a warning");	
					
					message.channel.send(embedtag);
			}
		}
		else
		{
			message.channel.send(`<@${message.member.id}>, please read this:`)
			
			const embedinvalid = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Log:")
			.addField("Error:", "invalid command.", true)
			.addField("Try this instead:", `p:rule rule_number`, true)
			.addField("You are trying to:", `Execute p:rule command`)
			.addField("Help:", `p:rule help`)
			.setColor("#22069c");	
				
			message.channel.send(embedinvalid);			
		}
		
		}
		
		message.delete();
	
}

module.exports = {
	rules: rules
}
