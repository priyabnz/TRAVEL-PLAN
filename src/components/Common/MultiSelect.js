import React from 'react';
import { promiseOptions } from '../../libs/helper';
import AsyncSelect from 'react-select/async';
/**
 * @param  {function} {onChange
 * @param  {string} value}
 */
const MultiSelect = ({ onChange, value, name, ...rest }) => {
  return (
      <AsyncSelect cacheOptions
        onChange={onChange}
        {...rest}
        classNamePrefix="select"
        isMulti
        name={name}
        inputId={name}
        value={value || []}
        loadOptions={promiseOptions} 
        placeholder="Select City..."
        styles={{
          placeholder: (provided, state) => ({
            ...provided,
            position: "absolute",
            top: state.hasValue || state.selectProps.inputValue ? -15 : "15%",
            transition: "top 0.1s, font-size 0.1s",
            fontSize: (state.hasValue || state.selectProps.inputValue) && 13
          })
        }}
        />
  )
}

export default MultiSelect;