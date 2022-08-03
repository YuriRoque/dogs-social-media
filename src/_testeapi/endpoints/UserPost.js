import { useState } from 'react';

const UserPost = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    fetch('https://dogsapi.origamid.dev/json/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(username, email, password),
    })
      .then(response => response.json())
      .then(json => json);
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
        onChange={({ target }) => setEmail(target.value)}
        placeholder='email'
        type='text'
        value={email}
      />

      <input
        onChange={({ target }) => setPassword(target.value)}
        placeholder='password'
        type='text'
        value={password}
      />

      <button>Enviar</button>
    </form>
  );
};

export default UserPost;
