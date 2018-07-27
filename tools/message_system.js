// ++++++++++ Default messages ++++++++++

module.exports.titdesc = function sendembed(Papi, Discord, message, title, desc, icon) {
	if (icon === undefined) {
		icon = Papi.icons.x;
	}
	let titdesc = new Discord.RichEmbed()
		.setTitle(`${icon} ${title}`)
		.setDescription(`${desc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: titdesc });
};

module.exports.titfield = function sendembed(Papi, Discord, message, title, fieldtitle, fielddesc, icon) {
	if (icon === undefined) {
		icon = Papi.icons.x;
	}
	let titfield = new Discord.RichEmbed()
		.setTitle(`${icon} ${title}`)
		.addField(`${fieldtitle}`, `${fielddesc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: titfield });
};

module.exports.titdescfield = function sendembed(Papi, Discord, message, title, desc, fieldtitle, fielddesc, icon) {
	if (icon === undefined) {
		icon = Papi.icons.x;
	}
	let titdescfield = new Discord.RichEmbed()
		.setTitle(`${icon} ${title}`)
		.setDescription(`${desc}`)
		.addField(`${fieldtitle}`, `${fielddesc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: titdescfield });
};

module.exports.onlydesc = function sendembed(Papi, Discord, message, desc, icon) {
	if (icon === undefined) {
		icon = Papi.icons.x;
	}
	let onlydesc = new Discord.RichEmbed()
		.setDescription(`${desc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: onlydesc });
};

// ++++++++++ Music System ++++++++++

// Added to queue
module.exports.musicaddqueue = function sendembed(Papi, Discord, message, title, musicname, url, thumbnail, length, sorszam) {
	let musicaddqueue = new Discord.RichEmbed()
		.setTitle(`${Papi.icons.add} ${title}`)
		.setDescription(`[${musicname}](${url})`)
		.setThumbnail(`${thumbnail}`)
		.addField(`${Papi.lang.musicplayer.length}`, `${length}`, true)
		.addField(`Sorszám`, `${sorszam}`, true)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: musicaddqueue });
};

// Complete / Successfull vote for skip
module.exports.musictitdescvote = function sendembed(Papi, Discord, message, title, voted, need) {
	let musictitdescvote = new Discord.RichEmbed()
		.setTitle(`${Papi.icons.check} ${title}`)
		.setDescription(`${voted} / ${need}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: musictitdescvote });
};

// Now Playing
module.exports.musicnowplaying = function sendembed(Papi, Discord, message, title, musicname, channel, view, length, thumbnail, url, uploaded, uploader, uploaderURL) {
	let musicnowplaying = new Discord.RichEmbed()
		.setTitle(`${Papi.icons.play} ${title}`)
		.setDescription(`[${musicname}](${url})`)
		.setThumbnail(`${thumbnail}`)
		.addField(`${Papi.lang.musicplayer.length}`, `${length}`, true)
		.addField(`${Papi.lang.musicplayer.view}`, `${view}`, true)
		.addField(`${Papi.lang.musicplayer.uploader}`, `[${uploader}](${uploaderURL})`, true)
		.addField(`${Papi.lang.musicplayer.uploaded}`, `${Papi.replacesystem.relativetime(Papi, Date.now(), uploaded)}`, true)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	Papi.channels.get(channel).send({ embed: musicnowplaying });
};

// ++++++++++ Coloring System ++++++++++

module.exports.colortitarray = function sendembed(Papi, Discord, message, title, colorarray) {
	let titdesc = new Discord.RichEmbed()
		.setTitle(`${Papi.icons.search} ${title}`)
		.setDescription(`${colorarray}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: titdesc });
};

module.exports.colormessage = function sendembed(Papi, Discord, message, title, desc, role, icon) {
	let colormessage = new Discord.RichEmbed()
		.setTitle(`${icon} ${title}`)
		.setDescription(`${role} ${desc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: colormessage });
};
