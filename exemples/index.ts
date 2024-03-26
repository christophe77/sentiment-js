import sentimentsJS from '../dist/esm/index';

const checkThisText = async () => {
	const beerScore = await sentimentsJS.analyze('I love cold beers');
    console.log("'I love cold beers' : ", beerScore)
    const vegetableScore = await sentimentsJS.analyze('I really hate vegetables');
    console.log("'I really hate vegetables' : ", vegetableScore)
};

checkThisText();
