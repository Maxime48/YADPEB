var status = ''; 
var status_previous = '';

function init(request,Discord,client){
	
	//website status
	var online = 0;
	var online_limit = 6;
	var online_reset = 0
	var online_reset_limit = 6;
	var more = '';
	
	setInterval(() => {
		request('https://panel.alama.eu/', function (error, response, body) {
			if(!error && response.statusCode == 200){
				if(online => online_limit)
				{
					online_reset = online_reset +1;
				}
				if(online_reset => online_reset_limit)
				{
					online = 0;
					status = 'online';
				}
			}
			else
			{
				online = online +1;
				if (online => online_limit)
				{
					status = 'offline';
					more = response.statusCode;
				}
			}
		})
			if(status != status_previous)
			{
				status_previous = status;
				
				if(status === 'online')
				{
					const embedstatus = new Discord.MessageEmbed()
					.setAuthor(`Hello everyone:`)
					.setDescription("Website status report:")
					.addField("Status:", `${status}`, true)
					.addField("Description:", "The website should be operational", true)
					.setColor("#42f563")	
					.setFooter('This might not be definitive');
					
					client.channels.cache.get('716019325806444568').send(embedstatus);
				}
				else if (status === 'offline')
				{
					const embedstatus = new Discord.MessageEmbed()
					.setAuthor(`Hello everyone:`)
					.setDescription("Website status report:")
					.addField("Status:", `${status}`, true)
					.addField("Description:", "The website went down", true)
					.addField("Code:", `${more}`, true)
					.addField("Solution:", `Copy paste the error in a channel and ping a moderator`, true)
					.setColor("#c9263c")	
					.setFooter('This might not be definitive');	
					
					client.channels.cache.get('716019325806444568').send(embedstatus);
				}
				
			}
    }, 10000);	
	
}

function command(request,Discord,message){
				if(status === 'online')
				{
					const webstatus = new Discord.MessageEmbed()
					.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
					.setDescription("Website status report:")
					.addField("Status:", `${status}`, true)
					.addField("Description:", "The website should be operational", true)
					.setColor("#42f563")	
					.setFooter('This might not be definitive');
					
					message.channel.send(webstatus);
					
					message.delete(); 
				}
				else if (status === 'offline')
				{
					const webstatus = new Discord.MessageEmbed()
					.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
					.setDescription("Website status report:")
					.addField("Status:", `${status}`, true)
					.addField("Description:", "The website went down", true)
					.addField("Code:", `${more}`, true)
					.addField("Solution:", `Copy paste the error in a channel and ping a moderator`, true)
					.setColor("#c9263c")	
					.setFooter('This might not be definitive');	
					
					message.channel.send(webstatus);
					
					message.delete(); 
				}
}

module.exports = {
	init: init,
	webstatuscommand: command
};