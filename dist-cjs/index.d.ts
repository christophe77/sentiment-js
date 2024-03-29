interface IAnalyseProps {
    text: string;
    type: 'sentiment' | 'toxicity' | 'both' | 'combined';
}
declare function analyse({ text, type }: IAnalyseProps): Promise<{
    sentiment: import("./types/index.js").Sentiment;
    toxicity?: undefined;
    combined?: undefined;
} | {
    toxicity: import("./types/index.js").ToxicityResult[];
    sentiment?: undefined;
    combined?: undefined;
} | {
    combined: string;
    sentiment?: undefined;
    toxicity?: undefined;
} | {
    sentiment: import("./types/index.js").Sentiment;
    toxicity: import("./types/index.js").ToxicityResult[];
    combined?: undefined;
}>;
declare const sjs: {
    analyse: typeof analyse;
};
export default sjs;
