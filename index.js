var inquirer = require('inquirer');
var commander = require('commander');
var getRepList = require('./api_util');

const questions = [
  // {
  //   name: 'name',
  //   type: 'input',
  //   message: 'From Name:'
  // },
  // {
  //   name: 'address1',
  //   type: 'input',
  //   message: 'From Address Line 1:'
  // },
  // {
  //   name: 'address2',
  //   type: 'input',
  //   message: 'From Address Line 2:'
  // },
  // {
  //   name: 'city',
  //   type: 'input',
  //   message: 'From City:'
  // },
  // {
  //   name: 'state',
  //   type: 'input',
  //   message: 'From State:'
  // },
  // {
  //   name: 'country',
  //   type: 'input',
  //   message: 'From Country:'
  // },
  {
    name: 'zipcode',
    type: 'input',
    message: 'From Zip Code:'
  }
];

let repList = [];
let messageObj = {};

console.log("Please enter your information");
inquirer.prompt(questions).then(answers => {
  messageObj = Object.assign(messageObj, {"from": answers});
  getRepList(answers)
    .then(list => {
      repList = list;
      chooseOfficial(list)
        .then(answer => {
        const official = repList.filter(rep => {
          return rep.name === answer.senator.split(" - ")[0];
        })[0];
        messageObj = Object.assign(messageObj, {"to": official});
        promptMessage().then(answer2 => {
          console.log(messageObj);
        });
      });
    })
    .catch(err => console.log(err));
});

function chooseOfficial(list){
  return inquirer.prompt({
    name: 'senator',
    type: 'list',
    message: 'Which official would you like to send a message to?',
    choices: list.map(official => {
      return official.name + " - " + official.office;
    })
  });
}

function promptMessage() {
  return inquirer.prompt({
    name: 'message',
    type: 'input',
    message: 'Enter your message to send:'
  });
}
