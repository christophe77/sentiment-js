# sentimentsJS

SentimentsJS is build on to of **tensorflow js**. 
It allows you to add a sentiment analysis on your node or browser javascript app.
With this package you'll be able to get the overall **sentiment** from a text and the **toxicity** classification.

# Installation

    yarn add 
    or
    npm install


## How to use
sentimentsJS.analyse takes an object as parameter. The object has 2 properties :

 - text : string
 - type : 'sentiment'  |  "toxicity"  |  "all"

    import  sentimentsJS  from  'sentimentsJS';
    
	const  checkThisText  =  async () => {
		const  beerScore  =  await  sentimentsJS.analyse({
			text:  'I love cold beers',
			type:  'all',
		});
		console.log("'I love cold beers' : ", JSON.stringify(beerScore));

		const  vegetableScore  =  await  sentimentsJS.analyse({
			text:  'I really hate those fucking vegetables',
			type:  'all',
		});
		console.log("'I really hate those fucking vegetables' : ", JSON.stringify(vegetableScore));

        const insultScore = await sentimentsJS.analyse({
		    text: 'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face',
		    type: 'all',
        });
        console.log(
            "'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' : ",
            JSON.stringify(insultScore),
        );
	};

Console output will be :
	
    'I love cold beers' :  {
	    "sentiment": { score":0.8631731867790222,"result":"positive"},
        "toxicity":[]
	 }
	'I really hate those fucking vegetables' :  {
		"sentiment": {"score":0.1487867832183838,"result":"negative"},
        "toxicity":[{"label":"toxicity","result":true}]}
    'You are just a fucking bitch. You just deserve to receive cum on your dirty shitty face' :  {
        "sentiment":{"score":0.9931357502937317,"result":"positive"},
        "toxicity":[{"label":"insult","result":true},{"label":"toxicity","result":true}]}

Has you can see on the 3rd exemple, the sentences are very vulgar but the sentiment is computed as "positive".
That's why I added a toxicity classification so you can check both toxicity and sentiment result to determinate if it's a false positive.

## TODO

 - Combine sentiment and toxicity classification to get the most accurate sentiment result.
 - add a tensorflow backend to get better speed and performance.

	

