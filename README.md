
# sentimentJS

SentimentsJS is build on to of **tensorflow js**.
It allows you to add a sentiment analysis on your node or browser javascript app.
With this package you'll be able to get the overall **sentiment** from a text and the **toxicity** classification.


# Installation

    yarn add sentiment-js

or

    npm install sentiment-js


## How to use

the "analyse" function takes an object as parameter. 

The object has 2 properties :

- text : string
- type : 'sentiment' | "toxicity" | "both" | "combined"

Exemple :

        import sjs from 'sentiments-js';

	    const checkThisText = async () => {
            // sentiment
		    const beerScore = await sjs.analyse({
			    text: 'I love cold beers',    
			    type: 'sentiment',    
		    });
		    console.log("'I love cold beers' : ", JSON.stringify(beerScore));

            // toxicity
		    const vegetableScore = await sjs.analyse({
			    text: 'I really hate those fucking vegetables',
			    type: 'toxicity',
			});
		    console.log("'I really hate those fucking vegetables' : ", JSON.stringify(vegetableScore));

            // both
		    const insultScore = await sjs.analyse({
			    text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
			    type: 'both',
		    });
		    console.log( "'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",   JSON.stringify(insultScore) );

            // combined
		    const combinedScore = await sjs.analyse({
			    text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
			    type: 'combined',
		    });
		    console.log( "'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",   JSON.stringify(combinedScore) );
		 };

Console output will be :

	'I love cold beers' : {
		"sentiment": { score":0.8631731867790222,"result":"positive"},
		"toxicity":[]
	}

	'I really hate those fucking vegetables' : {
		"sentiment": {"score":0.1487867832183838,"result":"negative"},
		"toxicity":[{"label":"toxicity","result":true}]
	}

	'You are just a fucking bitch. You just deserve to receive cum on your 	dirty shitty face' : 
	{
		"sentiment":{"score":0.9931357502937317,"result":"positive"},
		"toxicity":[
			{"label":"insult","result":true},
			{"label":"toxicity","result":true}
		]
    }

    'You are just a fucking bitch. You just deserve to receive cum on your 	dirty shitty face' : 
	{
		"combined":"negative"
    }

  

Has you can see on the 3rd exemple, the sentences are very vulgar but the sentiment is computed as "positive".
That's why I added a "combined" classification so you can check both toxicity and sentiment result to determinate if it's a false positive.

## TODO

- add a tensorflow backend to get better speed and performance.