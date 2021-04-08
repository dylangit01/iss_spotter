const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
	.then(passTimes => {
		for (let i of passTimes) {
      console.log(`Next pass at ${new Date(i.risetime * 1000)} for ${i.duration} seconds!`);
    }
	})
	.catch(error => {
		console.log("It didn't work: ", error.message);
	})
