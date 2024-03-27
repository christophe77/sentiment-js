import sentimentsJS from '../dist/';

const checkThisText = async () => {
	// sentiment
	const beerScore = await sentimentsJS.analyse({
		text: 'I love cold beers',
		type: 'sentiment',
	});
	console.log("'I love cold beers' : ", JSON.stringify(beerScore));

	// toxicity
	const vegetableScore = await sentimentsJS.analyse({
		text: 'I really hate those fucking vegetables',
		type: 'toxicity',
	});
	console.log(
		"'I really hate those fucking vegetables' : ",
		JSON.stringify(vegetableScore),
	);

	// both
	const insultScore = await sentimentsJS.analyse({
		text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
		type: 'both',
	});
	console.log(
		"'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",
		JSON.stringify(insultScore),
	);

	// combined
	const combinedScore = await sentimentsJS.analyse({
		text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
		type: 'combined',
	});
	console.log(
		"'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",
		JSON.stringify(combinedScore),
	);
};

checkThisText();
