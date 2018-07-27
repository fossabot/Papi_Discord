module.exports.run = (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!message.member.hasPermission('ADMINISTRATOR')) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.adminneed);
	if (!message.channel.permissionsFor(Papi.user).has('MANAGE_MESSAGES')) {
		console.error(`( ${message.guild.name} / ${message.channel.name} ) ${Papi.lang.components.purge.msperm}`);
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.roleperm);
		return undefined;
	}
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	if (isNaN(args[0]) || args[0] > 100) {
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.wrongfilter);
		return undefined;
	}
	let messagecount = parseInt(args[0]);
	message.channel.fetchMessages({ limit: 100 })
		.then(messages => {
			let msgarray = messages.array();
			msgarray.length = messagecount + 1;
			msgarray.map(msg => msg.delete().catch(console.error));
		});
	return undefined;
};

module.exports.help = { name: 'purge' };
