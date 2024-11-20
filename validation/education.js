
import isEmpty from './is-empty.js';
import pkg from 'validator';

const { isEmpty: _isEmpty} = pkg;

const validateEducationInput  = (data) => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (_isEmpty(data.school)) {
    errors.school = 'Jschool field is required';
  }

  
  if (_isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }
  if (_isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
 

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default validateEducationInput ;