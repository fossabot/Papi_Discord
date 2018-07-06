module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let fetched = ops.active.get(message.guild.id);
	if (!fetched) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notplaying);
	if (message.member.voiceChannel !== message.guild.me.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notsamech);
	if (!fetched.dispatcher.paused) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notpaused);
	fetched.dispatcher.resume();
	Papi.user.setActivity(fetched.queue[0].songTitle);
	Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.musicplayer.sec_resumed, fetched.queue[0].songTitle, Papi.emotes.play);
	return undefined;
};

module.exports.help = { name: 'resume' };
