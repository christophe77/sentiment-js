import { Sentiment, ToxicityResult } from './types';

export default async function getCombined(
	sentiment: Sentiment,
	toxicity: ToxicityResult[],
) {
	if (sentiment.result !== 'negative') {
		let combined = 'positive';
		toxicity.forEach((result: ToxicityResult) => {
			if (result.result === true) {
				combined = 'negative';
			}
		});
		return combined;
	}
	return 'negative';
}
