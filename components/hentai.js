const booru = require('booru');
const sites = ['e621.net', 'konachan.com', 'yande.re', 'lolibooru.moe'];

module.exports.run = async (Papi, Discord, message, args, szoveg, con, ops) => {
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	const generalas = new Discord.RichEmbed()
		.setDescription(`${Papi.lang.components.pic_create}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	let msg = await message.channel.send({ embed: generalas });
	let source = sites[Math.floor(Math.random() * sites.length)];
	booru.search(`${source}`, [`${szoveg}`], { limit: 1, random: true }).then(booru.commonfy).then(async images => {
		if (source === 'lolibooru.moe') {
			let newfileurl = await images[0].common.file_url.replace(/ /g, '%20');
			const HentaiIMG = new Discord.RichEmbed()
				.setColor(process.env.COLOR_H)
				.setFooter(`${message.author.username} | Filter: ${szoveg}`, message.author.displayAvatarURL)
				.setImage(newfileurl);
			msg.delete();
			message.channel.send({ embed: HentaiIMG });
		} else {
			const HentaiIMG = new Discord.RichEmbed()
				.setColor(process.env.COLOR_H)
				.setFooter(`${message.author.username} | Filter: ${szoveg}`, message.author.displayAvatarURL)
				.setImage(images[0].common.file_url);
			msg.delete();
			message.channel.send({ embed: HentaiIMG });
		}
	})
		.catch(err => {
			if (err.name === 'BooruError') {
				console.log(err.message);
				msg.delete();
				Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.zeroimg);
			} else {
				console.log(err);
				msg.delete();
				Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.apierr);
			}
		});
	return undefined;
};

module.exports.help = { name: 'hentai' };
