module.exports.replace = function replace(fulltext) {
	fulltext = fulltext.replace('á', 'a');
	fulltext = fulltext.replace('í', 'i');
	fulltext = fulltext.replace('é', 'e');
	fulltext = fulltext.replace('ó', 'o');
	fulltext = fulltext.replace('ö', 'o');
	fulltext = fulltext.replace('ő', 'o');
	fulltext = fulltext.replace('ú', 'u');
	fulltext = fulltext.replace('ü', 'u');
	fulltext = fulltext.replace('ű', 'u');
	return fulltext;
};

module.exports.time = function converter(Papi, time) {
	let hour = (time / 3600).toFixed(0);
	let minutes = ((time % 3600) / 60).toFixed(0);
	let seconds = time % 60;
	let returnmessage = '';

	if (hour > 0) {
		returnmessage = `${hour} ${Papi.lang.messages.hour}`;
	}
	if (minutes > 0) {
		returnmessage = `${returnmessage} ${minutes} ${Papi.lang.messages.min}`;
	}
	if (seconds > 0) {
		returnmessage = `${returnmessage} ${seconds} ${Papi.lang.messages.sec}`;
	}

	return returnmessage;
};

module.exports.numberformatUS = function converter(count) {
	return new Intl.NumberFormat().format(count);
};

module.exports.relativetime = function converter(Papi, current, previous) {
	const msPerMinute = 60 * 1000;
	const msPerHour = msPerMinute * 60;
	const msPerDay = msPerHour * 24;
	const msPerMonth = msPerDay * 30;
	const msPerYear = msPerDay * 365;

	let elapsed = current - previous;

	if (elapsed < msPerMinute) {
		return `${Math.round(elapsed / 1000)} ${Papi.lang.messages.sec_ago}`;
	} else if (elapsed < msPerHour) {
		return `${Math.round(elapsed / msPerMinute)} ${Papi.lang.messages.min_ago}`;
	} else if (elapsed < msPerDay) {
		return `${Math.round(elapsed / msPerHour)} ${Papi.lang.messages.hour_ago}`;
	} else if (elapsed < msPerMonth) {
		return `${Math.round(elapsed / msPerDay)} ${Papi.lang.messages.day_ago}`;
	} else if (elapsed < msPerYear) {
		return `${Math.round(elapsed / msPerMonth)} ${Papi.lang.messages.month_ago}`;
	} else {
		return `${Math.round(elapsed / msPerYear)} ${Papi.lang.messages.year_ago}`;
	}
};
