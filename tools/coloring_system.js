module.exports.show = function showcolor(Papi, Discord, message) {
	let colors = message.guild.roles.filter(role => role.name.startsWith('#'));
	if (colors.size < 1) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.zerocolor);
	Papi.messagesystem.colortitarray(Papi, Discord, message, Papi.lang.messages.colortitle_av, colors.array().join('  '));
	return false;
};

module.exports.set = async function setcolor(Papi, Discord, message, args) {
	let colors = message.guild.roles.filter(role => role.name.startsWith('#'));
	if (colors.size < 1) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.zerocolor);
	let str = args.join(' ');
	let rolecheck = colors.find(role => role.name.slice(1).toLowerCase() === str.toLowerCase());
	if (!rolecheck) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.zerorule);
	try {
		await message.member.removeRoles(colors);
		await message.member.addRole(rolecheck);
		Papi.messagesystem.colormessage(Papi, Discord, message, Papi.lang.messages.colortitle_succ, Papi.lang.messages.changecolor, rolecheck, Papi.emotes.complete);
	} catch (err) {
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.cantchangecolor);
		console.log(err.message);
	}
	return undefined;
};

module.exports.create = async function createcolor(Papi, Discord, message, args) {
	let role = await message.guild.roles.find(rolee => rolee.name === `#${args[0]}`);
	if (!role) {
		try {
			role = await message.guild.createRole({
				name: `#${args[0]}`,
				color: `#${args[1]}`,
				permission: []
			});
			console.log(`( ${message.guild.name} ) [#${args[0]}] ${Papi.lang.messages.color_av}`);
			Papi.messagesystem.colormessage(Papi, Discord, message, Papi.lang.messages.colortitle_create, Papi.lang.messages.colorcreate, role, Papi.emotes.add);
		} catch (err) {
			console.error(err.stack);
		}
	} else {
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.colorexist);
	}
	return undefined;
};
