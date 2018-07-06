const Wunderground = require('wunderground-api');
const weather = new Wunderground(process.env.WEATHER_API);
const accents = require('../tools/accents_system');

module.exports.run = (Papi, Discord, message, args, szoveg, con, ops) => {
	if (!args[0]) return Papi.messagesystem.titdescfield(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.onlycommand_desc, Papi.lang.messages.gooduse, Papi.lang.messages.onlycommand_field);
	const opts = { city: accents.csere(szoveg) };
	weather.conditions(opts, async (err, data) => {
		if (err) {
			Papi.messagesystem.titdesc(Papi, Discord, message, Papi.lang.messages.errtitle, Papi.lang.messages.weather_cantfind);
			console.error(err);
			return undefined;
		}
		const newicongif = await data.icon_url.replace('http://icons.wxug.com/i/c/k/', 'https://raw.githubusercontent.com/manifestinteractive/weather-underground-icons/master/dist/icons/white/png/256x256/');
		const newiconpng = await newicongif.replace('.gif', '.png');
		let wind;
		if (data.wind_string !== 'Calm') {
			wind = `${data.wind_kph} KM/H ${Papi.lang.components.weather.from} ${data.wind_dir}`;
		} else {
			wind = data.wind_string;
		}

		const WeatherEmbed = new Discord.RichEmbed()
			.setColor(process.env.COLOR_H)
			.setThumbnail(newiconpng)
			.setTitle(`${Papi.lang.components.weather.currentweather} ${data.display_location.full}`)
			.setDescription(`**${data.weather}**`)
			.addField(`${Papi.lang.components.weather.temp}`, `${data.temp_c} °C`, true)
			.addField(`${Papi.lang.components.weather.feels}`, `${data.feelslike_c} °C`, true)
			.addField(`${Papi.lang.components.weather.humid}`, `${data.relative_humidity}`, true)
			.addField(`${Papi.lang.components.weather.pres}`, `${data.pressure_mb} mb`, true)
			.addField(`${Papi.lang.components.weather.winds}`, wind, true)
			.setFooter(`${data.observation_time}`);

		weather.forecast(opts, async (err2, data2) => {
			if (err2) throw err;

			let forecast = data2.txt_forecast;
			const ForecastEmbed = new Discord.RichEmbed()
				.setColor(process.env.COLOR_H)
				.setTitle(`${Papi.lang.components.weather.forecast} ${data.display_location.full}`)
				.addField(`${forecast.forecastday[0].title}`, `${forecast.forecastday[0].fcttext_metric}`)
				.addField(`${forecast.forecastday[1].title}`, `${forecast.forecastday[1].fcttext_metric}`)
				.addField(`${forecast.forecastday[2].title}`, `${forecast.forecastday[2].fcttext_metric}`)
				.addField(`${forecast.forecastday[3].title}`, `${forecast.forecastday[3].fcttext_metric}`)
				.addField(`${forecast.forecastday[4].title}`, `${forecast.forecastday[4].fcttext_metric}`)
				.setFooter(message.author.username, message.author.displayAvatarURL);

			await message.channel.send({ embed: WeatherEmbed });
			message.channel.send({ embed: ForecastEmbed });
		});
		return undefined;
	});
	return undefined;
};

module.exports.help = { name: 'weather' };
