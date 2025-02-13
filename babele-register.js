Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'lancer-compendium-zhtw',
			lang: 'zh-tw',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			"lidShunt": lidShunt,
			"mechFrame": mechShunt
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

function mechShunt(value, trans, data, compendium) {
	if (data.type === "frame") return mechFrameConverter(value, trans, data, compendium);
	
	return value;
}
function mechFrameConverter(value, _trans, data, compendium) {
	let entry = compendium.translations[data.name];
	if (!entry) return value;

	let retObj = Object.assign({}, value);
	return objectConvert(retObj, entry);
}

function objectConvert(source, translate) {
	if (translate == undefined) return source;
	
	for (const key of Object.keys(translate)) {
		if (source[key] == undefined) {
			continue;
		}

		if (Array.isArray(source[key])) {
			for (const entry of source[key]) {
				objectConvert(entry, translate[key][entry.name]);
			}
		} else if (typeof source[key] === "object") {
			objectConvert(source[key], translate[key]);
		} else {
			source[key] = translate[key];
		}
	}
	return source;
}