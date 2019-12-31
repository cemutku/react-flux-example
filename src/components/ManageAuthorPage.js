import React, { useState, useEffect } from 'react';
import AuthorForm from './AuthorForm';
import authorStore from '../stores/authorStore';
import { toast } from 'react-toastify';
import * as authorActions from '../actions/authorActions';
import NotFoundPage from './NotFoundPage';

function ManageAuthorPage(props) {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors);
  const [author, setAuthor] = useState({
    id: null,
    name: ''
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    const authorId = props.match.params.id;

    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (authorId) {
      setAuthor(authorStore.getAuthorById(authorId));
    }

    return () => {
      authorStore.removeChangeListener(onChange);
    };
  }, [authors.length, props.match.params.id]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange(event) {
    const { target } = event;
    setAuthor({
      ...author,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!author.name) _errors.name = 'Name ise required';

    setErrors(_errors);

    return Object.keys(_errors).length === 0;
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    authorActions.saveAuthor(author).then(() => {
      props.history.push('/authors');
      toast.success('Author Saved');
    });
  }

  return (
    <>
      {author ? (
        <>
          <h2>Manage Author</h2>
          <AuthorForm
            onChange={handleChange}
            onSubmit={handleOnSubmit}
            errors={errors}
            author={author}
          />
        </>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export default ManageAuthorPage;
