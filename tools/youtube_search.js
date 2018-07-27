const search = require('yt-search');

module.exports.run = (Papi, Discord, message, args, fulltext, con, ops) => {
	if (message.channel.type === 'dm') return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.privatemessage);
	search(args.join(' '), (err, res) => {
		if (err) return Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.musicplayer.wentwrong);
		let videos = res.videos.slice(0, 10);
		let resp = '';
		for (var i in videos) {
			resp += `**[ ${parseInt(i) + 1} ]**  ${videos[i].title}\n`;
		}
		Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.musicplayer.choose, resp, Papi.icons.search);
		const filter = mf => !isNaN(mf.content) && mf.content < videos.length + 1 && mf.content > 0;
		const collector = message.channel.createMessageCollector(filter);
		collector.videos = videos;
		collector.once('collect', function asd(mf) {
			let commandFile = require(`../components/play.js`);
			return commandFile.run(Papi, Discord, message, [this.videos[parseInt(mf.content) - 1].url], fulltext, con, ops);
		});
		return undefined;
	});
	return undefined;
};

module.exports.help = { name: 'search' };
