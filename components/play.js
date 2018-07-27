const ytdl = require('ytdl-core');
const search = require('yt-search');

module.exports.run = async (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	if (!message.member.voiceChannel) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.same_ch);

	let validate = await ytdl.validateURL(args[0]);
	if (!validate) {
		let commandFile = require(`../tools/youtube_search.js`);
		return commandFile.run(Papi, Discord, message, args, fulltext, con, ops);
	}
	let info = await ytdl.getInfo(args[0]);

	let data = ops.active.get(message.guild.id) || {};
	if (!data.connection) data.connection = await message.member.voiceChannel.join();
	if (!data.queue) data.queue = [];
	data.guildID = message.guild.id;

	data.queue.push({
		songTitle: info.title,
		requester: message.author.username,
		view: Papi.replacesystem.numberformatUS(info.view_count),
		thumbnail: info.thumbnail_url,
		length: Papi.replacesystem.time(Papi, info.length_seconds),
		url: info.video_url,
		uploaded: info.published,
		uploaderName: info.author.name,
		uploaderURL: info.author.channel_url,
		announceChannel: message.channel.id
	});

	if (!data.dispatcher) {
		play(Papi, ops, data, message, Discord);
	} else {
		Papi.messagesystem.musicaddqueue(Papi, Discord, message, Papi.lang.musicplayer.addedqueue, info.title, info.video_url, info.thumbnail_url, Papi.replacesystem.time(Papi, info.length_seconds), data.queue.length);
	}

	ops.active.set(message.guild.id, data);
	return undefined;
};

async function play(Papi, ops, data, message, Discord) {
	data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
	data.dispatcher.setVolume(Papi.volume / 100);
	data.dispatcher.guildID = data.guildID;
	data.dispatcher.once('end', function finishit() {
		finish(Papi, ops, this, message, Discord);
	});
	if (message.guild.voiceConnection) {
		Papi.messagesystem.musicnowplaying(Papi, Discord, message, Papi.lang.musicplayer.nowplaying, data.queue[0].songTitle, data.queue[0].announceChannel, data.queue[0].view, data.queue[0].length, data.queue[0].thumbnail, data.queue[0].url, data.queue[0].uploaded, data.queue[0].uploaderName, data.queue[0].uploaderURL);
		Papi.user.setActivity(`${data.queue[0].songTitle}`, { type: 'PLAYING' });
	}
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
	return undefined;
}

module.exports.help = { name: 'play' };
