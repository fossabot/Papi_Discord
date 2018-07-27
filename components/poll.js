module.exports.run = async (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	message.delete();
	let titdesc = new Discord.RichEmbed()
		.setTitle(`${Papi.icons.search} ${Papi.lang.components.polltitle}`)
		.setDescription(`${args.join(' ')}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	let msg = await message.channel.send({ embed: titdesc });
	await msg.react('464742594019328000');
	msg.react('464507221246607382');
	return undefined;
};

module.exports.help = { name: 'poll' };
