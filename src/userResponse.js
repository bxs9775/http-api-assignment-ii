const query = require('querystring');

const baseResponse = require('./baseResponse.js');

const users = {};
const numUsers = 0;

const jsonMessageToXML = (json) => {
  let xmlObj = '<response>';
  if (json.id) {
    xmlObj = `${xmlObj}<id>${json.id}</id>`;
  }
  if (json.message) {
    xmlObj = `${xmlObj}<message>${json.message}</message>`;
  }
  xmlObj = `${xmlObj}</response>`;

  return xmlObj;
};

const addUserFromBody = (request, response, body) => {
  const accept = request.headers.accept.split(',');
  const jsonResponse = {
    message: 'Both name and age are required in the response.',
  };

  if (!body) {
    return response;
  }

  console.dir(body);

  if (!body.name || !body.age) {
    jsonResponse.id = 'missingParams';
    if (accept[0] === 'text/xml') {
      const xmlObj = jsonMessageToXML(jsonResponse);
      baseResponse.writeResponse(response, 400, xmlObj, accept[0]);
    } else {
      baseResponse.writeResponse(response, 400, JSON.stringify(jsonResponse), 'application/json');
    }
  }

  const userObj = {
    name: body.name,
    age: body.age,
  };

  const newUser = !(users[body.name]);
  users[body.name] = userObj;

  if (!newUser) {
    baseResponse.writeErrorHead(response, 204, accept);
  } else {
    baseResponse.writeError(response, 201, accept);
  }
};

const parseBody = (request, response) => {
  console.log('Running parseBody();');

  // Stores parts of the body when they are loaded in
  const body = [];

  // Creates an event error to handle things when an error occurs.
  request.on('error', (err) => {
    console.dir('OnError');

    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  // Identifies when data is retrieved and adds it to the body object.
  request.on('data', (chunk) => {
    body.push(chunk);
  });

  // Handles the end of the stream.
  request.on('end', () => {
    console.dir('OnEnd');

    // uses Buffer to concatinate the body and convert it to a string
    const bodyString = Buffer.concat(body).toString();

    // parses the body string
    const parsedBody = query.parse(bodyString);

    addUserFromBody(request, response, parsedBody);
  });
};


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
  console.log('Running addUser()');

  parseBody(request, response);
};


// export module
module.exports.getUsers = getUsers;
module.exports.getUsersHead = getUsersHead;
module.exports.addUser = addUser;
