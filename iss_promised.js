const request = require('request-promise-native');
const ipURL = 'https://api.ipify.org?format=json';
const geoURL = 'https://freegeoip.app/json/';

const fetchMyIP = () => {
	return request(ipURL);
};

const fetchCoordsByIP = (body) => {
	const ip = JSON.parse(body).ip 
	return request(`${geoURL}${ip}`);
}

const fetchISSFlyOverTimes = coords => {
	const { latitude, longitude } = JSON.parse(coords);
	const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
	return request(url)
}

const nextISSTimesForMyLocation = () => {
	return fetchMyIP()
		.then(fetchCoordsByIP)
		// .catch(error => console.log(error))
    .then(fetchISSFlyOverTimes)
		.then(data => {
			const { response } = JSON.parse(data)
			return response;
		});
}

module.exports = { nextISSTimesForMyLocation };