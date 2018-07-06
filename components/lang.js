module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (!message.member.hasPermission('ADMINISTRATOR')) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.adminneed);
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	for (let scan = 0; scan < Papi.langs.length; scan++) {
		if (args[0].startsWith(`${Papi.langs[scan]}`)) {
			let lang = args[0];
			Papi.lang = lang;
			return undefined;
		}
	}
	Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.notfoundlang);
	return undefined;
};

module.exports.help = { name: 'lang' };
