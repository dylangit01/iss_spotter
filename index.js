const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
	for (let i of passTimes) {
		console.log(`Next pass at ${new Date(i.risetime)} for ${i.duration} seconds!`);
	}
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('45.148.7.7', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(data);
//   
// });

// fetchISSFlyOverTimes({ latitude: 43.6644, longitude: -79.4195 }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   } 
//    console.log('It worked! Returned flyover times:', data);
//   
// });
