import { useEffect } from 'react';
import { PHOTO_GET } from '../../../api';
import useFetch from '../../../hooks/useFetch';
import Error from '../../Helper/Error';
import Loading from '../../Helper/Loading';
import PhotoContent from '../../Photo/PhotoContent';
import styles from './style.module.css';

const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  useEffect(() => {
    const getPhoto = async () => {
      const { url, options } = PHOTO_GET(photo.id);

      await request(url, options);
    };

    getPhoto();
  }, [photo, request]);

  const handleOutsideClick = event => {
    if (event.target === event.currentTarget) setModalPhoto(null);
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
