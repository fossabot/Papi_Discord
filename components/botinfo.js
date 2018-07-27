const pjson = require(`../package.json`);

module.exports.run = async (Papi, Discord, message, args, fulltext, con, ops) => {
	const ping = new Discord.RichEmbed()
		.setDescription(`${Papi.lang.components.ping.pinginprogress}`)
		.setColor(process.env.COLOR_H)
		.setFooter(message.author.username, message.author.displayAvatarURL);
	const msg = await message.channel.send({ embed: ping });
	const papispeed = msg.createdTimestamp - message.createdTimestamp;
	msg.delete();
	let botinfo = new Discord.RichEmbed()
		.addField(`${Papi.lang.components.botinfo.systeminfo}`, `${Papi.lang.components.botinfo.cpuusage}: **${(process.cpuUsage().user / 1000000).toFixed(2)}** %\n${Papi.lang.components.botinfo.memusage}: **${(process.memoryUsage().rss / 1000000).toFixed(2)}** MB\n${Papi.lang.components.botinfo.platform}: **${process.platform}**\n${Papi.lang.components.botinfo.arch}:  **${process.arch}**\n${Papi.lang.components.botinfo.uptime}: **${Papi.replacesystem.time(Papi, process.uptime().toFixed(0))}**\n${Papi.lang.components.botinfo.network}: **${papispeed}** ms [ API: **${Math.round(Papi.ping)}** ms ]`)
		.addField(`${Papi.lang.components.botinfo.discordinfo}`, `${Papi.lang.components.botinfo.servers}:  **${Papi.guilds.size}**\n${Papi.lang.components.botinfo.channels}:  **${Papi.channels.size}**\n${Papi.lang.components.botinfo.users}:  **${Papi.users.size}**\n${Papi.lang.components.botinfo.icons}:  **${Object.keys(Papi.icons).length}**`)
		.addField(`${Papi.lang.components.botinfo.developer}`, `**Xentinus**\nhttps://github.com/Xentinus`)
		.addField(`${Papi.lang.components.botinfo.repository}`, `**Papi-Discord**\n${Papi.lang.components.botinfo.version}: **${pjson.version}**\nhttps://github.com/Xentinus/Papi_Discord`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setThumbnail(`https://i.imgur.com/7lBUMSr.png`) // Papi Profile Picture
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: botinfo });
	return undefined;
};

module.exports.help = { name: 'botinfo' };
