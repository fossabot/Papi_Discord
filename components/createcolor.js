module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!message.channel.permissionsFor(Papi.user).has('MANAGE_ROLES_OR_PERMISSIONS')) {
		console.error(`( ${message.guild.name} / ${message.channel.name} ) ${Papi.lang.components.color.colorpermcreate}`);
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.roleperm);
		return undefined;
	}
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	if (!args[1]) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.cantfindcolor);
	if (args[1].length > 6) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.hexcolor);
	Papi.coloringsystem.create(Papi, Discord, message, args);
	return undefined;
};

module.exports.help = { name: 'createcolor' };
