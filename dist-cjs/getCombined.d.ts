import { Sentiment, ToxicityResult } from './types/index.js';
export default function getCombined(sentiment: Sentiment, toxicity: ToxicityResult[]): Promise<string>;
