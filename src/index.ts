import getSentiment from './getSentiment';
import getToxicity from './getToxicity';
import getCombined from './getCombined';

interface IAnalyseProps {
	text: string;
	type: 'sentiment' | 'toxicity' | 'both' | 'combined';
}

async function analyse({ text, type }: IAnalyseProps) {
	if (type === 'sentiment') {
		const sentiment = await getSentiment(text);
		return {
			sentiment,
		};
	} else if (type === 'toxicity') {
		const toxicity = await getToxicity(text);
		return {
			toxicity,
		};
	} else if (type === 'combined') {
		const sentiment = await getSentiment(text);
		const toxicity = await getToxicity(text);
		const combined = await getCombined(sentiment, toxicity);
		return {
			combined,
		};
	} else {
		const sentiment = await getSentiment(text);
		const toxicity = await getToxicity(text);
		return {
			sentiment,
			toxicity,
		};
	}
}
const sjs = {
	analyse
}
export default sjs;
