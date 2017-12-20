var fetch = require('node-fetch');
// var fetch = require('whatwg-fetch');

const apiURL = "https://www.googleapis.com/civicinfo/v2/representatives";
const apiKey = "AIzaSyDqTXtHz-Crg8vKVakUQqZLldFp_k-X9fM";

const getRepList = (userInput) => {
  const {address1, address2, city, state, country, zipcode, message} = userInput;
  const fullAddress = [address1,address2,city,state,country,zipcode].join("%20");
  const roles = ["legislatorLowerBody", "legislatorUpperBody"].join("&roles=");
  return fetch(`${apiURL}?key=${apiKey}&address=${fullAddress}&roles=${roles}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(json => json)
    .catch(err => {
      throw err;
    });
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

module.exports = getRepList;
