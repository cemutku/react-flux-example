import { EventEmitter } from 'events';
import Dispatcher from '../appDispatcher';
//Dispatcher registration is typically defined below the store, since it's not part of the store's public API.
import actionTypes from '../actions/actionTypes';

const CHANGE_EVENT = 'change';
let _courses = [];

//Our store needs to emit an event each time a change occurs.
class CourseStore extends EventEmitter {
  //When a change occurs in the store than call the callback provided
  //This will allow React components to subscribe to our store so they're notified when changes occur.
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  //Unsubscribe from the store
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getCourses() {
    return _courses;
  }

  getCourseBySlug(slug) {
    return _courses.find(course => course.slug === slug);
  }
}

const store = new CourseStore();

Dispatcher.register(action => {
  //This will be called anytime an action is dispatched
  //Every store is notified of every single action

  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      _courses.push(action.course);
      store.emitChange(); //Anytime the store changes, we need to call emitChange.
      break;
    case actionTypes.UPDATE_COURSE:
      _courses = _courses.map(
        course => (course.id === action.course.id ? action.course : course) //when the id matches, replace (update) course with course in action
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      // debugger; //3
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    default:
    //nothing to do her
  }
});

export default store;

/**
 * 3 Functions in every Flux store:
 * 1. addChangeListener (wraps on)
 * 2. removeChangeListener (wraps removeListener)
 * 3. emitChange (wraps emit)
 *
 * on, removeListener, emit --> events
 *
 * Like a database
 *
 * To show a preloader while the call is in progress, you could have separate DELETE_COURSE and COURSE_DELETED actionTypes.
 */
