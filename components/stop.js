module.exports.run = async (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let fetched = ops.active.get(message.guild.id);
	if (!fetched) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notplaying);
	if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notsamech);

	await message.guild.me.voiceChannel.leave();
	return undefined;
};

module.exports.help = { name: 'stop' };
