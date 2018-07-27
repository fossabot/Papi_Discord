console.time('Loading');
const Discord = require('discord.js');
const Papi = new Discord.Client();
const mysql = require('mysql');
const fs = require('fs');
const active = new Map();
require('dotenv').config();

// Language
Papi.lang = require('./lang/hu_HU.json');

// Systems
Papi.levelingsystem = require('./tools/leveling_system.js');
Papi.coloringsystem = require('./tools/coloring_system');
Papi.messagesystem = require('./tools/message_system.js');
Papi.replacesystem = require('./tools/replace_system.js');

// Other resources
Papi.commands = new Discord.Collection();
Papi.levelinfo = require('./resource/leveling_system.json');
Papi.icons = require('./resource/bot_icons.json');
Papi.volume = 100;

// Saving compontents
let components = [];

// MYSQL Server
const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_DB
});

// Loading compontents
fs.readdir(`./components/`, (err, files) => {
	if (err) console.error(err);

	let jsfiles = files.filter(file => file.split('.').pop() === 'js');
	if (jsfiles.length <= 0) {
		console.log(`${Papi.lang.main_js.loading.nocmd}`);
	}

	console.log(`[ ${jsfiles.length} ${Papi.lang.main_js.loading.cmdloading} ]`);
	jsfiles.forEach((file, i) => {
		let props = require(`./components/${file}`);
		components[i] = file.slice(0, -3);
		Papi.commands.set(props.help.name, props);
		console.log(`{ ${i + 1} / ${jsfiles.length} } ${file} ${Papi.lang.main_js.loading.loaded}`);
	});
});

Papi.on('ready', async () => {
	await con.connect(err => {
		if (err) throw err;
		console.log();
		console.log(`${Papi.user.username} ${Papi.lang.main_js.loading.ready}`);
		console.timeEnd('Loading');
		console.log();
	});
});

Papi.on('message', async message => {
	if (message.author.bot) return;

	// Leveling System Check
	let msg = message.content;
	const ownerID = message.author.id;
	let msA = msg.split(/\s+/g);
	let MSL = message.content.split(/\s+/g).slice(0).join(' ');
	let CalcEXP = Papi.levelingsystem.calculatingxp(msA, components);

	if (message.channel.type !== 'dm') {
		// Create table if the guild is not exist in the Database
		await con.query(`CREATE TABLE IF NOT EXISTS \`${message.guild.id}\` LIKE \`GuildDB\``, (creerr, rows) => {
			if (creerr) throw creerr;
			if (rows.warningCount < 1) {
				con.query(`ALTER TABLE \`${message.guild.id}\` COMMENT = '${message.guild.name}'`, alterr => {
					if (alterr) throw alterr;
				});
				console.log(`( ${message.guild.name} ) ${Papi.lang.main_js.database.created}`);
			}
		});

		// Add user to the Database
		await con.query(`SELECT * FROM \`${message.guild.id}\` WHERE id = ${message.author.id}`, async (err, rows) => {
			if (err) throw err;
			let userinfo;

			if (rows.length < 1) {
				userinfo = `INSERT INTO \`${message.guild.id}\` (CP, CXP, EP, id, LP, MS, MSLXP, username) VALUES ('${CalcEXP.CP}','${CalcEXP.CXP}','${CalcEXP.EP}','${message.author.id}','${CalcEXP.LP}','1','${MSL.length}','${message.author.username}')`;
				console.log(`( ${message.guild.name} ) ${message.author.username} ${Papi.lang.main_js.database.useradded}`);
			} else {
				userinfo = `UPDATE \`${message.guild.id}\` SET CXP = ${rows[0].CXP + CalcEXP.CXP}, MSLXP = ${rows[0].MSLXP + MSL.length}, MS = ${rows[0].MS + 1}, EP = ${rows[0].EP + CalcEXP.EP}, LP = ${rows[0].LP + CalcEXP.LP}, CP = ${rows[0].CP + CalcEXP.CP} WHERE id = '${message.author.id}'`;
			}

			await con.query(userinfo);
			if (message.channel.permissionsFor(Papi.user).has('MANAGE_ROLES_OR_PERMISSIONS')) {
				Papi.levelingsystem.levels(Discord, Papi, message, CalcEXP, rows);
			} else {
				console.error(`( ${message.guild.name} ) ${Papi.lang.main_js.database.permerr}`);
			}
		});
	}

	// Check prefix or mention
	let prefix = process.env.PREFIX || '.';
	const prefixRegex = new RegExp(`^(<@!?${Papi.user.id}>|\\${prefix})\\s*`);
	if (!prefixRegex.test(message.content)) return;
	const [, matchedPrefix] = message.content.match(prefixRegex);

	// Split message
	const args = message.content.slice(matchedPrefix.length).trim().split(/\s+/g);
	const cmd = args.shift().toLocaleLowerCase();
	const fulltext = message.content.slice(matchedPrefix.length + cmd.length).trim();

	// Check SEND permission
	if (message.channel.type !== 'dm') {
		if (!message.channel.permissionsFor(Papi.user).has('SEND_MESSAGES')) {
			console.error(`( ${message.guild.name} / ${message.channel.name} ) ${Papi.lang.main_js.errors.cantsend}`);
			return;
		}
	}

	try {
		let ops = {
			ownerID,
			active
		};
		console.time(`${Papi.lang.main_js.loading.cmdspeed} ( ${cmd} )`);
		let commandFile = Papi.commands.get(cmd);
		commandFile.run(Papi, Discord, message, args, fulltext, con, ops);
		console.timeEnd(`${Papi.lang.main_js.loading.cmdspeed} ( ${cmd} )`);
	} catch (err) {
		console.error(err.message);
		console.log(`${Papi.lang.main_js.errors.debugcode} ${message.content}`);
		return;
	} finally {
		// Logging who did what
		if (message.channel.type === 'dm') {
			console.log(`${Papi.lang.main_js.logging.dm_pre} ${message.author.username} ${Papi.lang.main_js.logging.used} ${cmd}`);
		} else {
			console.log(`( ${message.guild.name} / ${message.channel.name} ) ${message.author.username} ${Papi.lang.main_js.logging.used} ${cmd}`);
		}
	}
});

Papi.on('disconnect', () => console.log(`{ ${Papi.lang.main_js.disconnect} }`));

Papi.on('reconnecting', () => console.log(`{ ${Papi.lang.main_js.reconnect} }`));

Papi.login(process.env.DISCORD_TOKEN);
