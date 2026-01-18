export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({message: 'Method not allowed'});
  
  const { password } = req.body;
  const SECRET = process.env.XYZ_SECRET_KEY; // AMBIL DARI VERCEL ENV

  if (password === SECRET && SECRET !== undefined) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
}
