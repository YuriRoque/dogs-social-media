import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_RESET } from '../../api';
import Button from '../../components/Button';
import Error from '../../components/Helper/Error';
import Head from '../../components/Helper/Head';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';

const LoginPasswordReset = () => {
  const [login, setLogin] = useState('');
  const [key, setKey] = useState('');
  const password = useForm();
  const { request, loading, error } = useFetch();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) navigate('/login');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  return (
    <section className='animeLeft'>
      <Head title='Resetar senha' />
      <h1 className='title'>Resetar Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nova Senha'
          type='password'
          name='password'
          {...password}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
