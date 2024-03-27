export type Sentiment = {
	score: number;
	result: 'positive' | 'negative' | 'neutral';
};
export type ToxicityLabel =
	| 'identity_attack'
	| 'insult'
	| 'obscene'
	| 'severe_toxicity'
	| 'sexual_explicit'
	| 'threat'
	| 'toxicity';

export type ToxicityPrediction = {
	label: ToxicityLabel;
	results: { probabilities: Float32Array; match: boolean }[];
};
export type ToxicityResult = {
	label: ToxicityLabel;
	result: boolean;
};
