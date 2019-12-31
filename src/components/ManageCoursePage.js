import React, { useState, useEffect } from 'react';
// import { Prompt } from 'react-router-dom';
import CourseForm from './CourseForm';
// import * as courseApi from '../api/courseApi';
import courseStore from '../stores/courseStore';
import authorStore from '../stores/authorStore';
import { toast } from 'react-toastify';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';
import NotFoundPage from './NotFoundPage';

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(() => {
    courseStore.addChangeListener(onchange); // Run onChange function when the Flux store changes.
    authorStore.addChangeListener(onchange);
    const slug = props.match.params.slug; // from the path /courses/:slug

    if (courses.length === 0) {
      //page load - check courses in state
      courseActions.loadCourses(); // can change function will be called when empty
    } else if (slug) {
      // courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
      //after flux, get data from store
      setCourse(courseStore.getCourseBySlug(slug));
    }

    if (authors.length === 0) {
      authorActions.loadAuthors();
    }

    return () => {
      courseStore.removeChangeListener(onchange);
      authorStore.removeChangeListener(onchange);
    }; //clean up onChange - unmount
  }, [courses.length, props.match.params.slug, authors.length]); //when array length changes or slug, react will re-run this effect

  function onchange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    // const target = event.target => const {target} = event => { target }  destructuring

    // const updatedCourse = {
    //   ...course,
    //   [target.name]: target.value
    // }; //do not mutate directly, use spread op. ([event.target.name] -> computed property not an array)
    // setCourse(updatedCourse);

    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required';
    if (!course.title) _errors.authorId = 'Author ID is required';
    if (!course.title) _errors.category = 'Category is required';

    setErrors(_errors);
    // Form is valid if the errors object has no properties

    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    // courseApi.saveCourse(course).then(() => {
    //   props.history.push('/courses'); //redirect courses page after save
    //   toast.success('Course saved.');
    // });
    //after flux
    courseActions.saveCourse(course).then(() => {
      props.history.push('/courses');
      toast.success('Course saved.');
    });
  }

  return (
    <>
      {/* <Prompt when={true} message="Are you sure you want to leave?" />  show prompt when={condition}*/}
      {course ? (
        <>
          <h2>Manage Course</h2>
          <CourseForm
            errors={errors}
            course={course}
            onChange={handleChange}
            onSubmit={handleSubmit}
            authors={authors}
          />
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

export default ManageCoursePage;
