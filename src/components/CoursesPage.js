import React, { useState, useEffect } from 'react';
// import { getCourses } from '../api/courseApi';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { loadCourses, deleteCourse } from '../actions/courseActions';
import { loadAuthors } from '../actions/authorActions';

//Container component - smart component, handling state
function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  // useEffect(() => {
  //   getCourses().then(_courses => setCourses(_courses));
  // }, []); //the dependency array is a list of values that useEffect should watch. It re-runs when values in this array change, prevent repetetive calls

  //after flux
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    authorStore.addChangeListener(onChange);
    //Since our component is connected to the Flux store, when courses are added to the store, onChange will be called.
    if (authorStore.getAuthors().length === 0) {
      loadAuthors();
    }
    if (courseStore.getCourses().length === 0) {
      loadCourses();
    }
    return () => {
      courseStore.removeChangeListener(onChange);
      authorStore.removeChangeListener(onChange);
    }; // cleanup on unmount
  }, []);

  function onChange() {
    // debugger; //4
    //When the courseStore changes, we want to get the list of courses and update state.

    const authors = authorStore.getAuthors();
    setAuthors(authors);

    const courseList = courseStore.getCourses();
    setCourses(courseList);
  }

  function getAuthorName(authorId) {
    return authorStore.getAuthorNameById(authorId);
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList
        courses={courses.map(courseItem => ({
          ...courseItem,
          author: getAuthorName(courseItem.authorId)
        }))}
        deleteCourse={deleteCourse}
      />
    </>
  );
}

export default CoursesPage;

//deleteCourse is not imported in the CourseList component, because we do not want to couple CourseList component to Flux. It is just JSX and depends on only props
