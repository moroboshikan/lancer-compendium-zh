Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'lancer-compendium-zhtw',
			lang: 'zh-tw',
			dir: 'compendium'
		});

		Babele.get().registerConverters({
			"generalConverter": generalConverter
		});
	}
});

function generalConverter(system, _trans, data, compendium) {
	const id = data._id;
	const name = data.name;
	
	// Check TranslationEntry
	let entry = (compendium.translations[name] || compendium.translations[id]);
	if (!entry) return system;

	// Copy ReturnValue
	let retObj = Object.assign({}, system);
	
	// LID Shunt
	const lid  = system.lid;
	if (entry[lid]) {
		if (entry[lid].name) {
			data.name = entry[lid].name;
		}
		return objectConvert(retObj, entry[lid]);
	}
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