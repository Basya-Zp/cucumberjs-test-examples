'use strict';

const World           = require('../support/world');
const chai            = require('chai');
const expect          = chai.expect;
const schemaValidator = require('../support/validator');

module.exports = function() {
  let self = this;
  self.World(World);
  /**
   * Get one public Gist
   */
  self.When(/^I GET the gist "([^"]*)"$/, (gist, callback) => {
    self.sendHttpRequest('GET', gist)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });

  /**
   * Get one gist status check
   */
  self.Then(/^get one gist http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });


  /**
   * Gist URL param check
   */
  self.Then(/^\$\.url should equal "([^"]*)"$/, (urlValue, callback) => {
    expect(self.responseBody).have.property('url').and.equal(urlValue);
    callback(null, true);
  });


  self.Then(/^body should suit regular gist schema$/, (callback) => {
    if(!schemaValidator.validate(schemaValidator.SCHEMAS.GIST_REGULAR, self.responseBody)) {
      throw new Error();
    }
    callback(null, true);
  });


  /**
   * Star a Gist
   */
  self.When(/^I PUT the gist "([^"]*)"$/, (gist, callback) => {
    self.sendHttpRequest('PUT', `${gist}/star`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });

  self.Then(/^star a gist http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });

  /**
   * Check if Gist is starred
   */
  self.When(/^I GET the gist "([^"]*)" star$/, (gist, callback) => {
    self.sendHttpRequest('GET', `${gist}/star`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });

  self.Then(/^is gist starred http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });


  /**
   * Get a gist commits
   */

  self.When(/^I GET gist "([^"]*)" commits$/, (gist, callback) => {
    self.sendHttpRequest('GET', `${gist}/commits`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });

  self.Then(/^get gists commits http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });

  self.Then(/^body should suit regular array of commit schemas$/, (callback) => {
    if(!schemaValidator.validate(schemaValidator.SCHEMAS.COMMIT_ARRAY, self.responseBody)) {
      throw new Error();
    }
    callback(null, true);
  });

  /**
   * Create a new gist with provided JSON data
   */
  self.When(/^I POST the gist with JSON:$/, (gistData, callback) => {
    self.sendHttpRequest('POST', 'gists', JSON.parse(gistData))
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });

  });

  self.Then(/^create one http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });


  /**
   * Update a gist with provided JSON data
   */
  self.When(/^I PATCH the gist with JSON:$/, (gistData, callback) => {
    self.sendHttpRequest('PATCH', `gists/${self.responseBody.id}`, JSON.parse(gistData))
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });

  });

  self.Then(/^update one gist http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });


  /**
   * Get a gist with specific version
   */

  self.When(/^I GET the specific version gist$/, (callback) => {
    self.sendHttpRequest('GET', `gists/${self.responseBody.id}/${self.responseBody.history[0].version}`)
      .then(gistResponse => {
        expect(self.responseBody).to.be.an('object');
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });
  });

  self.Then(/^get specific version gist http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });

  //GET /gists/:id/commits

  /**
   * Delete a gist
   */
  self.When(/^I DELETE the gist$/, (callback) => {
    self.sendHttpRequest('DELETE', `gists/${self.responseBody.id}`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });

  });

  self.Then(/^delete one gist http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });


  /**
   * Get all user's gists
   */
  self.When(/^I GET all users gists$/, (callback) => {
    self.sendHttpRequest('GET', `users/${self.getUser()}/gists`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });

  });

  /**
   * Get all user's starred gists
   */
  self.When(/^I GET all users starred gists$/, (callback) => {
    self.sendHttpRequest('GET', `gists/starred`)
      .then(gistResponse => {
        callback(null, gistResponse);
      })
      .catch(err => {
        callback(err, false);
      });

  });

  self.Then(/^get all users gists http status should be (\d+)$/, (requestedStatus, callback) => {
    expect(self.responseStatusCode).to.be.equal(parseInt(requestedStatus));
    callback(null, true);
  });

  self.Then(/^response should contain array of gists$/, (callback) => {
    if(!schemaValidator.validate(schemaValidator.SCHEMAS.GIST_ARRAY, self.responseBody)) {
      console.log(schemaValidator.validate(schemaValidator.SCHEMAS.GIST_ARRAY, self.responseBody));
      throw new Error();
    }
    callback(null, true);
  });



};
