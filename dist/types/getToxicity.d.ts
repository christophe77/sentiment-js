import { ToxicityResult } from './types';
export default function getToxicity(text: string): Promise<ToxicityResult[]>;
