import { server } from '@/config';
import loginStyles from '@/styles/Login.module.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${server}/api/login`, {
        username,
        password,
      });
      router.push('/admin');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className={loginStyles.container}>
      <form method="post" onSubmit={handleSubmit}>
        <h1>Admin Dashboard</h1>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        {error && <span>Invalid Credentials</span>}
      </form>
    </div>
  );
};
export default login;
