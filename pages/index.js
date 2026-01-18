import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [key, setKey] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: key }),
    });

    if (res.ok) {
      localStorage.setItem('xyz_auth', 'true');
      router.push('/dashboard');
    } else {
      alert('Key Salah, Pantek!');
    }
  };

  return (
    <div style={{background: '#0a192f', color: '#00d4ff', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontFamily: 'monospace'}}>
      <h1>XYZ SECURITY LOGIN</h1>
      <form onSubmit={handleLogin}>
        <input type="password" onChange={(e) => setKey(e.target.value)} placeholder="Enter Key..." style={{padding: '10px', background: '#112240', border: '1px solid #00d4ff', color: 'white'}} />
        <button type="submit" style={{padding: '10px', marginLeft: '10px', cursor: 'pointer', background: '#00d4ff'}}>ACCESS</button>
      </form>
    </div>
  );
                                          }
