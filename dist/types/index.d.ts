interface IAnalyseProps {
    text: string;
    type: 'sentiment' | 'toxicity' | 'both' | 'combined';
}
declare function analyse({ text, type }: IAnalyseProps): Promise<{
    sentiment: import("./types").Sentiment;
    toxicity?: undefined;
    combined?: undefined;
} | {
    toxicity: import("./types").ToxicityResult[];
    sentiment?: undefined;
    combined?: undefined;
} | {
    combined: string;
    sentiment?: undefined;
    toxicity?: undefined;
} | {
    sentiment: import("./types").Sentiment;
    toxicity: import("./types").ToxicityResult[];
    combined?: undefined;
}>;
declare const sjs: {
    analyse: typeof analyse;
};
export default sjs;
