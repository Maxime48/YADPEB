function help(Discord,message)
{
	const embedhelp = new Discord.MessageEmbed()
	.setAuthor(`Hello, ${message.member.user.tag}`, message.member.user.displayAvatarURL())
	.setDescription("p:giveaway command usage:")
	.addField("Argument 1 (necessary):", `TYPE ("mod" or "community")`, true)
	.addField("Argument 2 (necessary):", "TIME", true)
	.addField("Argument 3 (necessary):", "WINNERS_NUMBER", true)
	.addField("Argument 4 (necessary):", "Giveaway_name (Can include space)", true)
	.setColor("#22069c")
	.setFooter("This is not something anyone should use for now");
		
	message.channel.send(embedhelp);	
}


function create(Discord,message,args,client,GIVEWAY_CHANNEL,GIVEWAY_CHANNEL_COMMUNITY,ms)
{
	if(args[0] === "mod")
	{
		const modc = client.channels.cache.get(GIVEWAY_CHANNEL);		
		client.giveawaysManager.start(modc, {
			time: ms(args[1]),
            prize: args.slice(3).join(" "),
            winnerCount: parseInt(args[2]),
		messages: {
			giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
			giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
			timeRemaining: "Time remaining: **{duration}**!",
			inviteToParticipate: "React with 🎉 to participate!",
			winMessage: "Congratulations, {winners}! You won **{prize}**!",
			embedFooter: "Giveaways",
			noWinner: "Giveaway cancelled, no valid participations.",
			hostedBy: "Hosted by: {user}",
			winners: "winner(s)",
			endedAt: "Ended at",
			units: {
				seconds: "seconds",
				minutes: "minutes",
				hours: "hours",
				days: "days",
				pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
			}
		}
		}).catch((err) => {
			console.log('errored');
		});
	}
	else
	{
		const comc = client.channels.cache.get(GIVEWAY_CHANNEL_COMMUNITY);
		client.giveawaysManager.start(comc, {
			time: ms(args[1]),
            prize: args.slice(3).join(" "),
            winnerCount: parseInt(args[2]),
		messages: {
			giveaway: "🎉🎉 **GIVEAWAY** 🎉🎉",
			giveawayEnded: "🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
			timeRemaining: "Time remaining: **{duration}**!",
			inviteToParticipate: "React with 🎉 to participate!",
			winMessage: "Congratulations, {winners}! You won **{prize}**!",
			embedFooter: "Giveaways",
			noWinner: "Giveaway cancelled, no valid participations.",
			hostedBy: "Hosted by: {user}",
			winners: "winner(s)",
			endedAt: "Ended at",
			units: {
				seconds: "seconds",
				minutes: "minutes",
				hours: "hours",
				days: "days",
				pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
			}
		}
		}).catch((err) => {
			console.log('errored');
		});;
	}
}

module.exports = {
	help: help,
	create: create
}
