import getSentiment from './getSentiment';
import getToxicity from './getToxicity';

interface IAnalyseProps {
	text: string;
	type: 'sentiment' | "toxicity" | "all";
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
	} else {
		const sentiment = await getSentiment(text);
		const toxicity = await getToxicity(text);
		return {
			sentiment,
			toxicity,
		};
	}
}
const sentimentsJS = {
	analyse
};
export default sentimentsJS;
