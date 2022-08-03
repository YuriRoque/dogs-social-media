import { PASSWORD_LOST } from '../../api';
import Button from '../../components/Button';
import Error from '../../components/Helper/Error';
import Head from '../../components/Helper/Head';
import Input from '../../components/Input';
import useFetch from '../../hooks/useFetch';
import useForm from '../../hooks/useForm';

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  const handleSubmit = async event => {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });

      await request(url, options);
    }
  };

  return (
    <section className='animeLeft'>
      <Head title='Perdeu a senha' />
      <h1 className='title'>Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label='E-mail / Usuário' type='text' name='email' {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar E-mail</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
