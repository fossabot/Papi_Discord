module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let fetched = ops.active.get(message.guild.id);
	if (!fetched) return Papi.messagesystem.onlydesc(Papi, Discord, message, Papi.lang.musicplayer.notplaying);
	if (message.member.voiceChannel !== message.guild.me.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notsamech);
	if (fetched.dispatcher.paused) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.already_paused);
	fetched.dispatcher.pause();
	Papi.user.setActivity(undefined);
	Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.musicplayer.suc_pause, fetched.queue[0].songTitle, Papi.emotes.pause);
	return undefined;
};

module.exports.help = { name: 'pause' };
