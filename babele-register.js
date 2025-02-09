Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'lancer-zhtw',
			lang: 'zh-tw',
			dir: 'compendium'
		});
	}
});
