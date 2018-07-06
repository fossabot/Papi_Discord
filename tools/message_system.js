// ++++++++++ Default messages ++++++++++

module.exports.titdesc = function sendembed(Papi, Discord, message, title, desc, icon) {
	if (icon === undefined) {
		icon = Papi.emotes.x;
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
		icon = Papi.emotes.x;
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
		icon = Papi.emotes.x;
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
		icon = Papi.emotes.x;
	}
	let onlydesc = new Discord.RichEmbed()
		.setDescription(`${desc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: onlydesc });
};

// ++++++++++ Music System ++++++++++

// Added to queue
module.exports.musictitdesc = function sendembed(Papi, Discord, message, title, desc) {
	let musictitdesc = new Discord.RichEmbed()
		.setTitle(`${Papi.emotes.add} ${title}`)
		.setDescription(`${desc}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: musictitdesc });
};

// Complete / Successfull vote for skip
module.exports.musictitdescvote = function sendembed(Papi, Discord, message, title, voted, need) {
	let musictitdescvote = new Discord.RichEmbed()
		.setTitle(`${Papi.emotes.complete} ${title}`)
		.setDescription(`${voted} / ${need}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	message.channel.send({ embed: musictitdescvote });
};

// Now Playing
module.exports.musicfixchtitdesc = function sendembed(Papi, Discord, message, title, musicname, channel) {
	let musicfixchtitdesc = new Discord.RichEmbed()
		.setTitle(`${Papi.emotes.play} ${title}`)
		.setDescription(`${musicname}`)
		.setFooter(message.author.username, message.author.displayAvatarURL)
		.setColor(process.env.COLOR_H);
	Papi.channels.get(channel).send({ embed: musicfixchtitdesc });
};

// ++++++++++ Coloring System ++++++++++

module.exports.colortitarray = function sendembed(Papi, Discord, message, title, colorarray) {
	let titdesc = new Discord.RichEmbed()
		.setTitle(`${Papi.emotes.search} ${title}`)
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
