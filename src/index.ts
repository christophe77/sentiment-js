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

async function analyze(text: string): Promise<Sentiment> {
	const model = await tf.loadLayersModel(
		'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
	);
	const metadataJson = await fetch(
		'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
	);
	const metadata = await metadataJson.json();

	const tokens = tokenize(text);
	const sequence = tokens.map((word) => {
		let wordIndex = metadata.word_index[word] + metadata.index_from;
		if (wordIndex > metadata.vocabulary_size) {
			wordIndex = OOV_INDEX;
		}
		return wordIndex;
	});
	const paddedSequence = padSequences([sequence], metadata.max_len);
	const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

	const predictOut = model.predict(input);
	const score = (<any>predictOut).dataSync()[0];
	(<any>predictOut).dispose();

	const result: 'positive' | 'negative' =
		score > 0.65 ? 'positive' : 'negative';
	const sentiment = {
		score,
		result,
	};
	return sentiment;
}

const sentimentsJS = {
	analyze,
};
export default sentimentsJS;
