import * as tfToxicity from '@tensorflow-models/toxicity';
import { ToxicityPrediction, ToxicityResult } from './types/index.js';

export default async function getToxicity(
	text: string,
): Promise<ToxicityResult[]> {
	const threshold = 0.9;
	const toxicityLabels = [];
	const model = await tfToxicity.load(threshold, toxicityLabels);
	const predictions = (await model.classify(text)) as ToxicityPrediction[];
	const toxicityResult = predictions
		.map((prediction: ToxicityPrediction) => {
			if (prediction.results[0].match === true) {
				return { label: prediction.label, result: prediction.results[0].match };
			}
		})
		.filter(Boolean);
	return toxicityResult;
}
