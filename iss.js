const request = require('request');
const ipURL = 'https://api.ipify.org?format=json';
const geoURL = 'https://freegeoip.app/json/';

const fetchMyIP = (callback) => {
  request(ipURL, 'utf-8', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(errMsg), null);
      return;
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`${geoURL}${ip}`, 'utf-8', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const errMsg = `Status Code ${response.statusCode} when fetching coordinates IP. Response: ${body}`;
      callback(Error(errMsg), null);
      return;
    } else {
      const { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`,
    'utf-8',
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      if (response.statusCode !== 200) {
        // const errMsg = `Status Code ${response.statusCode} when fetching coordinates IP. Response: ${body}`;
        callback(Error(JSON.parse(body).reason), null);
        return;
      } else {
        callback(null, JSON.parse(body).response);
      }
    }
  );
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = callback => {
	fetchMyIP((error, ip) => {
		if (error) {
			return callback(error, null);
		}
		fetchCoordsByIP(ip, (error, coords) => {
			if (error) {
				return callback(error, null);
			}
			fetchISSFlyOverTimes(coords, (error, flyTime) => {
				if (error) {
					return callback(error, null);
				}
				callback(null, flyTime);
			});
		});
	});
};

module.exports = { nextISSTimesForMyLocation };
