module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!message.channel.permissionsFor(Papi.user).has('MANAGE_ROLES_OR_PERMISSIONS')) {
		console.error(`( ${message.guild.name} / ${message.channel.name} ) ${Papi.lang.components.color.colorpermchange}`);
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.roleperm);
		return undefined;
	}
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	Papi.coloringsystem.set(Papi, Discord, message, args);
	return undefined;
};

module.exports.help = { name: 'setcolor' };
