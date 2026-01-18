import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Komponen Game Sederhana: "Bruteforce The Password"
const BruteforceGame = ({ onWin }) => {
  const [targetPassword, setTargetPassword] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    // Generate password acak 4 digit angka
    setTargetPassword(Math.floor(1000 + Math.random() * 9000).toString());
    setAttempts(0);
    setMessage('Mulai Bruteforce, tebak 4 digit angka!');
    setSolved(false);
  }, []);

  const handleGuess = () => {
    if (solved) return;
    setAttempts(attempts + 1);
    if (guess === targetPassword) {
      setMessage(`SUCCESS! Password adalah ${targetPassword}. Percobaan: ${attempts}`);
      setSolved(true);
      onWin && onWin(); // Panggil fungsi jika menang
    } else {
      setMessage(`SALAH! Coba lagi. Petunjuk: ${guess < targetPassword ? 'Lebih Besar' : 'Lebih Kecil'}`);
    }
    setGuess('');
  };

  return (
    <div style={{ padding: '15px', background: '#000', border: '1px solid #0f0', borderRadius: '5px' }}>
      <h4 style={{ color: '#0f0', margin: '0 0 10px 0' }}>[ GAME: Bruteforce Challenge ]</h4>
      <p style={{ color: '#aaa' }}>Tebak password 4 digit angka. (Target: {solved ? targetPassword : '****'})</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter') handleGuess(); }}
        placeholder="Masukkan tebakan..."
        style={{ width: '100%', padding: '8px', background: '#111', border: '1px solid #0f0', color: '#fff', marginBottom: '10px' }}
        disabled={solved}
      />
      <button onClick={handleGuess} disabled={solved}
        style={{ background: '#0f0', color: '#000', border: 'none', padding: '8px 15px', cursor: 'pointer', marginRight: '10px' }}>
        GUESS ({attempts})
      </button>
      <button onClick={() => setSolved(true)} disabled={solved}
        style={{ background: '#555', color: '#fff', border: 'none', padding: '8px 15px', cursor: 'pointer' }}>
        SKIP
      </button>
      <p style={{ color: '#0f0', marginTop: '10px' }}>{message}</p>
    </div>
  );
};


// Komponen Utama Dashboard
export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' atau 'game'
  const [activeModule, setActiveModule] = useState(null);
  const [terminalLog, setTerminalLog] = useState(['xyz@root:~$ Booting system...']);
  const [missionComplete, setMissionComplete] = useState({}); // Track game wins

  useEffect(() => {
    const session = localStorage.getItem('xyz_session');
    if (!session) router.push('/');
  }, []);

  const modules = [
    {
      id: 1,
      title: "Module 1: Pengantar Pentest",
      desc: "Dasar-dasar pengujian penetrasi: Recon, Scanning, Vulnerability Analysis.",
      content: "Pelajari cara kerja internet, IP Address, Port, dan DNS.",
      tutorial: "1. Jalankan `ping google.com` untuk melihat IP.\n2. Gunakan `nmap -F 192.168.1.1` untuk scan port cepat.",
      tools: ["Nmap", "Whois", "Ping"],
      videoLink: "https://www.youtube.com/watch?v=videosatu" // Ganti dengan link YT asli
    },
    {
      id: 2,
      title: "Module 2: Eksploitasi Web",
      desc: "Memahami dan mengeksploitasi kerentanan umum pada aplikasi web.",
      content: "Fokus pada SQL Injection, Cross-Site Scripting (XSS), dan File Inclusion.",
      tutorial: "1. Temukan parameter URL (`?id=1`).\n2. Coba payload SQLi: `' OR 1=1--`.",
      tools: ["Burp Suite", "SQLMap", "DVWA (Damn Vulnerable Web App)"],
      videoLink: "https://www.youtube.com/watch?vidua" // Ganti dengan link YT asli
    },
    {
      id: 3,
      title: "Module 3: Keamanan Jaringan",
      desc: "Teknik menganalisis lalu lintas jaringan, sniffing, dan serangan Man-in-the-Middle (MiTM).",
      content: "Pelajari protokol seperti TCP/IP, UDP, ARP, dan DNS.",
      tutorial: "1. Buka Wireshark.\n2. Filter `http.request` untuk melihat request HTTP.\n3. Gunakan `ettercap` untuk ARP Spoofing.",
      tools: ["Wireshark", "Metasploit", "Ettercap"],
      videoLink: "https://www.youtube.com/watch?vitiga" // Ganti dengan link YT asli
    }
  ];

  const handleTerminalCommand = (command) => {
    setTerminalLog(prev => [...prev, `xyz@root:~$ ${command}`]);
    if (command.toLowerCase().includes('help')) {
      setTerminalLog(prev => [...prev, '> Available commands: start_module [id], clear, logout']);
    } else if (command.toLowerCase().includes('clear')) {
      setTerminalLog(['xyz@root:~$ ']);
    } else if (command.toLowerCase().includes('start_module')) {
      const parts = command.split(' ');
      const moduleId = parseInt(parts[1]);
      const module = modules.find(m => m.id === moduleId);
      if (module) {
        setActiveModule(module);
        setTerminalLog(prev => [...prev, `> Loading Module ${moduleId}: ${module.title}...`]);
      } else {
        setTerminalLog(prev => [...prev, `> Error: Module ${moduleId} not found.`]);
      }
    } else if (command.toLowerCase().includes('logout')) {
      localStorage.removeItem('xyz_session');
      router.push('/');
    } else {
      setTerminalLog(prev => [...prev, `> Unknown command: ${command}`]);
    }
  };

  return (
    <div style={{backgroundColor: '#020c1b', color: '#00d4ff', minHeight: '100vh', padding: '20px', fontFamily: 'monospace', fontSize: '0.9rem'}}>
      {/* Header */}
      <div style={{borderBottom: '2px solid #00d4ff', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h2 style={{fontSize: '1.2rem', margin: '0'}}>XYZ_DASHBOARD v2.0</h2>
        <button onClick={() => { localStorage.removeItem('xyz_session'); router.push('/'); }} 
                style={{background: 'transparent', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '5px 10px', fontSize: '0.8rem', cursor: 'pointer'}}>
          LOGOUT
        </button>
      </div>

      {/* Tabs Nav */}
      <div style={{display: 'flex', gap: '10px', marginTop: '20px', borderBottom: '1px solid #00d4ff', paddingBottom: '10px'}}>
        <button onClick={() => setActiveTab('modules')}
                style={{
                  background: activeTab === 'modules' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: '#00d4ff', border: '1px solid #00d4ff', padding: '8px 15px', cursor: 'pointer'
                }}>
          LEARN MODULES
        </button>
        <button onClick={() => setActiveTab('game')}
                style={{
                  background: activeTab === 'game' ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                  color: '#00d4ff', border: '1px solid #00d4ff', padding: '8px 15px', cursor: 'pointer'
                }}>
          HACKER GAMES
        </button>
      </div>

      {/* Content Area */}
      <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
        {activeTab === 'modules' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {/* Module List (Horizontal Scroll) */}
            <div style={{display: 'flex', overflowX: 'auto', gap: '10px', paddingBottom: '10px'}}>
              {modules.map(m => (
                <button key={m.id} onClick={() => setActiveModule(m)}
                        style={{
                          flex: '0 0 auto', padding: '10px', border: '1px solid #00d4ff', 
                          background: activeModule?.id === m.id ? 'rgba(0, 212, 255, 0.2)' : 'transparent',
                          color: '#00d4ff', cursor: 'pointer', minWidth: '120px'
                        }}>
                  [+] Modul {m.id}
                </button>
              ))}
            </div>

            {/* Active Module Content */}
            {activeModule ? (
              <div style={{border: '1px solid #00d4ff', padding: '15px', background: 'rgba(0, 212, 255, 0.05)'}}>
                <h3 style={{color: '#fff', borderBottom: '1px solid #00d4ff', paddingBottom: '5px', margin: '0 0 15px 0'}}># {activeModule.title}</h3>
                <p style={{fontSize: '0.9rem', lineHeight: '1.4', margin: '0 0 15px 0'}}>{activeModule.desc}</p>
                
                <div style={{background: '#0a192f', padding: '10px', borderLeft: '3px solid #00d4ff', marginBottom: '15px'}}>
                  <h4 style={{marginTop: '0'}}>Brief:</h4>
                  <p style={{fontSize: '0.85rem'}}>{activeModule.content}</p>
                </div>

                <h4>Step-by-Step Tutorial:</h4>
                <pre style={{fontSize: '0.8rem', color: '#aab4be', whiteSpace: 'pre-wrap', background: '#000', padding: '10px', border: '1px solid #333'}}>{activeModule.tutorial}</pre>

                <div style={{marginTop: '15px'}}>
                  <h4 style={{marginBottom: '5px'}}>Recommended Tools:</h4>
                  <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                    {activeModule.tools.map(t => <span key={t} style={{border: '1px solid #00d4ff', padding: '2px 8px', fontSize: '0.7rem'}}>{t}</span>)}
                  </div>
                </div>

                {activeModule.videoLink && (
                  <div style={{marginTop: '20px'}}>
                    <h4>Video Tutorial:</h4>
                    <a href={activeModule.videoLink} target="_blank" rel="noopener noreferrer" 
                       style={{color: '#00d4ff', textDecoration: 'underline', fontSize: '0.85rem'}}>
                      [+] Tonton di YouTube
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '40px', border: '1px dashed #00d4ff'}}>
                <p>SELECT A MODULE FROM ABOVE TO DECRYPT CONTENT</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'game' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <h3 style={{color: '#fff', borderBottom: '1px solid #00d4ff', paddingBottom: '5px'}}># Hacker Training Games</h3>
            <BruteforceGame onWin={() => {
              setTerminalLog(prev => [...prev, '> Game "Bruteforce Challenge" Completed!']);
              setMissionComplete(prev => ({...prev, bruteforce: true}));
            }} />
            {/* Bisa tambahin game lain di sini */}
          </div>
        )}

        {/* Interactive Terminal */}
        <div style={{background: '#000', padding: '15px', border: '1px solid #333', borderRadius: '5px', height: '180px', overflowY: 'auto'}}>
          {terminalLog.map((log, i) => (
            <p key={i} style={{fontSize: '0.75rem', margin: '3px 0', color: log.includes('SUCCESS') || log.includes('Completed') || log.includes('Available commands') ? '#0f0' : log.includes('Error') ? '#f00' : '#00d4ff'}}>
              {log}
            </p>
          ))}
          <input
            type="text"
            placeholder="Ketik command: help, start_module [id], clear, logout..."
            onKeyPress={(e) => { if (e.key === 'Enter') { handleTerminalCommand(e.target.value); e.target.value = ''; } }}
            style={{ width: 'calc(100% - 20px)', padding: '5px', background: 'transparent', border: 'none', borderTop: '1px solid #555', color: '#00d4ff', outline: 'none', marginTop: '10px', fontSize: '0.8rem' }}
          />
        </div>
      </div>
    </div>
  );
}
