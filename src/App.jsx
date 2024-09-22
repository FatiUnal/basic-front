import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Kullanıcıları getirmek için
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://154.53.160.227:8080/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Kullanıcılar alınamadı:', error);
      }
    };

    fetchUsers();
  }, []);

  const addUser = async () => {
    try {
      const newUser = { name, description };
      await axios.post('http://154.53.160.227:8080/user', newUser);
      setUsers([...users, newUser]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Kullanıcı eklenirken hata:', error);
    }
  };

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.description}
          </li>
        ))}
      </ul>
      <h2>Yeni Kullanıcı Ekle</h2>
      <input
        type="text"
        placeholder="İsim"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addUser}>Ekle</button>
    </div>
  );
};

export default App;
