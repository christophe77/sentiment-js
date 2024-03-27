import * as tf from '@tensorflow/tfjs';
import { Sentiment } from './types';

const OOV_INDEX = 2;
const PAD_INDEX = 0;

const padSequences = (
	sequences,
	maxLen,
	padding = 'pre',
	truncating = 'pre',
	value = PAD_INDEX,
) => {
	return sequences.map((seq) => {
		if (seq.length > maxLen) {
			if (truncating === 'pre') {
				seq.splice(0, seq.length - maxLen);
			} else {
				seq.splice(maxLen, seq.length - maxLen);
			}
		}

		if (seq.length < maxLen) {
			const pad = [];
			for (let i = 0; i < maxLen - seq.length; ++i) {
				pad.push(value);
			}
			if (padding === 'pre') {
				seq = pad.concat(seq);
			} else {
				seq = seq.concat(pad);
			}
		}

		return seq;
	});
};

const tokenize: (text: string) => string[] = (text: string) => {
	const rgxPunctuation = /[^(a-zA-ZA-Яa-я0-9_)+\s]/g;
	const sanitized = text.replace(rgxPunctuation, ' ');
	return sanitized.split(/\s+/);
};

const computeSentiment: (
	score: number,
) => 'positive' | 'negative' | 'neutral' = (score: number) => {
	if (score > 0.65) return 'positive';
	if (score < 0.65) return 'negative';
	if (score === 0.65) return 'neutral';
};

export default async function getSentiment(text: string): Promise<Sentiment> {
	const modelToUse = await tf.loadLayersModel(
		'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
	);
	const metadataJson = await fetch(
		'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
	);
	const metadataToUse = await metadataJson.json();

	const tokens = tokenize(text);

	const sequence = tokens.map((word) => {
		let wordIndex = metadataToUse.word_index[word] + metadataToUse.index_from;
		if (wordIndex > metadataToUse.vocabulary_size) {
			wordIndex = OOV_INDEX;
		}
		return wordIndex;
	});
	const paddedSequence = padSequences([sequence], metadataToUse.max_len);
	const input = tf.tensor2d(paddedSequence, [1, metadataToUse.max_len]);

	const predictOut = modelToUse.predict(input);
	const score = (<any>predictOut).dataSync()[0];
	(<any>predictOut).dispose();
	const result = computeSentiment(Number(score.toFixed(2)));
	const sentiment = {
		score,
		result,
	};
	return sentiment;
}
