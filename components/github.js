module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	Papi.messagesystem.titdesc(Papi, Discord, message, 'GitHub', 'https://github.com/Xentinus/Papi_Discord', Papi.emotes.github);
	return undefined;
};

module.exports.help = { name: 'github' };
