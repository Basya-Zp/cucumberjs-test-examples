'use strict';

const World       = require('../support/world');
const chai        = require('chai');
const expect      = chai.expect;

module.exports = function() {
  let self = this;
  self.World(World);

  self.When(/^I GET the gist "([^"]*)"$/, (gist, callback) => {
    self.sendHttpRequest('GET', gist)
      .then(gistResponse => {
        expect(self.responseBody).to.be.an('object');
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });


  self.Then(/^the http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });

  self.Then(/^\$\.url should equal "([^"]*)"$/, (urlValue, callback) => {
    expect(self.responseBody).have.property('url').and.equal(urlValue);
    callback(null, true);
  });

};