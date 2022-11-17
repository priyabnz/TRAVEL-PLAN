import React from 'react';
import { promiseOptions } from '../../libs/helper';
import AsyncSelect from 'react-select/async';

/**
 * @param  {function} {onChange
 * @param  {string} value
 * @param  {string} name}
 */
const Select = ({ onChange, value, name, ...rest }) => {
  return (
    <AsyncSelect cacheOptions
      name={name}
      inputId={name}
      onChange={onChange}
      value={value || {}}
      loadOptions={promiseOptions}
    />
  )
}

export default Select;