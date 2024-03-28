import { ToxicityResult } from './types/index.js';
export default function getToxicity(text: string): Promise<ToxicityResult[]>;
