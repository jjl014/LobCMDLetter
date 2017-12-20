var fetch = require('node-fetch');

const apiURL = "https://www.googleapis.com/civicinfo/v2/representatives";
const apiKey = "AIzaSyDqTXtHz-Crg8vKVakUQqZLldFp_k-X9fM";

function getRepList(userInput) {
  const {address1, address2, city, state, country, zip, message} = userInput;
  const fullAddress = [address1,address2,city,state,country,zip].join("%20");
  const roles = ["legislatorLowerBody", "legislatorUpperBody"].join("&roles=");
  return fetch(`${apiURL}?key=${apiKey}&address=${fullAddress}&roles=${roles}`)
    .then(checkStatus)
    .then(parseJSON)
    .then(createRepList)
    .catch(err => {
      throw err;
    });
}

function createRepList(json) {
  const {offices, officials} = json;
  let repList = [];
  offices.forEach(office => {
    office.officialIndices.forEach(idx => {
      const rep = Object.assign({}, officials[idx], {office: office.name});
      repList.push(rep);
    });
  });
  return repList;
}

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
