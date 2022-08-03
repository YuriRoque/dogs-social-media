import { useState } from 'react';

const TokenPost = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(username, password),
    })
      .then(response => response.json())
      .then(json => setToken(json.token));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={({ target }) => setUsername(target.value)}
        placeholder='username'
        type='text'
        value={username}
      />

      <input
        onChange={({ target }) => setPassword(target.value)}
        placeholder='password'
        type='text'
        value={password}
      />

      <button>Enviar</button>

      <p style={{ wordBreak: 'break-all' }}>{token}</p>
    </form>
  );
};

export default TokenPost;
