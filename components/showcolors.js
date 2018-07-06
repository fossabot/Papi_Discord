module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	Papi.coloringsystem.show(Papi, Discord, message);
	return undefined;
};

module.exports.help = { name: 'showcolors' };
