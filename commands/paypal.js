function command(Discord,client,message,args,BASE_URL){
        // Récupération des informations sur la facture
        const member = message.mentions.members.first();
        if(!member) return message.reply("vous devez mentionner un membre à qui envoyer une facture!");
        const sentPrice = args[1];
        if(!sentPrice) return message.reply("vous devez indiquer un montant!");
        const price = sentPrice.endsWith("€") ? parseFloat(sentPrice.split("€")[0]) : parseFloat(sentPrice);
        if(!price) return message.reply("vous devez indiquer un montant **valide**!");
        const name = args.slice(2).join(" ");
        if(!name) return message.reply("vous devez indiquer un nom de facture!");
        const user = client.db.get(member.id);
        if(!user) client.db.set(member.id, []);

        // Génération de la facture
        const paymentID = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
        const paymentData = {
            id: paymentID,
            userID: member.id,
            username: member.user.username,
            avatarURL: member.user.displayAvatarURL(),
            paid: false,
            price,
            name
        };
        // Sauvegarde de la facture
        client.db.push(member.id, paymentData);

        // Envoi de la facture
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Hello, ${member.user.tag}`, member.user.displayAvatarURL())
        .setDescription("Here is your invoice:")
        .addField("Name", paymentData.name, true)
        .addField("Price", `${paymentData.price}€`, true)
        .addField("Paiement", `[Make the payment](${BASE_URL}/payment/${member.id}/${paymentData.id})`)
        .setColor("#0091fc")
        .setFooter("Once the payment is completed you will receive a confirmation");

        member.user.send(embed);

        message.reply(`invoice sended to ${member.toString()}!`);
}
 
module.exports = {
	command: command	
}