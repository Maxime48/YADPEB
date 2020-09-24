function auto(request,Discord,message){
		function includesRealy(msg,str){
  			return(
   		 	 msg.content.includes(str) ||
   		 	 msg.content.includes(str.toUpperCase()) ||
  		  	 msg.content.includes(str.toLowerCase())
 		 	)
		}
 
  		if(
    		includesRealy(message,'not enough space') ||
    		includesRealy(message,'short disk space') ||
    		includesRealy(message,'Not enough disk space!')
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "You don't have enough disk space to boot the server", true)
			.addField("Solution", `Upgrade your offer or contact an admin`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}  		

		if(
    		includesRealy(message,'panel still has 502') ||
    		includesRealy(message,'panel has 502') ||
    		includesRealy(message,'502 Bad Gateway') ||
    		includesRealy(message,'502 error') ||
    		includesRealy(message,'500 error') ||
    		includesRealy(message,'error 502') ||
    		includesRealy(message,'error 500') ||
    		includesRealy(message,'502 error') ||
    		includesRealy(message,'http 502') ||
    		includesRealy(message,'Whoops, something went wrong on our servers.') ||
    		includesRealy(message,'https 502')
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "The web-server failed to serve you this page", true)
			.addField("What we know:", "Happens mostly when php crashes, needs human intervention", )
			.addField("Solution", `Contact an admin`, true)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}		

		if(
    		includesRealy(message,'panel still has 404') ||
    		includesRealy(message,'panel has 404') ||
    		includesRealy(message,'404 not found') ||
    		includesRealy(message,'404 error') ||
    		includesRealy(message,'error 404') ||
    		includesRealy(message,'Opps! This page Could Not Be Found!') ||
    		includesRealy(message,'Sorry but the page you are looking for does not exist, have been removed or name changed') ||
    		includesRealy(message,'http 404') ||
    		includesRealy(message,'We were unable to locate the requested resource on the server.') ||
    		includesRealy(message,'https 404')
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "This page does not exists", true)
			.addField("What we know:", "Happens when a page url changes or when a page gets delted", )
			.addField("Solution", `Use the newest url or notify the admin`, true)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}	
		
		if(
    		includesRealy(message,"[Alama's Panel Daemon] A fatal error was encountered while starting this server.") ||
    		includesRealy(message,"[Alama's Panel Daemon] A fatal error was encountered booting this container.") ||
    		includesRealy(message,'A fatal error was encountered while starting this server') ||
    		includesRealy(message,'A fatal error was encountered booting this container')
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "The server can't start, check the disk space available and your startup parameters", true)
			.addField("Solution", `Not enough space: delete some files | Check if the file you are booting exists`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}		

		if(
    		includesRealy(message,"[Alama's Panel Daemon] Exit Code:") ||
    		includesRealy(message,"---------- Detected server process in a crashed state! ----------") 
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "The server crashed, it will try to reboot automatically", true)
			.addField("Solution", `Verify your startup parameters | Check if nothing is corrupted`)
			.addField("Exit code 1:", `Happens mostly when the startup file does not exist`)
			.addField("Exit code 139:", `Happens when the panel can't connect to the daemon -> Contact an admin if persisting`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}			

		if(
    		includesRealy(message,"decompression of file exited with code") 
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "The archive failed to decompress.", true)
			.addField("Solution", `Verify the file's integrity and retry`)
			.addField("code 2:", `Happens mostly when the file is corrupted`)
			.addField("code 9:", `Needs human intervention if persisting`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}		

		if(
    		includesRealy(message,"Couldn't search! Please try again later...") ||
			includesRealy(message,"Couldn't search!")
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Error details:")
			.addField("Description:", "Can't find any results or crashed.", true)
			.addField("What we know:", "Happens on minecraft servers when there is no plugins found in the plugin manager", )
			.addField("Solution", `Refresh to see if the panel is still online or try searching something else`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}			

		if(
    		includesRealy(message,"Your server has had some resource limits modified, you may need to restart to apply them") ||
    		includesRealy(message,"Your server has had some resource limits modified") ||
			includesRealy(message,"you may need to restart to apply them")
  		)
		{
			const embedhelp = new Discord.MessageEmbed()
			.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
			.setDescription("Info details:")
			.addField("Description:", "Server limitations changed.", true)
			.addField("Solution", `Restart your server to apply the new limitations`)
			.setColor("#22069c")	
			.setFooter('To block auto responses use p:ignore');
				
			message.channel.send(embedhelp);	
			
  		}		
}

module.exports = {
 auto: auto	
}