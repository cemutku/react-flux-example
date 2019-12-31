import React from 'react';
import TextInput from './common/TextInput';
import PropTypes from 'prop-types';
import DropDownInput from './common/DropDownInput';

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
        error={props.errors.title}
      />

      <DropDownInput
        id="author"
        label="Author"
        name="authorId"
        onChange={props.onChange}
        value={props.course.authorId}
        dropDownItems={props.authors}
        error={props.errors.category}
      />

      <TextInput
        id="category"
        label="Category"
        name="category"
        onChange={props.onChange}
        value={props.course.category}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

export default CourseForm;
