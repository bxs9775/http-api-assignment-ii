const http = require('http');
const url = require('url');

const baseResponse = require('./baseResponse.js');

const users = {};
const numUsers = 0;

const getUsers = (request, response) => {
  const accept = request.headers.accept.split(',');
  if (accept[0] === 'text/xml') {
    let xmlObj = '<users>';
    let i = 0;
    let tempUser = {};
    while (i < numUsers) {
      tempUser = users[i];
      xmlObj = `${xmlObj}<user><name>${tempUser.name}</name><age>${tempUser.age}</age></user>`;

      i++;
    }
    xmlObj = `${xmlObj}</users>`;

    baseResponse.writeResponse(response, 200, xmlObj, accept[0]);
  } else {
    baseResponse.writeResponse(response, 200, JSON.stringify(users), 'application/json');
  }
};

const getUsersHead = (request, response) => {
  const accept = request.headers.accept.split(',');
  if (accept[0] === 'text/xml') {
    baseResponse.writeResponseHead(response, 200, accept[0]);
  } else {
    baseResponse.writeResponseHead(response, 200, 'application/json');
  }
};

const addUser = (request, response) => {

};

// export module
module.exports.getUsers = getUsers;
module.exports.getUsersHead = getUsersHead;
module.exports.addUser = addUser;
