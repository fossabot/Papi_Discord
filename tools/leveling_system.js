/* eslint-disable no-await-in-loop */
// TODO: Need to edit leveling system

module.exports.levels = async function sendembed(Discord, Papi, message, CalcEXP, rows) {
	let GMID = message.guild.members.get(message.author.id);
	let levels = message.guild.roles.filter(role => role.name.startsWith('Level'));

	// Levels Check
	levelcheck:
	for (let i = Papi.levelinfo.minlevel; i < Object.keys(Papi.levelinfo.levels).length; i++) {
		let rolecheck = message.guild.roles.find(role => role.name === `Level ${i}`);
		if (!rolecheck) {
			console.log(`( ${message.guild.name} ) ${i}. ${Papi.lang.leveling_system.notfound}`);
			await Papi.levelingsystem.creatinglevels(Papi, message);
			break levelcheck;
		}
	}

	// Nincs benne az adatbázisban
	if (rows.length < 1) {
		let rolecheck = await message.guild.roles.find(role => role.name === `Level ${Papi.levelinfo.minlevel}`);
		if (!GMID.roles.has(rolecheck.id)) {
			await GMID.removeRoles(levels);
			await GMID.addRole(rolecheck);
			console.log(`( ${message.guild.name} ) ${message.author.username} ${Papi.lang.leveling_system.isnow} ${Papi.levelinfo.minlevel}. ${Papi.lang.leveling_system.level}.`);
			const lvlup = new Discord.RichEmbed()
				.setTitle(`${Papi.lang.leveling_system.levelup}`)
				.setColor(process.env.COLOR_H)
				.setThumbnail('https://i.imgur.com/pH32Rm5.png')
				.setDescription(`${Papi.lang.leveling_system.younow} ${Papi.levelinfo.minlevel}. ${Papi.lang.leveling_system.level}\n\n**${Papi.lang.leveling_system.avaperm}**\n${Papi.lang.leveling_system.roles[Papi.levelinfo.minlevel]}`)
				.setFooter(GMID.user.username, message.author.displayAvatarURL);
			message.channel.send({ embed: lvlup });
		}
		return;
	}

	// Benne van az adatbázisban
	adatbazisban:
	for (let i = Papi.levelinfo.minlevel; i < Object.keys(Papi.levelinfo.levels).length; i++) {
		if (rows[0].CXP > Papi.levelinfo.levels[i].xpneed && rows[0].CXP < Papi.levelinfo.levels[i + 1].xpneed) {
			let rolecheck = await message.guild.roles.find(role => role.name === `Level ${i}`);
			if (!GMID.roles.has(rolecheck.id)) {
				await GMID.removeRoles(levels);
				await GMID.addRole(rolecheck);
				console.log(`( ${message.guild.name} ) ${message.author.username} ${Papi.lang.leveling_system.isnow} ${i}. ${Papi.lang.leveling_system.level}.`);
				const lvlup = new Discord.RichEmbed()
					.setTitle(`${Papi.lang.leveling_system.levelup}`)
					.setColor(process.env.COLOR_H)
					.setThumbnail('https://i.imgur.com/pH32Rm5.png')
					.setDescription(`${Papi.lang.leveling_system.younow} ${i}. ${Papi.lang.leveling_system.level}\n\n**${Papi.lang.leveling_system.avaperm}**\n${Papi.lang.leveling_system.roles[i]}`)
					.setFooter(GMID.user.username, message.author.displayAvatarURL);
				message.channel.send({ embed: lvlup });
			}
			break adatbazisban;
		}
	}
};

module.exports.calculatingxp = function sendembed(msA, components) {
	let CalcEXP = {};
	let honlapok = ['http://', 'https://', '<http://', '<https://'];

	CalcEXP.CXP = 0; // Current Experience Point
	CalcEXP.EP = 0; // Emote Point
	CalcEXP.LP = 0; // Link Point
	CalcEXP.CP = 0; // Command Point

	CurrentMessage:
	for (let i = 0; i < msA.length; i++) {
		for (let scan = 0; scan < honlapok.length; scan++) {
			if (msA[i].startsWith(honlapok[scan])) {
				CalcEXP.CXP++;
				CalcEXP.LP++;
				break CurrentMessage;
			}
		}
		for (let scan = 0; scan < components.length; scan++) {
			if (msA[i].startsWith(`.${components[scan]}`)) {
				CalcEXP.CXP++;
				CalcEXP.CP++;
				break CurrentMessage;
			}
		}
		if (msA[i].startsWith('<:') && msA[i].endsWith('>')) {
			CalcEXP.CXP++;
			CalcEXP.EP++;
		} else {
			CalcEXP.CXP += msA[i].length;
		}
	}
	return CalcEXP;
};

module.exports.creatinglevels = async function sendembed(Papi, message) {
	// https://finitereality.github.io/permissions-calculator/?v=8
	console.log(`( ${message.guild.name} ) ${Papi.lang.leveling_system.missinglvl}`);

	for (let i = Object.keys(Papi.levelinfo.levels).length; i >= Papi.levelinfo.minlevel; i--) {
		let role = await message.guild.roles.find(rolecreate => rolecreate.name === `Level ${i}`);
		if (!role) {
			try {
				role = await message.guild.createRole({
					name: `Level ${i}`,
					color: `#000000`,
					permissions: Papi.levelinfo.levels[i].permid,
					position: 1,
					mentionable: true,
					hoist: false
				});
				console.log(`( ${message.guild.name} ) ${i}. ${Papi.lang.leveling_system.lvlcreated}`);
			} catch (err) {
				console.error(err.stack);
			}
		}
	}
};
