var inquirer = require('inquirer');
var getRepList = require('./api_util');
var Lob = require('lob')('test_d07aaf24ea2cd3d8b0d93ac19972de6882c');
var questions = require('./questions');

let repList = [];
let messageObj = {};

console.log("Please enter your information");
inquirer.prompt(questions).then(answers => {
  messageObj = Object.assign(messageObj, {"from": answers});
  getRepList(answers)
    .then(list => {
      chooseOfficial(list)
        .then(answer => {
          promptMessage(answer)
            .then(answer2 => {
              createLetter(answer2)
                .catch(err => console.log(JSON.stringify(err)));
            });
        });
    }).catch(err => console.log("Error:", err.response.statusText));
});

function chooseOfficial(list){
  repList = list;
  return inquirer.prompt({
    name: 'senator',
    type: 'list',
    message: 'Which official would you like to send a message to?',
    choices: list.map(official => {
      return official.name + " - " + official.office;
    })
  });
}

function promptMessage(answer) {
  const official = repList.filter(rep => {
    return rep.name === answer.senator.split(" - ")[0];
  })[0];
  messageObj = Object.assign(messageObj, {"to": official});
  return inquirer.prompt({
    name: 'message',
    type: 'input',
    message: 'Enter your message to send:',
    validate: function(value) {
      if (!value.length) {
        return "Please enter a message.";
      } else if (value.length <= 500) {
        return true;
      }
      return "Message cannot exceed 500 characters. " +
        `You message currently contains ${value.length} characters. ` +
        "Press the up arrow key to show your old message.";
    }
  });
}

function capitalizeName(name) {
  return name.split(" ").map(part => part[0].toUpperCase() + part.slice(1)).join(" ");
}

function createLetter(answer2) {
  messageObj = Object.assign(messageObj, {"message": answer2.message});
  const {from, to, message} = messageObj;
  return Lob.letters.create({
    description: 'Letter To Legislator',
    to: {
      name: to.name,
      address_line1: to.address[0].line1,
      address_line2: to.address[0].line2,
      address_city: to.address[0].city,
      address_state: to.address[0].state,
      address_zip: to.address[0].zip,
      address_country: from.country.length ? from.country : "US"
    },
    from: {
      name: from.name,
      address_line1: from.address1,
      address_line2: from.address2,
      address_city: from.city,
      address_state: from.state,
      address_zip: from.zip,
      address_country: from.country,
    },
    file: 'tmpl_0648252e6b30cc5',
    merge_variables: {
      name: to.name,
      from: capitalizeName(from.name),
      date: new Date().toDateString().slice(4),
      message: message
    },
    color: true
  }, function (err, res) {
    if (err) {
      return err;
    } else {
      console.log("Here is a link to the preview of your letter:");
      console.log(res.url);
    }
  });
}
