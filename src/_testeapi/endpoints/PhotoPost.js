import { useState } from 'react';

const PhotoPost = () => {
  const [token, setToken] = useState('');
  const [nome, setNome] = useState('');
  const [peso, setPeso] = useState('');
  const [idade, setIdade] = useState('');
  const [img, setImg] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('peso', peso);
    formData.append('idade', idade);
    formData.append('img', img);

    fetch('https://dogsapi.origamid.dev/json/api/photo', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then(response => response.json())
      .then(json => json);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={({ target }) => setToken(target.value)}
        placeholder='token'
        type='text'
        value={token}
      />

      <input
        onChange={({ target }) => setNome(target.value)}
        placeholder='nome'
        type='text'
        value={nome}
      />

      <input
        onChange={({ target }) => setPeso(target.value)}
        placeholder='peso'
        type='text'
        value={peso}
      />

      <input
        onChange={({ target }) => setIdade(target.value)}
        placeholder='idade'
        type='text'
        value={idade}
      />

      <input onChange={({ target }) => setImg(target.files[0])} type='file' />

      <button>Enviar</button>
    </form>
  );
};

export default PhotoPost;
