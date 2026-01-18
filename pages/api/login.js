export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    // Pastikan di Vercel sudah lu isi XYZ_SECRET_KEY
    if (password === process.env.XYZ_SECRET_KEY) {
      return res.status(200).json({ message: 'OK' });
    }
    return res.status(401).json({ message: 'Gagal' });
  }
  res.status(405).end();
}
