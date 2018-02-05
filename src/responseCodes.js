const errorStruct = {
  200: {
    message: 'This is a successful response',
  },
  201: {
    message: 'Created successfully',
  },
  404: {
    id: 'notFound',
    message: 'The page you are looking for is not found.',
  },
};

const getErrorJSON = errCode => errorStruct[errCode];

// export module
module.exports.getErrorJSON = getErrorJSON;
