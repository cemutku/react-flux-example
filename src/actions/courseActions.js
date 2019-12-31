import dispatcher from '../appDispatcher';
import * as courseApi from '../api/courseApi';
import actionTypes from './actionTypes';

//Action Creator
export function saveCourse(course) {
  //Now the caller will be notified when the promise resolves (return)
  return courseApi.saveCourse(course).then(savedCourse => {
    //Hey dispatcher, go tell all the stores that a course was just created.
    dispatcher.dispatch({
      //Action
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      //above action is the only required property.The rest of the action can have whatever properties we want.
      course: savedCourse
    });
  });
}

export function loadCourses() {  
  return courseApi.getCourses().then(courses => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

export function deleteCourse(id) {
  // debugger; //2
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
