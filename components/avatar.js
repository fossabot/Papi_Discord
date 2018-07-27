module.exports.run = async (Papi, Discord, message, args, fulltext, con, ops) => {
	const generalas = new Discord.RichEmbed()
		.setDescription(`${Papi.icons.download} ${Papi.lang.components.pic_create}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	let msg = await message.channel.send({ embed: generalas });
	let target = message.mentions.users.first() || message.author;
	if (target.username === Papi.user.username) target = message.author;
	if (!target.displayAvatarURL) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.noavatar);
	const avatar = new Discord.RichEmbed()
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setImage(target.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	msg.delete();
	message.channel.send({ embed: avatar });
	return undefined;
};

module.exports.help = { name: 'avatar' };
