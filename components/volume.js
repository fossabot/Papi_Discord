module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let fetched = ops.active.get(message.guild.id);
	if (!fetched) return Papi.messagesystem.onlydesc(Papi, Discord, message, Papi.lang.musicplayer.notplaying);
	if (message.member.voiceChannel !== message.guild.me.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notsamech);

	if (isNaN(args[0]) || args[0] > 200 || args[0] < 0) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.volumenumber);
	fetched.dispatcher.setVolume(args[0] / 100);
	let volumenumber = args[0];
	Papi.volume = volumenumber;

	let icon;
	if (args[0] > 70) {
		icon = Papi.emotes.fullvol;
	} else if ((args[0] <= 70) && (args[0] > 30)) {
		icon = Papi.emotes.halfvol;
	} else if ((args[0] <= 30) && (args[0] > 0)) {
		icon = Papi.emotes.lowvol;
	} else if (args[0] <= 0) {
		icon = Papi.emotes.novol;
	}

	Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.musicplayer.volumeset, `${args[0]} %`, icon);
	return undefined;
};

module.exports.help = { name: 'volume' };
