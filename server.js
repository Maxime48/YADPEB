require("dotenv").config();
const {
    BASE_URL,
	PORT,
	SSL_PRIVKEYPEM,
	SSL_CERTPEM,
	STEP,
    DISCORD_LOGS_CHANNEL,
    PAYPAL_USERNAME,
    PAYPAL_PASSWORD,
    PAYPAL_SIGNATURE,
    PAYPAL_MODE
} = process.env;

const path = require("path");
const morgan = require("morgan");
const https = require('https');
const fs = require('fs');
const express = require("express");
const app = express();

const Discord = require("discord.js");
const client = require("./discord");
const db = require("quick.db");
client.db = db;

const Paypal = require("paypal-express-checkout");
const paypal = Paypal.init(
    PAYPAL_USERNAME,
    PAYPAL_PASSWORD,
    PAYPAL_SIGNATURE,
    `${BASE_URL}/check/`,
    `${BASE_URL}/check/`,
    PAYPAL_MODE === "SANDBOX"
);

const language =[
"Merci, ",
"Nous avons bien reçu votre paiement, merci de votre confiance !",
"Vous avez déjà effectué ce paiment!",
"Quelque chose s'est mal passé, veuillez réessayer!",
"Bonjour, ",
`Merci,`,
"Nous avons bien reçu votre paiement, nous vous remercions pour votre confiance !"
];

const paypalTokens = [];

app.use(morgan("dev"))
.set("views", path.join(__dirname, "views"))
.set("view engine", "pug")
.use(express.static(path.join(__dirname, "public")))
.use((req, _, next) => {
    req.client = client;
    next();
});

const fetchPayment = require("./middlewares/fetchPayment");

app.get("/payment/:memberID/:paymentID", fetchPayment, (req, res) => {
    if(req.query.success){
        return res.render("payment-infos", {
            username: req.payment.username,
            avatarURL: req.payment.avatarURL,
            msg: language[0],
            text: language[1]
        });
    }
    if(req.query.error){
        const errors = {
            "already_paid": language[2],
            "unknown": language[3]
        };
        return res.render("payment-infos", {
            username: req.payment.username,
            avatarURL: req.payment.avatarURL,
            msg: language[4],
            text: errors[req.query.error] || errors.unknown
        });
    }
    // Redirection faire la page de paiement
    res.render("payment-pay", {
        username: req.payment.username,
        avatarURL: req.payment.avatarURL,
        name: req.payment.name,
        URL: `${BASE_URL}/pay/${req.params.memberID}/${req.params.paymentID}`
    });
});

app.get("/pay/:memberID/:paymentID", fetchPayment, (req, res) => {
    const paramArray = [
        req.payment.id,
        req.payment.price,
        req.payment.name,
        req.payment.userID
    ];
    paypal.pay(paramArray[0], paramArray[1], paramArray[2], "EUR", false, paramArray, (err, url) => {
        if(err) console.log(err);
        const token = url.split("&token=")[1];
        paypalTokens[token] = req.payment;
        // Redirection vers Paypal
        res.redirect(url);
    });
});

app.get("/check", (req, res) => {

    if(!req.query.token){
        return res.render("error");
    }
    if(!req.query.PayerID && req.query.token){
        const payment = paypalTokens[req.query.token];
        if(!payment) return res.render("error");
        paypalTokens[req.query.token] = null;
        return res.redirect(`${BASE_URL}/payment/${payment.userID}/${payment.id}?retry=true`);
    }

    // Récupération des informations à propos du paiement
    paypal.detail(req.query.token, req.query.PayerID, async (err, data, invoiceNumber, price, paramArray) => {
        if(err) return res.render("error");
        if(!data.success) return res.render(`/payment/${paramArray[3]}/${paramArray[0]}?error=unknown`);
        paramArray = paramArray.slice(3, 7);
        const user = await client.users.fetch(paramArray[3]);
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${language[5]} ${user.username}`, user.displayAvatarURL())
            .setDescription(language[6])
            .setColor("#0091fc");
        user.send(embed);

        const rawIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const ip = rawIP.split("").filter((c) => !isNaN(c) || c === ".").join("");
      
        const logsEmbed = new Discord.MessageEmbed()
            .setAuthor(`Payment from ${user.tag}`, user.displayAvatarURL())
            .addField("ID de facture", paramArray[0], true)
            .addField("Country", data.COUNTRYCODE, true)
            .addField("IP", ip, true)
            .addField("Name", data.FIRSTNAME, true)
            .addField("Family name", data.LASTNAME, true)
            .addField("Email", data.EMAIL, true)
            .addField("Price", `${data.PAYMENTINFO_0_AMT}€`, true)
            .addField("Tax", `${data.PAYMENTINFO_0_FEEAMT}€`, true)
            .addField("Reçu", `${data.PAYMENTINFO_0_AMT-data.PAYMENTINFO_0_FEEAMT}€`, true)
            .setColor("#0091fc");
        
        client.channels.cache.get(DISCORD_LOGS_CHANNEL).send(logsEmbed);

        const memberPayments = client.db.get(paramArray[3]);
        const newPayment = memberPayments.find((p) => p.id === paramArray[0]);
        newPayment.paid = Date.now();
        const withoutPayment = memberPayments.filter((p) => p.id !== paramArray[0]);
        client.db.set(paramArray[3], [
            ...withoutPayment,
            ...[ newPayment ]
        ]);

        res.redirect(`/payment/${user.id}/${paramArray[0]}?success=true`);

    });

});

app.get("*", (req, res) => {
  return res.status(404).render("404");
});

/* const listener = app.listen(PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
}); */

if(STEP === "install")
{
	const listener = app.listen(PORT, () => {
		console.log("Install mode | Your app is listening on port " + listener.address().port);
	}); 	
} else if(STEP === "live"){
	const listener = https.createServer({
		key: fs.readFileSync(SSL_PRIVKEYPEM),
		cert: fs.readFileSync(SSL_CERTPEM),
	}, app)
	.listen(PORT);
	console.log("Live | Your app is listening on port " + listener.address().port);
} else {
	console.log("Bad input detected");
}

