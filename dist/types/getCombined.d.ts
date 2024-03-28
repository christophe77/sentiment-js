import { Sentiment, ToxicityResult } from './types';
export default function getCombined(sentiment: Sentiment, toxicity: ToxicityResult[]): Promise<string>;
