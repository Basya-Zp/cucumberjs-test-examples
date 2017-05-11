'use strict';

const joi = require('joi');

const SCHEMA_GIST_REGULAR = joi.object().keys({
  id  : joi.string().required(),
  url : joi.string().required()
});

module.exports = {
  SCHEMAS:  {
    GIST_REGULAR: SCHEMA_GIST_REGULAR
  },
  validate: (schema, data) => {
    const error = joi.validate(data, schema, { allowUnknown: true }).error;
    return !error;
  }
};

