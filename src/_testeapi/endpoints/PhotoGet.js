import { useState } from 'react';

const PhotoGet = () => {
  const [id, setId] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    fetch(`https://dogsapi.origamid.dev/json/api/photo/${id}`)
      .then(response => response.json())
      .then(json => {
        return json;
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={id}
        onChange={({ target }) => setId(target.value)}
      />
      <button>Enviar</button>
    </form>
  );
};

export default PhotoGet;
