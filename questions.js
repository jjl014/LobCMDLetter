const questions = [
  {
    name: 'name',
    type: 'input',
    message: 'From Name:',
    validate: function(value) {
      if(value.length && /[A-Za-z]/.test(value)) {
        return true;
      }
      return "Please enter a valid name";
    }
  },
  {
    name: 'address1',
    type: 'input',
    message: 'From Address Line 1:',
    validate: function(value) {
      if (/[A-Za-z]/.test(value) && /\d/.test(value)) {
        return true;
      }
      return "Please enter a valid address";
    }
  },
  {
    name: 'address2',
    type: 'input',
    message: 'From Address Line 2:'
  },
  {
    name: 'city',
    type: 'input',
    message: 'From City:',
    validate: function(value) {
      if (value.length >= 2) {
        return true;
      }
      return "Please enter a valid city.";
    }
  },
  {
    name: 'state',
    type: 'input',
    message: 'From State:',
    validate: function(value) {
      if (value.length >= 2) {
        return true;
      }
      return "Please enter a valid state.";
    }
  },
  {
    name: 'zip',
    type: 'input',
    message: 'From Zip Code:',
    validate: function(value) {
      if (/\d/.test(value)) {
        return true;
      }
      return "Please enter a valid zip code.";
    }
  },
  {
    name: 'country',
    type: 'input',
    message: 'From Country:',
    validate: function(value) {
      if (value.length >= 2) {
        return true;
      }
      return "Please enter a valid country";
    }
  }
];

module.exports = questions;
