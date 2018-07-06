module.exports.run = async (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	let fetched = ops.active.get(message.guild.id);
	if (!fetched) return Papi.messagesystem.onlydesc(Papi, Discord, message, Papi.lang.musicplayer.notplaying);
	if (message.member.voiceChannel !== message.guild.me.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.notsamech);
	let userCount = message.member.voiceChannel.members.size;
	let required = Math.ceil(userCount / 2);
	if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];
	if (fetched.queue[0].voteSkips.includes(message.member.id)) return Papi.messagesystem.musictitdescvote(Papi, Discord, message, Papi.lang.musicplayer.already_voted, fetched.queue[0].voteSkips.length, required);
	await fetched.queue[0].voteSkips.push(message.member.id);
	ops.active.set(message.guild.id, fetched);
	if (fetched.queue[0].voteSkips.length >= required) {
		await fetched.dispatcher.end();
		return undefined;
	}
	Papi.messagesystem.musictitdescvote(Papi, Discord, message, Papi.lang.musicplayer.vote_skip, fetched.queue[0].voteSkips.length, required, Papi.emotes.complete);
	return undefined;
};

module.exports.help = { name: 'skip' };
