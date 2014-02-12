//this file is a thin wrapper around the mandrill API.
//It just instantiates mandrill if it can find the authentication token
//and otherwise replaces the ".send" method with a no-op

var email_helper = null;
var mandrillKey = null;

//you can set your mandrill key as an environment variable if you're using,
//for example, heroku

if (process.env.MANDRILL_KEY) {
  mandrillKey = process.env.MANDRILL_KEY;
} else {
  try {
    var config = require('./config');
    mandrillKey = config.mandrillKey;
  } catch (ex) {
    console.log('Rename config.example.js to config.js' +
    'and add your mandrill key, or set it as an environment variable, in order to enable emailing');
  }
}

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = null;
if (mandrillKey) {
  mandrill_client = new mandrill.Mandrill(mandrillKey);
  email_helper = mandrill_client.messages;
} else {
  email_helper = {
    send: function() {/*no-op*/}
  }
};

module.exports = email_helper;