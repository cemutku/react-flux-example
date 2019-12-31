import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//presenter component, dumb component, just receieves the props and shows them
function CourseList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map(course => {
          return (
            <tr key={course.id}>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    // debugger; //1
                    props.deleteCourse(course.id);
                    toast.success('Course deleted.');
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={'/course/' + course.slug}>{course.title}</Link>
              </td>
              <td>{course.author}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};

// CourseList.defaultProps = {
//   courses: []
// };

export default CourseList;
