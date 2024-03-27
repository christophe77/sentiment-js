import sentimentsJS from '../dist/esm/index';

const checkThisText = async () => {
	const beerScore = await sentimentsJS.analyse({
		text: 'I love cold beers',
		type: 'all',
	});
	console.log("'I love cold beers' : ", JSON.stringify(beerScore));
	const vegetableScore = await sentimentsJS.analyse({
		text: 'I really hate those fucking vegetables',
		type: 'all',
	});
	console.log(
		"'I really hate those fucking vegetables' : ",
		JSON.stringify(vegetableScore),
	);
	const insultScore = await sentimentsJS.analyse({
		text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
		type: 'all',
	});
	console.log(
		"'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",
		JSON.stringify(insultScore),
	);
};

checkThisText();
