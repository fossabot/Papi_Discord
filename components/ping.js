module.exports.run = async (Papi, Discord, message, args, szoveg, con, ops) => {
	const embed = new Discord.RichEmbed()
		.setDescription(`${Papi.lang.components.ping.pinginprogress}`)
		.setColor(process.env.COLOR_H)
		.setFooter(message.author.username, message.author.displayAvatarURL);
	const msg = await message.channel.send({ embed });
	embed.setDescription(`**${Papi.lang.components.ping.result}**`);
	await embed.addField(`${Papi.emotes.discordjs} Discord.js API ${Papi.lang.components.ping.response}`, `${Math.round(Papi.ping)} ms`);
	await embed.addField(`${Papi.emotes.papi} ${Papi.user.username} ${Papi.lang.components.ping.response}`, `${msg.createdTimestamp - message.createdTimestamp} ms`);
	msg.edit({ embed });
};

module.exports.help = { name: 'ping' };
