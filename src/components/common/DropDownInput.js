import React from 'react';
import PropTypes from 'prop-types';

function DropDownInput(props) {
  let wrapperClass = 'form-group';
  if (props.error.length > 0) {
    wrapperClass += 'has-error';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id}>{props.label}</label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          value={props.value ? props.value : ''}
          className="form-control"
        >
          <option value="" />
          {props.dropDownItems.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
}

DropDownInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string
};

DropDownInput.defaultProps = {
  error: ''
};

export default DropDownInput;
