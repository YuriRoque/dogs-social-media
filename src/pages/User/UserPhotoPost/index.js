import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PHOTO_POST } from '../../../api';
import Button from '../../../components/Button';
import Error from '../../../components/Helper/Error';
import Head from '../../../components/Helper/Head';
import Input from '../../../components/Input';
import useFetch from '../../../hooks/useFetch';
import useForm from '../../../hooks/useForm';
import styles from './style.module.css';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('token');

    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  };

  const handleImgChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua foto' />
      <form onSubmit={handleSubmit}>
        <Input label='Nome' name='nome' type='text' {...nome} />
        <Input label='Peso' name='peso' type='number' {...peso} />
        <Input label='Idade' name='idade' type='number' {...idade} />
        <input
          className={styles.file}
          id='img'
          name='img'
          onChange={handleImgChange}
          type='file'
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
