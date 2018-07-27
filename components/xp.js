module.exports.run = (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let target = message.mentions.users.first() || message.author;
	if (target.username === Papi.user.username) target = message.author;
	con.query(`SELECT * FROM \`${message.guild.id}\` WHERE id = ${target.id}`, (err, rows) => {
		if (err) throw err;
		if (!rows[0]) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.xp_cantfind);
		let UserXP = new Discord.RichEmbed()
			.setColor(process.env.COLOR_H)
			.setDescription(`${message.guild.name} ${Papi.lang.components.xp.serverresult}`)
			.setAuthor(`${target.username} ${Papi.lang.components.xp.userinfo}`, target.displayAvatarURL)
			.setFooter(message.author.username, message.author.displayAvatarURL)
			.addField(`${Papi.lang.components.xp.tppoint}`, `\`\`\`cs\n${Papi.lang.components.xp.newsystem} ${rows[0].CXP} XP\n${Papi.lang.components.xp.oldsystem} ${rows[0].MSLXP} XP\`\`\``)
			.addField(`${Papi.lang.components.xp.msamount}`, `\`\`\`cs\n${rows[0].MS} ${Papi.lang.components.xp.piece}\`\`\``)
			.addField(`${Papi.lang.components.xp.cmdamount}`, `\`\`\`cs\n${rows[0].CP} ${Papi.lang.components.xp.piece}\`\`\``, true)
			.addField(`${Papi.lang.components.xp.emotesamount}`, `\`\`\`cs\n${rows[0].EP} ${Papi.lang.components.xp.piece}\`\`\``, true)
			.addField(`${Papi.lang.components.xp.linksamount}`, `\`\`\`cs\n${rows[0].LP} ${Papi.lang.components.xp.piece}\`\`\``, true);
		message.channel.send({ embed: UserXP });
		return undefined;
	});
	return undefined;
};

module.exports.help = { name: 'xp' };
