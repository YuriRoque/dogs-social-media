import { useState } from 'react';

import { COMMENT_POST } from '../../../../api';
import { ReactComponent as Send } from '../../../../assets/enviar.svg';
import useFetch from '../../../../hooks/useFetch';
import Error from '../../../Helper/Error';
import styles from './style.module.css';

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = useState('');
  const { request, error } = useFetch();

  const handleSubmit = async event => {
    event.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');

      setComments(comments => [...comments, json]);
    }
  };

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ''}`}
      onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id='comment'
        name='comment'
        placeholder='Comente...'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Send />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
