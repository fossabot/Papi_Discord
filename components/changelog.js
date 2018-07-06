module.exports.run = async (Papi, Discord, message, args, szoveg, con, ops) => {
	if (!message.member.hasPermission('ADMINISTRATOR')) return undefined;
	message.delete();

	let UpdateDay = '06/07/2018';
	let version = '1.2.0';

	let changelogmain = new Discord.RichEmbed()
		.setTitle(`${Papi.lang.components.changelog.title}`)
		.setColor(process.env.COLOR_H)
		.setThumbnail('https://i.imgur.com/VQTqZSc.png')
		.setFooter(`${Papi.lang.components.changelog.version}: ${version}  |  ${UpdateDay}`)
		.setDescription(`**${Papi.lang.components.changelog.systemchange}**`);

	let numsys = 0;
	for (let systems in Papi.changelogsystems) {
		changelogmain.addField(`${Papi.changelogsystems[systems].name}`, `${Papi.changelogsystems[systems].desc}`);
		numsys += 1;
	}
	if (numsys > 0) {
		await message.channel.send({ embed: changelogmain });
	}

	let changelogcommands = new Discord.RichEmbed()
		.setTitle(`${Papi.lang.components.changelog.title}`)
		.setColor(process.env.COLOR_H)
		.setThumbnail('https://i.imgur.com/VQTqZSc.png')
		.setFooter(`${Papi.lang.components.changelog.version}: ${version}  |  ${UpdateDay}`)
		.setDescription(`**${Papi.lang.components.changelog.cmdchange}**`);

	let numcmd = 0;
	for (let comamnds in Papi.changelogcommands) {
		changelogcommands.addField(`${Papi.changelogcommands[comamnds].name}`, `${Papi.changelogcommands[comamnds].desc}`);
		numcmd += 1;
	}
	if (numcmd > 0) {
		message.channel.send({ embed: changelogcommands });
	}
	return undefined;
};

module.exports.help = { name: 'changelog' };
