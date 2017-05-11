'use strict';

const joi = require('joi');

const REGEX_URL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

const SCHEMA_USER = joi.object().keys({
  id      : joi.number().integer().required(),
  url     : joi.string().regex(REGEX_URL).required()
});

const SCHEMA_GIST_REGULAR = joi.object().keys({
  id      : joi.string().required(),
  url     : joi.string().regex(REGEX_URL).required(),
  history : joi.array()
});

const SCHEMA_COMMIT = joi.object().keys({
  url     : joi.string().regex(REGEX_URL).required(),
  version : joi.string(),
  user    : SCHEMA_USER,
  change_status: joi.object()
});

const SCHEMA_GIST_ARRAY       = joi.array().items(SCHEMA_GIST_REGULAR);
const SCHEMA_COMMIT_ARRAY    = joi.array().items(SCHEMA_COMMIT);

module.exports = {
  SCHEMAS:  {
    GIST_REGULAR   : SCHEMA_GIST_REGULAR,
    GIST_ARRAY     : SCHEMA_GIST_ARRAY,
    COMMIT_REGULAR : SCHEMA_COMMIT,
    COMMIT_ARRAY   : SCHEMA_COMMIT_ARRAY
  },
  validate: (schema, data) => {
    const error = joi.validate(data, schema, { allowUnknown: true }).error;
    return !error;
  }
};

