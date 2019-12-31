import React from 'react';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';

function AuthorForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="name"
        label="Name"
        name="name"
        onChange={props.onChange}
        value={props.author.name}
        error={props.errors.name}
      />
      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthorForm;
