'use strict';

var tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-backend-wasm');
require('@tensorflow/tfjs-backend-webgl');
var tfToxicity = require('@tensorflow-models/toxicity');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var tf__namespace = /*#__PURE__*/_interopNamespaceDefault(tf);
var tfToxicity__namespace = /*#__PURE__*/_interopNamespaceDefault(tfToxicity);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const OOV_INDEX = 2;
const PAD_INDEX = 0;
if (typeof window === 'undefined') {
    tf__namespace.setBackend('wasm');
}
else {
    tf__namespace.setBackend('webgl');
}
const padSequences = (sequences, maxLen, padding = 'pre', truncating = 'pre', value = PAD_INDEX) => {
    return sequences.map((seq) => {
        if (seq.length > maxLen) {
            if (truncating === 'pre') {
                seq.splice(0, seq.length - maxLen);
            }
            else {
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
            }
            else {
                seq = seq.concat(pad);
            }
        }
        return seq;
    });
};
const tokenize = (text) => {
    const rgxPunctuation = /[^(a-zA-ZA-Яa-я0-9_)+\s]/g;
    const sanitized = text.replace(rgxPunctuation, ' ');
    return sanitized.split(/\s+/);
};
const computeSentiment = (score) => {
    if (score > 0.65)
        return 'positive';
    if (score < 0.65)
        return 'negative';
    return 'neutral';
};
function getSentiment(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const modelToUse = yield tf__namespace.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
        const metadataJson = yield fetch('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json');
        const metadataToUse = yield metadataJson.json();
        const tokens = tokenize(text);
        const sequence = tokens.map((word) => {
            let wordIndex = metadataToUse.word_index[word] + metadataToUse.index_from;
            if (wordIndex > metadataToUse.vocabulary_size) {
                wordIndex = OOV_INDEX;
            }
            return wordIndex;
        });
        const paddedSequence = padSequences([sequence], metadataToUse.max_len);
        const input = tf__namespace.tensor2d(paddedSequence, [1, metadataToUse.max_len]);
        const predictOut = modelToUse.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();
        const result = computeSentiment(Number(score.toFixed(2)));
        const sentiment = {
            score,
            result,
        };
        return sentiment;
    });
}

function getToxicity(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const threshold = 0.9;
        const toxicityLabels = [];
        const model = yield tfToxicity__namespace.load(threshold, toxicityLabels);
        const predictions = (yield model.classify(text));
        const toxicityResult = predictions
            .map((prediction) => {
            if (prediction.results[0].match === true) {
                return { label: prediction.label, result: prediction.results[0].match };
            }
        })
            .filter(Boolean);
        return toxicityResult;
    });
}

function getCombined(sentiment, toxicity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (sentiment.result !== 'negative') {
            let combined = 'positive';
            toxicity.forEach((result) => {
                if (result.result === true) {
                    combined = 'negative';
                }
            });
            return combined;
        }
        return 'negative';
    });
}

function analyse(_a) {
    return __awaiter(this, arguments, void 0, function* ({ text, type }) {
        if (type === 'sentiment') {
            const sentiment = yield getSentiment(text);
            return {
                sentiment,
            };
        }
        else if (type === 'toxicity') {
            const toxicity = yield getToxicity(text);
            return {
                toxicity,
            };
        }
        else if (type === 'combined') {
            const sentiment = yield getSentiment(text);
            const toxicity = yield getToxicity(text);
            const combined = yield getCombined(sentiment, toxicity);
            return {
                combined,
            };
        }
        else {
            const sentiment = yield getSentiment(text);
            const toxicity = yield getToxicity(text);
            return {
                sentiment,
                toxicity,
            };
        }
    });
}
const sjs = {
    analyse
};

module.exports = sjs;
//# sourceMappingURL=bundle.cjs.map
