import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../../components/Button';
import Error from '../../../components/Helper/Error';
import Input from '../../../components/Input';
import useForm from '../../../hooks/useForm';
import { UserContext } from '../../../UserContext';

import stylesBtn from '../../../components/Button/style.module.css';
import Head from '../../../components/Helper/Head';
import styles from './style.module.css';

const LoginForm = () => {
  const { userLogin, error, loading } = useContext(UserContext);
  const username = useForm();
  const password = useForm();

  const handleSubmit = async event => {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  };

  return (
    <section className='animeLeft'>
      <Head title='Login' />
      <h1 className='title'>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label='Usuário' name='username' type='text' {...username} />
        <Input label='Senha' name='password' type='password' {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos.'} />
      </form>
      <Link className={styles.perdeu} to='/login/perdeu'>
        Esqueceu sua senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to='/login/criar'>
          Cadastrar
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
