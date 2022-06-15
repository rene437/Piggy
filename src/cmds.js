const fetch = require('cross-fetch');
const flipText = require('./cmds/flip-text');
const msgUtils = require('./msg-utils');

const prefix = '/';

async function dispatch(msg) {
  let cmd = getCmd(msg.content)
  cmd = cmd.toLowerCase();
  let resp = '';
  switch (cmd) {
    case 'yo':
      resp = 'yo!';
      break;
    case 'die':
      resp = 'nooo';
      break;
    case 'oink':
      resp = '🐖';
      break;
    case 'joke':
      resp = joke();
      break;
    case 'say':
      resp = say(msg);
      break;
    case 'tell':
      resp = tell(msg);
      break;
    case 'flip':
      resp = flip(msg);
      break;
    case 'flipme':
      resp = flipMe(msg);
      break;
  }
  resp = resp instanceof Promise ? await resp : resp;
  if (resp.length) msg.channel.send(resp);
}

function isCmd(text) {
  return text.startsWith(prefix);
}

function getCmd(text) {
  let end = text.indexOf(' ');
  if (end === -1) end = text.length;
  return text.substr(prefix.length, end - prefix.length);
}

function getText(text) {
  return text.substr(text.indexOf(' ') + 1);
}

async function joke() {
  let r = await fetch('https://icanhazdadjoke.com/', {
    headers: {'Accept': 'application/json'}
  });
  r = await r.json();
  return r.joke;
}

function say(msg) {
  let text = getText(msg.content);
  return text;
}

async function tell(msg) {
  let text = getText(msg.content);
  text = text.substr(text.indexOf(' ') + 1)
  let user = await msgUtils.getMentionedUser(msg);
  return text + ' ' + user.toString();
}

async function flip(msg) {
  let user = await msgUtils.getMentionedUser(msg);
  let text = user?.username;
  if (!text) text = getText(msg.content);
  return flipText.flip(text)
}

function flipMe(msg) {
  let text = msg.author.username;
  return flipText.flip(text)
}

module.exports = {
  dispatch,
  isCmd,
};

// (async () => {
//   console.log(await joke());
// })();
