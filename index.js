var inquirer = require('inquirer');
var commander = require('commander');
var getRepList = require('./api_util');

const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'From Name:'
  },
  {
    name: 'address1',
    type: 'input',
    message: 'From Address Line 1:'
  },
  {
    name: 'address2',
    type: 'input',
    message: 'From Address Line 2:'
  },
  {
    name: 'city',
    type: 'input',
    message: 'From City:'
  },
  {
    name: 'state',
    type: 'input',
    message: 'From State:'
  },
  {
    name: 'country',
    type: 'input',
    message: 'From Country:'
  },
  {
    name: 'zipcode',
    type: 'input',
    message: 'From Zip Code:'
  }
];

const selectSenator = [
  {
    name: 'senators',
    type: 'list',
    message: 'Which official would you like to send an email to?',
    choices: ["pizza"]
  }
];

console.log("Please enter your address");
inquirer.prompt(questions).then(answers =>
  getRepList(answers)
    .then(json => createRepList(json))
    .then(() => inquirer.prompt(selectSenator))
    .catch(err => console.log(err))
);

const createRepList = (json) => {

};
