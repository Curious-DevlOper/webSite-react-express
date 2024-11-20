
import isEmpty from './is-empty.js';
import pkg from 'validator';

const { isEmpty: _isEmpty} = pkg;

const validateExperienceInput = (data) => {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (_isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  
  if (_isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }
  if (_isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateExperienceInput;