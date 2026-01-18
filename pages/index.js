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
      localStorage.setItem('xyz_session', 'active');
      router.push('/dashboard');
    } else {
      alert('KEY SALAH, AKSES DITOLAK!');
    }
  };

  return (
    <div style={{backgroundColor: '#020c1b', color: '#00d4ff', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace'}}>
      <h1 style={{textShadow: '0 0 10px #00d4ff'}}>XYZ_SYSTEM LOGIN</h1>
      <form onSubmit={handleLogin} style={{display: 'flex', gap: '10px'}}>
        <input 
          type="password" 
          placeholder="Input API Key..." 
          onChange={(e) => setKey(e.target.value)}
          style={{padding: '10px', background: '#0a192f', border: '1px solid #00d4ff', color: '#fff', outline: 'none'}}
        />
        <button type="submit" style={{padding: '10px 20px', background: '#00d4ff', color: '#020c1b', border: 'none', fontWeight: 'bold', cursor: 'pointer'}}>BYPASS</button>
      </form>
    </div>
  );
                                          }
