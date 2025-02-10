Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'lancer-compendium-zhtw',
			lang: 'zh-tw',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			"lidShunt": lidShunt
		});
	}
});

function lidShunt(value, _trans, data, compendium) {
	let entry = compendium.translations[data.name];

	if (!entry) return value;

	let retObj = Object.assign({}, value);
	if (entry[value.lid]) {
		let specEntry = entry[value.lid];
		for (const [key, value] of Object.entries(specEntry)) {
			retObj[key] = value;
		}
		return retObj;
	}

	for (const [key, value] of Object.entries(entry)) {
		if (retObj[key] != undefined) {
			retObj[key] = value;
		}
	}

	return retObj;
}