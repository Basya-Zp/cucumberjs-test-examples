'use strict';

const http        = require('request-promise');
const config      = require('../config');

function World() {
  let self = this;

  self.sendHttpRequest = (method, uri, body) => {
    return _httpRequest({ method: method, uri: uri, body });
  };
  
  self.getUser = () => {
    return config.auth.username;
  };


  function _httpRequest(options) {
    if(config.url && config.url.BASE){
      options.uri = `${config.url.BASE}${options.uri}`;
    }

    return http({
      method    : options.method,
      uri       : options.uri,
      body      : options.body,
      json      : true,
      auth      : {
        user  : config.auth.username,
        pass  : config.auth.token
      },
      headers: {
        'User-Agent': config.auth.username
      },
      resolveWithFullResponse: true
    })
      .then((response) => {
        self.responseBody         = response.body;
        self.responseStatusCode   = response.statusCode;
        return response;
      })
      .catch(err => {
        self.responseBody         = err.message;
        self.responseStatusCode   = err.statusCode;
        throw err;
      })
  }
}

module.exports = function() {
  this.World = World;
};
