module.exports.csere = function createcolor(szoveg) {
	let maganhangzo = ['á', 'í', 'é', 'ó', 'ö', 'ő', 'ú', 'ü', 'ű'];
	for (let i = 0; i < maganhangzo.length; i++) {
		if (i === 0) {
			szoveg = szoveg.replace(maganhangzo[i], 'a');
		} else if (i === 1) {
			szoveg = szoveg.replace(maganhangzo[i], 'i');
		} else if (i === 2) {
			szoveg = szoveg.replace(maganhangzo[i], 'e');
		} else if (i === 3 || i === 4 || i === 5) {
			szoveg = szoveg.replace(maganhangzo[i], 'o');
		} else if (i === 6 || i === 7 || i === 8) {
			szoveg = szoveg.replace(maganhangzo[i], 'u');
		}
	}
	return szoveg;
};
