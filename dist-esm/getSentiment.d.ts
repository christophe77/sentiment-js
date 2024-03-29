import '@tensorflow/tfjs-backend-wasm';
import '@tensorflow/tfjs-backend-webgl';
import { Sentiment } from './types/index.js';
export default function getSentiment(text: string): Promise<Sentiment>;
