import Validator from 'validator';
import isEmpty from './is-empty.js';

import pkg from 'validator';
const { isEmpty: _isEmpty} = pkg;

export default function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (_isEmpty(data.text)) {
    errors.text = 'text field is required';
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Name must be between 10 and 300 characters';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
