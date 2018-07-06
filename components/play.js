const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports.run = async (Papi, Discord, message, args, szoveg, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!message.member.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.same_ch);

	let validate = await ytdl.validateURL(args[0]);
	if (!validate) {
		let commandFile = require(`../tools/youtube_search.js`);
		return commandFile.run(Papi, Discord, message, args, szoveg, con, ops);
	}
	let info = await ytdl.getInfo(args[0]);

	let data = ops.active.get(message.guild.id) || {};
	if (!data.connection) data.connection = await message.member.voiceChannel.join();
	if (!data.queue) data.queue = [];
	data.guildID = message.guild.id;

	data.queue.push({
		songTitle: info.title,
		requester: message.author.username,
		url: args[0],
		announceChannel: message.channel.id
	});

	if (!data.dispatcher) {
		play(Papi, ops, data, message, Discord);
	} else {
		Papi.messagesystem.musictitdesc(Papi, Discord, message, Papi.lang.musicplayer.addedqueue, info.title);
	}

	ops.active.set(message.guild.id, data);
	return undefined;
};

async function play(Papi, ops, data, message, Discord) {
	Papi.messagesystem.musicfixchtitdesc(Papi, Discord, message, Papi.lang.musicplayer.nowplaying, data.queue[0].songTitle, data.queue[0].announceChannel, Papi.emotes.next);
	Papi.user.setActivity(`${data.queue[0].songTitle}`, { type: 'PLAYING' });
	data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
	data.dispatcher.setVolume(Papi.volume / 100);
	data.dispatcher.guildID = data.guildID;
	data.dispatcher.once('end', function finishit() {
		finish(Papi, ops, this, message, Discord);
	});
}

function finish(Papi, ops, dispatcher, message, Discord) {
	let fetched = ops.active.get(dispatcher.guildID);
	fetched.queue.shift();
	if (fetched.queue.length > 0) {
		ops.active.set(dispatcher.guildID, fetched);
		play(Papi, ops, fetched, message, Discord);
	} else {
		ops.active.delete(dispatcher.guildID);
		let vc = Papi.guilds.get(dispatcher.guildID).me.voiceChannel;
		Papi.user.setActivity(undefined);
		if (vc) vc.leave();
	}
}

module.exports.help = { name: 'play' };
